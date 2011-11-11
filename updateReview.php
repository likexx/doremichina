<?php

require_once('./class/userreview.php');
  
$review = new UserReview($_POST);
$teacher_id = $review->save();

echo '{"teacher_id":' . $teacher_id . '}';
?>