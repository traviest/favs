<?php
	
	$userId = strip_tags(trim($_GET['userId']));
	$listId = strip_tags(trim($_GET['listId']));
	$listItemNum = strip_tags(trim($_GET['listItemNum']));
	$tags = strip_tags(trim($_GET['tags']));
	$title = strip_tags(trim($_GET['title']));
	$url = strip_tags(trim($_GET['url']));
	$desc = strip_tags(trim($_GET['desc']));
	
	$date = date("Y-m-d-H-i-s");
	
	/* Error checking - include check if user has existing item with same url */
	if($userId == '' || $listId == '' || $listId == 0 || $listItemNum == '' || $listItemNum == 0 || $date == '' || $title == '' || $url == '') {
		$errorMsg = "You're missing some info pal";
	}
	else {	
		/* 
		// if new item, get count (dont add one),
		// update users id favs list + 1, from count
		// where user id = user list.title = title list.id = cound
		//	list.id = listCount + 1
		*/
		
		$xmlDoc = new DOMDocument();
		$xmlDoc->load('../xml/items.xml');
		
		$xmlRoot = $xmlDoc->firstChild;
		
		$newItem = $xmlDoc->createElement('item');
		$newNode = $xmlRoot->appendChild($newItem);
		
		$newNode->setAttribute("userId",$userId);
		$newNode->setAttribute("date",$date);
		$newNode->setAttribute("listId",$listId);
		$newNode->setAttribute("listItemNum",$listItemNum);
		$newNode->setAttribute("tags",$tags);
		
		$newTitle = $xmlDoc->createElement('title');
		$newURL = $xmlDoc->createElement('url');
		$newDesc = $xmlDoc->createElement('desc');
		
		$titleText = $xmlDoc->createTextNode($title);
		$urlText = $xmlDoc->createTextNode($url);
		$descText = $xmlDoc->createTextNode($desc);
		
		$newNode->appendChild($newTitle);
		$newNode->appendChild($newURL);
		$newNode->appendChild($newDesc);
		
		$newTitle->appendChild($titleText);
		$newURL->appendChild($urlText);
		$newDesc->appendChild($descText);
		
		$xmlDoc->save('../xml/items.xml');
	}
	echo json_encode(array("errorMsg"=>$errorMsg));
?>