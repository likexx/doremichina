<?php

class Registration {

const ERROR_SUCCESS = 0;
const ERROR_USERNAME_EXISTS = 1;
const ERROR_USERNAME_LENGTH = 2;
const ERROR_PASSWORD = 3;
const ERROR_MISSING_DATA = 4;
const ERROR_DATABASE_CONNECTION = 5;

public function __construct() {

}

public function registerUserBasicInfo() {

    if (empty($_POST['username']) ||
        empty($_POST['password']) ||
        empty($_POST['type']) ||
        empty($_POST['zone']) ||
        empty($_POST['area'])) {
            return self::ERROR_MISSING_DATA;
        }
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $type = $_POST['type'];
    $zone = $_POST['zone'];
    $area = $_POST['area'];

    $username = htmlentities(trim($username),ENT_QUOTES, "UTF-8");
    if(strlen($username)>20) {
        return self::ERROR_USERNAME_LENGTH;
    }
    if(strlen($password)>20) {
        return self::ERROR_PASSWORD_LENGTH;
    }
    
    // no need to validate password if they are encrypted
    $passwordHash = md5($password);

    $conn = mysql_connect('serval.arvixe.com', 'doremi_china', 'Like1027');
    if (!$conn) {
        return self::ERROR_DATABASE_CONNECTION;
    } 
    
    mysql_select_db("doremi_china", $conn);
    
    $sql = "select id from user_basic where username='$username'";
    
    $result = mysql_query($sql, $conn);
    
    $rows = mysql_num_rows($result);
    
    if ($rows > 0) {
        mysql_close($conn);
        return self::ERROR_USERNAME_EXISTS;
    }
    
    $sql="INSERT INTO user_basic (username, logintype, password, type, zone, area) VALUES ('$username','0','$passwordHash','$type','$zone','$area')";
    
    mysql_query($sql,$conn);
    
    mysql_close($conn);
    
    return self::ERROR_SUCCESS;
}


public function registerUserBasicInfo() {

    if (empty($_POST['realname']) ||
        empty($_POST['occupation']) ||
        empty($_POST['phonenumber']) ||
        empty($_POST['speciality_1']) ||
        empty($_POST['speciality_2']) ||
        empty($_POST['speciality_3']) ||
        empty($_POST['school_1']) ||
        empty($_POST['school_2']) ||
        empty($_POST['school_3']) ||
        empty($_POST['area'])) {
            return self::ERROR_MISSING_DATA;
        }
    
    $username = empty($_POST['realname']) ? null : $_POST['realname'];
    $occupation = empty($_POST['occupation']) ? null : $_POST['occupation'];
    $phonenumber = empty($_POST['phonenumber']) ? null : $_POST['phonenumber'];



    $username = empty($_POST['realname']) ? null : $_POST['realname'];
    $username = empty($_POST['realname']) ? null : $_POST['realname'];
    
    $password = $_POST['password'];
    $type = $_POST['type'];
    $zone = $_POST['zone'];
    $area = $_POST['area'];

    $username = htmlentities(trim($username),ENT_QUOTES, "UTF-8");
    if(strlen($username)>20) {
        return self::ERROR_USERNAME_LENGTH;
    }
    if(strlen($password)>20) {
        return self::ERROR_PASSWORD_LENGTH;
    }
    
    // no need to validate password if they are encrypted
    $passwordHash = md5($password);

    $conn = mysql_connect('serval.arvixe.com', 'doremi_china', 'Like1027');
    if (!$conn) {
        return self::ERROR_DATABASE_CONNECTION;
    } 
    
    mysql_select_db("doremi_china", $conn);
    
    $sql = "select id from user_basic where username='$username'";
    
    $result = mysql_query($sql, $conn);
    
    $rows = mysql_num_rows($result);
    
    if ($rows > 0) {
        mysql_close($conn);
        return self::ERROR_USERNAME_EXISTS;
    }
    
    $sql="INSERT INTO user_basic (username, logintype, password, type, zone, area) VALUES ('$username','0','$passwordHash','$type','$zone','$area')";
    
    mysql_query($sql,$conn);
    
    mysql_close($conn);
    
    return self::ERROR_SUCCESS;
}



}


?>