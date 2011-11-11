<?php
require_once('./class/teacherinfo.php');

setcookie('testUserId', '111', time()+3600*24*30, '/');

$currentUserId = $_COOKIE['testUserId'];

echo $currentUserId;

/*  
$currentUserId = $_COOKIE['userId'];

echo $currentUserId . '<br/>';

$teacher = new TeacherInfo($currentUserId);

echo $teacher->toJsonString();

$teacher->realName = 'new name';
*/
//$teacher->save();

?>
