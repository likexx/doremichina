<?php

require_once('dao.php');

class Registration {

const ERROR_SUCCESS = 0;
const ERROR_USERNAME_EXISTS = 1;
const ERROR_USERNAME_LENGTH = 2;
const ERROR_PASSWORD = 3;
const ERROR_MISSING_DATA = 4;
const ERROR_DATABASE_CONNECTION = 5;
const ERROR_EMAIL = 6;

const ERROR_NOT_VALID_USER = 100;
const ERROR_NO_SPECIALITY_SELECTED = 101;
const ERROR_NO_CONTACT = 102;

public function __construct() {

}

public function registerUserBasicInfo() {

    if (empty($_POST['username']) ||
        empty($_POST['password']) ||
        empty($_POST['nickname']) ||
        empty($_POST['email']) ||
        empty($_POST['type']) ||
        empty($_POST['zone']) ||
        empty($_POST['area'])) {
            return self::ERROR_MISSING_DATA;
        }
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $type = $_POST['type'];
    $zone = $_POST['zone'];
    $area = $_POST['area'];

    $username = htmlentities(trim($username),ENT_QUOTES, "UTF-8");
    $nickname = htmlentities(trim($nickname),ENT_QUOTES, "UTF-8");
    
    $userLen = strlen($username);
    $nickLen = strlen($nickname);
    
    if ($nickLen == 0) {
        $nickname=$username;
        $nickLen = $userLen;
    }
    
    if($userLen>20 || $userLen<4 || $nickLen>20 || $nickLen<4) {
        return self::ERROR_USERNAME_LENGTH;
    }
    
    $len = strlen($email);
    if ($len > 20 || $len < 4 || strpos($email, '@')==false) {
        return self::ERROR_EMAIL;
    }
    

    if(strlen($password)>20 || strlen($password)<4) {
        return self::ERROR_PASSWORD_LENGTH;
    }
    
    // no need to validate password if they are encrypted
    $passwordHash = md5($password);
    
    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
        
    mysql_select_db(DAO::DATABASE, $conn);
    
    $sql = "select id from user_basic where username='$username'";
    
    $result = mysql_query($sql, $conn);
    
    $rows = mysql_num_rows($result);
    
    if ($rows > 0) {
        mysql_close($conn);
        return self::ERROR_USERNAME_EXISTS;
    }
    
    $sql="INSERT INTO user_basic (username, nickname, logintype, password, email, type, zone, area) VALUES ('$username','$nickname','0','$passwordHash','$email','$type','$zone','$area')";
    
    mysql_query($sql,$conn);
    
    $uid = mysql_insert_id();
    
    error_log('uid: ' . $uid);
    setcookie('userId', $uid, time()+3600*24*30);

    mysql_close($conn);
    
    return self::ERROR_SUCCESS;
}

public function updateUserBasicInfo() {

    if (empty($_POST['nickname']) ||
        empty($_POST['email'])) {
            return self::ERROR_MISSING_DATA;
        }
    error_log("updateUserBasicInfo");
    $password = $_POST['password'];
    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $zone = $_POST['zone'];
    $area = $_POST['area'];

    $nickname = htmlentities(trim($nickname),ENT_QUOTES, "UTF-8");
    
    $nickLen = strlen($nickname);
    
    if($nickLen>20 || $nickLen<4) {
        return self::ERROR_USERNAME_LENGTH;
    }
    
    $len = strlen($email);
    if ($len > 20 || $len < 4 || strpos($email, '@')==false) {
        return self::ERROR_EMAIL;
    }

    $password = null;
    if (!empty($_POST['password'])) {
        $value = $_POST['password'];
        $len = strlen($value);
        if($len>0 && ($len>20 || $len<4)) {
            return self::ERROR_PASSWORD_LENGTH;
        }
        
        if ($len>0) {
            $password = md5($value);
        }
    }
    
    $sql = "update user_basic set nickname='$nickname',email='$email'";
    
    if ($password!=null) {
        $sql = $sql . ",password='$password'";
    }
    
    if ($zone!=0 && $area!=0) {
        $sql = $sql . ",zone='$zone',area='$area'";
    }
    
    $uid = $_COOKIE['userId'];
    
    $sql = $sql . " where id='$uid'";
    
    error_log($sql);
    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
        
    mysql_select_db(DAO::DATABASE, $conn);
    
    mysql_query($sql, $conn);
    
    mysql_close($conn);
    
    return self::ERROR_SUCCESS;
}

public function registerTeacherInfo() {
    $currentUserId = $_COOKIE['userId'];

    if($currentUserId < 1) {
       return self::ERROR_NOT_VALID_USER;
    }
    
    $realname = empty($_POST['realname']) ? null : $_POST['realname'];
    $occupation = empty($_POST['occupation']) ? null : $_POST['occupation'];
    $mobileNumber = empty($_POST['mobile_number']) ? null : $_POST['mobile_number'];
    $phoneNumber = empty($_POST['phone_number']) ? null : $_POST['phone_number'];
    $qq = empty($_POST['qq']) ? null : $_POST['qq'];

    $spec1 = empty($_POST['speciality_1']) ? null : $_POST['speciality_1'];
    $spec2 = empty($_POST['speciality_2']) ? null : $_POST['speciality_2'];
    $spec3 = empty($_POST['speciality_3']) ? null : $_POST['speciality_3'];

    $school1 = empty($_POST['school_1']) ? null : $_POST['school_1'];
    $degree1 = empty($_POST['degree_1']) ? null : $_POST['degree_1'];
    $gradyear1 = empty($_POST['gradyear_1']) ? null : $_POST['gradyear_1'];

    $school2 = empty($_POST['school_2']) ? null : $_POST['school_2'];
    $degree2 = empty($_POST['degree_2']) ? null : $_POST['degree_2'];
    $gradyear2 = empty($_POST['gradyear_2']) ? null : $_POST['gradyear_2'];

    $school3 = empty($_POST['school_3']) ? null : $_POST['school_3'];
    $degree3 = empty($_POST['degree_3']) ? null : $_POST['degree_3'];
    $gradyear3 = empty($_POST['gradyear_3']) ? null : $_POST['gradyear_3'];

    $additionalInfo = empty($_POST['additional_info']) ? null : $_POST['additional_info'];

    if ($spec1 == null && $spec2==null && $spec3==null) {
        return self::NO_SPECIALITY_SELECTED;
    }
    
    if ($mobileNumber==null && $phoneNumber==null && $qq==null) {
        return self::NO_CONTACT;
    }

    $realname = htmlentities(trim($realname),ENT_QUOTES, "UTF-8");
    if(strlen($realname)>20) {
        return self::ERROR_USERNAME_LENGTH;
    }
    
    $sql = "insert into teacher_info values ('$currentUserId','$realname','$occupation','$mobileNumber','$phoneNumber','$qq','$spec1','$spec2','$spec3','$school1','$degree1','$gradyear1','$school2','$degree2','$gradyear2','$school3','$degree3','$gradyear3','$additionalInfo')";

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
        
    mysql_select_db(DAO::DATABASE, $conn);
    
    mysql_query($sql,$conn);

    mysql_close($conn);   

    return self::ERROR_SUCCESS;
}

public function updateTeacherInfo() {

    $uid = $_COOKIE['userId'];

    if($uid < 1) {
       return self::ERROR_NOT_VALID_USER;
    }
    
    $realname = $_POST['realname'];
    $occupation = $_POST['occupation'];
    $mobileNumber = $_POST['mobile_number'];
    $phoneNumber = $_POST['phone_number'];
    $qq = $_POST['qq'];

    $spec1 = $_POST['speciality_1'];
    $spec2 = $_POST['speciality_2'];
    $spec3 = $_POST['speciality_3'];

    $school1 = $_POST['school_1'];
    $degree1 = $_POST['degree_1'];
    $gradyear1 = $_POST['gradyear_1'];

    $school2 = $_POST['school_2'];
    $degree2 = $_POST['degree_2'];
    $gradyear2 = $_POST['gradyear_2'];

    $school3 = $_POST['school_3'];
    $degree3 = $_POST['degree_3'];
    $gradyear3 = $_POST['gradyear_3'];

    $info = $_POST['info'];

    if ($spec1 == null && $spec2==null && $spec3==null) {
        return self::NO_SPECIALITY_SELECTED;
    }
    
    if ($mobileNumber==null && $phoneNumber==null && $qq==null) {
        return self::NO_CONTACT;
    }

    $realname = htmlentities(trim($realname),ENT_QUOTES, "UTF-8");
    if(strlen($realname)>20) {
        return self::ERROR_USERNAME_LENGTH;
    }
    
    $sql = "update teacher_info set realname='$realname',occupation='$occupation',mobilenumber='$mobileNumber',phonenumber='$phoneNumber',qq='$qq',speciality1='$spec1',speciality2='$spec2',speciality3='$spec3',school1='$school1',degree1='$degree1',gradyear1='$gradyear1',school2='$school2',degree2='$degree2',gradyear2='$gradyear2',school3='$school3',degree3='$degree3',gradyear3='$gradyear3',info='$info'" .
           " where id='$uid'";
    
    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
        
    mysql_select_db(DAO::DATABASE, $conn);
    
    mysql_query($sql,$conn);

    mysql_close($conn);   

    return self::ERROR_SUCCESS;
}


}


?>