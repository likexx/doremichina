
<?php
require_once('./class/teacherinfo.php');

$specs = array();

$xml = simplexml_load_file('./config/specialities.xml');

foreach($xml->speciality as $node) {
   $id = $node['id'];
   $name = $node['name'];
   $specs['' . $id] = $name;
}

$userId = isset($_COOKIE['userId']) ? $_COOKIE['userId'] : 0;

$teacherId = $_POST['teacher_id'];
$teacher = new TeacherInfo($teacherId);
?>

<div id="DIV_TEACHER_DETAILS_INFO">
真实姓名：<?php 
if ($userId != 0) {
  echo $teacher->realName; 
} else {
   echo '<span style="color:red;">登录用户可见</span>';
}
?><br/>
手机号码：<?php 
if ($userId != 0) {
   echo $teacher->mobileNumber;
} else {
   echo '<span style="color:red;">登录用户可见</span>';
}
?><br/>
其他联系号码：<?php 
if ($userId != 0) {
   echo $teacher->phoneNumber; 
} else {
   echo '<span style="color:red;">登录用户可见</span>';
}
?><br/>
</div>
<hr>
提交评论
<div id="DIV_TEACHER_DETAILS_NEW_REVIEW">
<input type="hidden" id="new_review_teacher_id" value="<?php echo $teacherId;?>"/>
<?php 
if ($teacher->specialities[0] > 0) {
    echo $specs['' . $teacher->specialities[0]];
?>
<span id="new_review_spec1_rating_v1" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(1, 1);" onmouseout="PAGE.resetReviewSpecValue(1, 1);" onclick="PAGE.saveReviewSpecValue(1, 1);">★</span>
<span id="new_review_spec1_rating_v2" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(1, 2);" onmouseout="PAGE.resetReviewSpecValue(1, 2);" onclick="PAGE.saveReviewSpecValue(1, 2);">★</span>
<span id="new_review_spec1_rating_v3" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(1, 3);" onmouseout="PAGE.resetReviewSpecValue(1, 3);" onclick="PAGE.saveReviewSpecValue(1, 3);">★</span>
<span id="new_review_spec1_rating_v4" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(1, 4);" onmouseout="PAGE.resetReviewSpecValue(1, 4);" onclick="PAGE.saveReviewSpecValue(1, 4);">★</span>
<span id="new_review_spec1_rating_v5" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(1, 5);" onmouseout="PAGE.resetReviewSpecValue(1, 5);" onclick="PAGE.saveReviewSpecValue(1, 5);">★</span>
<input type='hidden' id='new_review_spec1_rating'/>
<br/>
<?php
}
?>
<?php 
if ($teacher->specialities[1] > 0) {
    echo $specs['' . $teacher->specialities[1]];
?>
<span id="new_review_spec2_rating_v1" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(2, 1);" onmouseout="PAGE.resetReviewSpecValue(2, 1);" onclick="PAGE.saveReviewSpecValue(2, 1);">★</span>
<span id="new_review_spec2_rating_v2" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(2, 2);" onmouseout="PAGE.resetReviewSpecValue(2, 2);" onclick="PAGE.saveReviewSpecValue(2, 2);">★</span>
<span id="new_review_spec2_rating_v3" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(2, 3);" onmouseout="PAGE.resetReviewSpecValue(2, 3);" onclick="PAGE.saveReviewSpecValue(2, 3);">★</span>
<span id="new_review_spec2_rating_v4" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(2, 4);" onmouseout="PAGE.resetReviewSpecValue(2, 4);" onclick="PAGE.saveReviewSpecValue(2, 4);">★</span>
<span id="new_review_spec2_rating_v5" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(2, 5);" onmouseout="PAGE.resetReviewSpecValue(2, 5);" onclick="PAGE.saveReviewSpecValue(2, 5);">★</span>
<input type='hidden' id='new_review_spec2_rating'/>
<br/>
<?php
}
?>
<?php 
if ($teacher->specialities[2] > 0) {
    echo $specs['' . $teacher->specialities[2]];
?>
<span id="new_review_spec3_rating_v1" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(3, 1);" onmouseout="PAGE.resetReviewSpecValue(3, 1);" onclick="PAGE.saveReviewSpecValue(3, 1);">★</span>
<span id="new_review_spec3_rating_v2" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(3, 2);" onmouseout="PAGE.resetReviewSpecValue(3, 2);" onclick="PAGE.saveReviewSpecValue(3, 2);">★</span>
<span id="new_review_spec3_rating_v3" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(3, 3);" onmouseout="PAGE.resetReviewSpecValue(3, 3);" onclick="PAGE.saveReviewSpecValue(3, 3);">★</span>
<span id="new_review_spec3_rating_v4" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(3, 4);" onmouseout="PAGE.resetReviewSpecValue(3, 4);" onclick="PAGE.saveReviewSpecValue(3, 4);">★</span>
<span id="new_review_spec3_rating_v5" style="cursor:pointer;" onmouseover="PAGE.setReviewSpecValue(3, 5);" onmouseout="PAGE.resetReviewSpecValue(3, 5);" onclick="PAGE.saveReviewSpecValue(3, 5);">★</span>
<input type='hidden' id='new_review_spec3_rating'/>
<br/>
<?php
}
?>

<textarea id="new_review_comment" rows="5" cols="80"></textarea>
<br/>
<input type="button" onclick="REVIEW.postReview();" value="提交评论"/>
</div>
<input type="hidden" id="review_teacher_spec1_value" value="<?php echo $teacher->specialities[0];?>"/>
<input type="hidden" id="review_teacher_spec2_value" value="<?php echo $teacher->specialities[1];?>"/>
<input type="hidden" id="review_teacher_spec3_value" value="<?php echo $teacher->specialities[2];?>"/>
<hr>
反馈及评分
<div id="DIV_TEACHER_DETAILS_REVIEWS">
</div>
