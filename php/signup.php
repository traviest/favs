<?php

	$userId = 0;
	$username = strip_tags(trim($_GET['username']);
	$password = strip_tags(trim($_GET['password']);
	$email = strip_tags(trim($_GET['email']);
	$name = strip_tags(trim($_GET['name']);
	$location = strip_tags(trim($_GET['location']);
	$routine = strip_tags(trim($_GET['routine']);
	//$pic = strip_tags(trim($_GET['pic']);
	//$color = strip_tags(trim($_GET['color']);
	
	if ($username == '' || $password == '' || $email == '') {
		$errorMsg = "Information overload, something went missing.";
	}
	else {
		// load doc
		$xmlDoc = new DOMDocument();
		$xmlDoc->load('../xml/users.xml');
		
		// find num users
		$users = $xmlDoc->children('user');
		$numUsers = var_dump(count($users));
		$userId = $numUsers+1;
		
		// create new users node attached to root
		$xmlRoot = $xmlDoc->firstChild;
		$newUser = $xmlDoc->createElement('user');
		$newNode = $xmlRoot->appendChild($newUser);
		
		// create user node elements
		$newId = $xmlDoc->createElement('id');
		$newUsername = $xmlDoc->createElement('username'));
		$newPass = $xmlDoc->createElement('password'));
		$newName = $xmlDoc->createElement('name'));
		$newEmail = $xmlDoc->createElement('email'));
		$newLocation = $xmlDoc->createElement('location'));
		$newRoutine = $xmlDoc->createElement('routine'));
		//$newPic = $xmlDoc->createElement('pic'));
		//$newColor = $xmlDoc->createElement('color'));
		
		// append nodes to new user node
		$newNode->appendChild($newId);
		$newNode->appendChild($newUsername);
		$newNode->appendChild($newPass);
		$newNode->appendChild($newName);
		$newNode->appendChild($newEmail);
		$newNode->appendChild($newLocation);
		$newNode->appendChild($newRoutine);
		//$newNode->appendChild($newPic);
		//$newNode->appendChild($newColor);
		
		// create user node text elements
		$idText = $xmlDoc->createTextNode($userId);
		$userText = $xmlDoc->createTextNode($username);
		$passText = $xmlDoc->createTextNode($password);
		$nameText = $xmlDoc->createTextNode($name);
		$emailText = $xmlDoc->createTextNode($email);
		$locText = $xmlDoc->createTextNode($location);
		$routText = $xmlDoc->createTextNode($routine);
		//$picText = $xmlDoc->createTextNode($pic);
		//$colorText = $xmlDoc->createTextNode($color);
		
		// append text nodes to new user nodes
		$newId->appendChild($idText);
		$newUsername->appendChild($userText);
		$newPass->appendChild($passText);
		$newName->appendChild($nameText);
		$newEmail->appendChild($emailText);
		$newLocation->appendChild($locText);
		$newRoutine->appendChild($routText);
		$newPic->appendChild($picText);
		$newColor->appendChild($colorText);
		
		// save xml doc
		$xmlDoc->save('../xml/users.xml');
	}
	echo json_encode(array("errorMsg"=>$errorMsg));
	
	
	
	/* ALL USER VALUES
	
	<id>1</id>
	<username>traviest</username>
	<password>password</password>
	<name>Travis K. Leonard</name>
	<email>traviest@gmail.com</email>
	<location>Johnson City, TN</location>
	<routine>College and Mellow Mushroom</routine>
	<pic>trav.jpg</pic>
	<color>rgb(32,143,162)</color>
	
	*/

?>