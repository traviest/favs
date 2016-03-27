<?php  
	$dbUsername = "FAVS_user";
	$dbPassword = "MTV";
	@$db = mysql_connect('localhost',$dbUsername,$dbPassword) or die("Couldn't connect to DBMS");
	@mysql_select_db("FAVS") or die("Connection to database failed");
	
	$loginName = strip_tags(trim($_GET['username']));
	$loginPassword = strip_tags(trim($_GET['password']));
	
	$userResults = mysql_query("select * from users where username = '$loginName'");
	/* verify information with user table */
	if(mysql_num_rows($userResults) == 0)
		$errorMsg = "username not found";
	elseif(mysql_num_rows($userResults) > 1)
		$errorMsg = "incorrect username";
	else
	{
		$user = mysql_fetch_assoc($userResults);
		$userId = $user['id'];
		$verifyName = $user['username'];
		$verifyPassword = $user['password'];
		
		if($verifyPassword != $loginPassword)
			$errorMsg = "incorrect password";
		elseif($verifyName == $loginName)
		{	/* set cookies for the name and ID number (session, not timed expiration) */
			setcookie("userid",$userId); 
			setcookie("username",$loginName);
		}
		else
			$errorMsg = "error loading user info";
			
	}
	echo json_encode(array("errorMsg"=>$errorMsg));
?>