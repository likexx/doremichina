<?php
require_once('dao.php');

class UserReview {

public $teacher_id = 0;
public $reviewer_id = 0;
public $spec1_rating = 0;
public $spec2_rating = 0;
public $spec3_rating = 0;
public $comment = '';
public $timestamp = 0;

public $username = '';
public $nickname = '';

public function __construct($row) {
   $this->teacher_id = $row['teacher_id'];

   if (isset($row['reviewer_id'])){
       $this->teacher_id = $row['reviewer_id'];
   }

   if (isset($row['spec1_rating'])) {
       $this->spec1_rating = $row['spec1_rating'];
   }
   if (isset($row['spec2_rating'])) {
       $this->spec2_rating = $row['spec2_rating'];
   }
   if (isset($row['spec3_rating'])) {
       $this->spec3_rating = $row['spec3_rating'];
   }
   if (isset($row['comment'])) {
       $this->comment = $row['comment'];
   }
   
   if (isset($row['timestamp'])){
       $this->timestamp = $row['timestamp'];
   }
   
   if (isset($row['username'])){
       $this->username = $row['username'];
   }

   if (isset($row['nickname'])){
       $this->nickname = $row['nickname'];
   }
   
}

public function save() {

    if (!isset($_COOKIE['userId'])) {
        return 0;
    }

    $this->reviewer_id = $_COOKIE['userId'];
    $this->timestamp = time();

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);
    
    $sql = "select * from review where teacher_id='" . $this->teacher_id . "' and reviewer_id='" . $this->reviewer_id . "'";

    $result = mysql_query($sql, $conn);
    $num = mysql_num_rows($result);
    
    if ($num > 0) {
        $sql = "update review set spec1_rating='" . $this->spec1_rating . 
               "',spec2_rating='" . $this->spec2_rating . 
               "',spec3_rating='" . $this->spec3_rating . 
               "',comment='" . $this->comment . 
               "',timestamp='" . $this->timestamp . 
               "' where teacher_id='" . $this->teacher_id . "' and reviewer_id='" . $this->reviewer_id . "'";
    } else {
        $sql = "insert into review values('" . $this->teacher_id .
               "','" . $this->reviewer_id .
               "','" . $this->spec1_rating .
               "','" . $this->spec2_rating .
               "','" . $this->sepc3_rating .
               "','" . $this->comment .
               "','" . $this->timestamp .
               "')";
    }
    error_log($sql);
    mysql_query($sql, $conn);
    
    mysql_close($conn);
    
    return $this->teacher_id;

}

}

