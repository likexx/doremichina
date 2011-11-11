<?php
require_once('dao.php');

class User {

private $_id;

public $name;

public $zone;

public $area;

public $email;

private $_type;


public function __construct($id) {
    $this->_id = $id;
    $this->loadData($id);
}

private function loadData($id) {

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);

    $sql = "select * from user_basic where id='$id'";
    error_log('sql: ' . $sql);
    
    $result = mysql_query($sql, $conn);

    $row = mysql_fetch_assoc($result);
    $this->name = $row['nickname'];
    if (strlen($this->name) == 0) {
        $this->name = $row['username'];
    }
    
    $this->_type = $row['type'];
    $this->zone = $row['zone'];
    $this->area = $row['area'];
    $this->email = $row['email'];
    
    
    mysql_close($conn);
}

private function save() {

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);

    $sql = "update user_basic set " .
           "nickname='" . $this->name . "'," .
           "zone='" . $this->zone . "'," .
           "area='" . $this->area . "'," .
           "email='" . $this->email . "' where id='" . $this->_id . "'";
    
    mysql_query($sql, $conn);

    mysql_close($conn);
}

public function getName() {

    return $this->name;
}

public function isTeacher() {
    return $this->_type == 0;
}

public function toJsonString() {

   $json = '{"id":' . $this->_id . "," .
           '"type":' . $this->_type . "," .
           '"name":"' . $this->name . '",' .
           '"zone":' . $this->zone . ',' .
           '"area":' . $this->area . ',' .
           '"email":"' . $this->email . '"}';
           
   return $json;

}

}

?>