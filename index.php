<!DOCTYPE html>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<script type="text/javascript" src="./js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="./js/yahoo-min.js"></script>
<script type="text/javascript" src="./js/json-min.js"></script>
<script type="text/javascript" src="./js/global.js"></script>
<script type="text/javascript" src="./js/page.js"></script>
<script type="text/javascript" src="./js/registration.js"></script>
<script type="text/javascript" src="./js/review.js"></script>
<script>

<?php
$userid = 0;
if (isset($_COOKIE['userId'])) {
   $userid = $_COOKIE['userId'];
   echo 'GLOBAL.set("userId", ' . $userid . ');';
} else {
   echo 'GLOBAL.set("userId", 0);';
}
?>

</script>

</head>

<body onload="initPage();">
<div style='margin:0 auto;width:1024px;font-size:14px; font-family:"Microsoft YaHei",Arial;'>
<div style="border-radius:9px; background-color:#CCCCCC;height:35px;width:100%;font-size:20px;font-weight:bold;">
<span style="position:relative; top:5px; left:5px; cursor:pointer;" onclick='window.location = "./index.php"'>
DO RE MI 中国
</span>
<div></div>
<div id="DIV_USER_MENU" style="position:relative; top: -20px; left:500px; font-size:12px;">
<span id="login_error" style='color:red;'></span>用户名<input id='login_username' type='text'> 密码<input id='login_password' type='password'> <input onclick='REGISTRATION.login();' type='button' value='登录'>   | 
<span onclick="PAGE.showRegistration();" style="cursor:pointer;">快速加入</span>
</div>
</div>
<div style="height:10px;"></div>
<div id='DIV_USER_INFO_UPDATE' style='width:100%;visibility:hidden;display:none;'>

<div>
</div>

</div>
<div style="height:10px;"></div>
<div id="DIV_DISPLAY_CANVAS">
	<div id='DIV_AREA' style='border-radius:9px;border:2px solid #CCCCCC;'>
		<div style="background-color:#CCCCCC;width:100%;font-weight:bold;">
		省市/地区选择
		</div>
		
		<div id='DIV_ZONE_LIST'></div>
		<div id='DIV_AREA_LIST'></div>
	
	</div>
    <div style="height:10px;"></div>

	<div id='DIV_TEACHERS' style='border-radius:9px;border:2px solid #CCCCCC;'>
		<div style="background-color:#CCCCCC;font-weight:bold;">
		教师列表
		</div>
	
		<div id="DIV_TEACHERS_LIST">
		</div>
	 
	</div>
</div>
</div>
</body>
</html>