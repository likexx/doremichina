<?php
require_once('dao.php');

class TeacherInfo {

private $_id;

public $realName = "";

public $mobileNumber = "";

public $phoneNumber = "";

public $qq = "";

public $occupation = 0;

public $specialities = array();

public $educations = array();

public $info = "";

public function __construct($id) {
    $this->_id = $id;
    $this->loadData($id);
}

private function loadData($id) {

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);

    $sql = "select * from teacher_info where id='$id'";
    
    $result = mysql_query($sql, $conn);

    $row = mysql_fetch_assoc($result);
    $this->realName = $row['realname'];
    $this->mobileNumber = $row['mobilenumber'];
    $this->phoneNumber = $row['phonenumber'];
    $this->occupation = $row['occupation'];
    $this->qq = $row['qq'];
    
    $this->specialities[] = $row['speciality1'];
    $this->specialities[] = $row['speciality2'];
    $this->specialities[] = $row['speciality3'];
    
    $edu1 = array(
        'degree'=>$row['degree1'],
        'gradyear'=>$row['gradyear1'],
        'school'=>$row['school1']
    );
    
    $edu2 = array(
        'degree'=>$row['degree2'],
        'gradyear'=>$row['gradyear2'],
        'school'=>$row['school2']
    );
    
    $edu3 = array(
        'degree'=>$row['degree3'],
        'gradyear'=>$row['gradyear3'],
        'school'=>$row['school3']
    );
    
    $this->educations[]=$edu1;
    $this->educations[]=$edu2;
    $this->educations[]=$edu3;
    
    $this->info = $row['info'];
    
    mysql_close($conn);
}

public function save() {

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);

    $sql = "update teacher_info set realname='" . $this->realName . "'," .
           "mobileNumber='" . $this->mobileNumber . "'," .
           "phoneNumber='" . $this->phoneNumber . "'," .
           "occupation='" . $this->occupation . "'," .
           "qq='" . $this->qq . "'," .
           "speciality1='" . $this->specialities[0] . "'," .
           "speciality2='" . $this->specialities[1] . "'," .
           "speciality3='" . $this->specialities[2] . "'," .
           "degree1='" . $this->educations[0]['degree'] . "'," .
           "gradyear1='" . $this->educations[0]['gradyear'] . "'," .
           "school1='" . $this->educations[0]['school'] . "'," .
           "degree2='" . $this->educations[1]['degree'] . "'," .
           "gradyear2='" . $this->educations[1]['gradyear'] . "'," .
           "school2='" . $this->educations[1]['school'] . "'," .
           "degree3='" . $this->educations[2]['degree'] . "'," .
           "gradyear3='" . $this->educations[2]['gradyear'] . "'," .
           "school3='" . $this->educations[2]['school'] . "' " .
           "where id='" + $this->_id + "'";
    
    mysql_query($sql, $conn);

    mysql_close($conn);

}

public function toJsonString() {

    $json = '{"realName":"' . $this->realName . '",' .
            '"mobileNumber":"' . $this->mobileNumber . '",' .
            '"phoneNumber":"' . $this->phoneNumber . '",' .
            '"qq":"' . $this->qq . '",' .
            '"occupation":' . $this->occupation . ',' .
            '"speciality1":' . $this->specialities[0] . ',' .
            '"speciality2":' . $this->specialities[1] . ',' .
            '"speciality3":' . $this->specialities[2] . ',' .
            '"degree1":' . $this->educations[0]['degree'] . ',' .
            '"gradyear1":' . $this->educations[0]['gradyear'] . ',' .
            '"school1":"' . $this->educations[0]['school'] . '",' .
            '"degree2":' . $this->educations[1]['degree'] . ',' .
            '"gradyear2":' . $this->educations[1]['gradyear'] . ',' .
            '"school2":"' . $this->educations[1]['school'] . '",' .
            '"degree3":' . $this->educations[2]['degree'] . ',' .
            '"gradyear3":' . $this->educations[2]['gradyear'] . ',' .
            '"school3":"' . $this->educations[2]['school'] . '",' .
            '"info":"' . $this->info . '"}';
            
    return $json;

}

}

?>