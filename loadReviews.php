<?php

require_once('./class/reviewlist.php');

if (!isset($_POST['id'])) {
   echo '{}';
   return;
}  
  
$reviews = new ReviewList();
$reviews->load($_POST['id']);

echo $reviews->toJsonString();

?>
