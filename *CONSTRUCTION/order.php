<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

include 'SimpleDOM.php';

$filename = $_SERVER['DOCUMENT_ROOT'] . '/xml/items.xml';

$xml = simplexml_load_file($filename);

$page = simpledom_load_file($filename);

$nodes = $page->sortedXPath('//item', '@userId', SORT_ASC, '@listId', SORT_ASC, '@listItemNum', SORT_ASC);

$result = '<?xml version="1.0" encoding="UTF-8" ?>
<items>';

$checkedItems = array();
foreach ($_GET['listItem'] as $position => $item) {
    foreach ($nodes as $node) {
        if ($node->attributes()->userId == $_GET['userid']
                && $node->attributes()->listId == $_GET['id']
                && $node->attributes()->listItemNum == $item) {
            
            if (!in_array($item, $checkedItems)) {
                
                $node->attributes()->listItemNum = $position;
                
                $checkedItems[] = $item;
            }
        }
    }
}

foreach ($nodes as $node) {
    $result .= $node->asXML() . "\n";
}

$result .= "</items>";


// sort items again
$page = simpledom_load_string($result);

$nodes = $page->sortedXPath('//item', '@userId', SORT_ASC, '@listId', SORT_ASC, '@listItemNum', SORT_ASC);

$result = '<?xml version="1.0" encoding="UTF-8" ?>
<items>';

foreach ($nodes as $node) {
    $result .= $node->asXML() . "\n";
}

$result .= "</items>";

$fp = fopen($filename, 'w');
$fw = fwrite($fp, $result);
fclose($fp);
