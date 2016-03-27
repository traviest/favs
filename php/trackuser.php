<?php
	//3 variables
	//	- mainId
	// 	- trackedId
	//  -track vs. untrack


/*
<?php
	
	$userId = strip_tags(trim($_GET['userId']));
	$listId = strip_tags(trim($_GET['listId']));
	$listTitle = strip_tags(trim($_GET['listTitle']));	
	
	/* Error checking - include check if user has existing item with same url *
	if($userId == '' || $listId == '' || $listTitle == '') {
		$errorMsg = "You're missing some info pal";
	}
	else {		
		$xmlDoc = new DOMDocument();
		$xmlDoc->load('../xml/lists.xml');
		
		$xmlRoot = $xmlDoc->firstChild;
		
		$newList = $xmlDoc->createElement('list');
		$newNode = $xmlRoot->appendChild($newList);
		
		$newNode->setAttribute("userId",$userId);
		
		$newId = $xmlDoc->createElement('id');
		$newTitle = $xmlDoc->createElement('title');
		
		$newNode->appendChild($newId);
		$newNode->appendChild($newTitle);
		
		$idText = $xmlDoc->createTextNode($listId);
		$titleText = $xmlDoc->createTextNode($listTitle);
		
		$newId->appendChild($idText);
		$newTitle->appendChild($titleText);
		
		$xmlDoc->save('../xml/lists.xml');
	}
	echo json_encode(array("errorMsg"=>$errorMsg));
*/
?>