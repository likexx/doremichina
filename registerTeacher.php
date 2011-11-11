<?php
  require_once('./class/registration.php');
  
  $registration = new Registration();
  $result = $registration->registerTeacherInfo();
  error_log('registration error: ' . $result);
  echo $result;
?>