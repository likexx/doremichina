<?php
require_once('userreview.php');

class ReviewList {

protected $reviews = array();

public function __construct() {
}

public function load($teacher_id) {

    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);
    
    $sql = "select r.teacher_id as teacher_id, r.reviewer_id as reviewer_id, r.spec1_rating as spec1_rating, r.spec2_rating as spec2_rating, r.spec3_rating as spec3_rating, r.comment as comment, r.timestamp as timestamp, u.nickname as nickname, u.username as username " .
           "from review r, user_basic u where r.teacher_id='$teacher_id' and u.id=r.reviewer_id";

    $result = mysql_query($sql, $conn);
    $num = mysql_num_rows($result);
    error_log('total rows: ' . $num);
    while ($row = mysql_fetch_assoc($result)) {
        error_log($row['nickname']);
        error_log($row['username']);
        $r = new UserReview($row);
        $this->reviews[] = $r;
    }
    
    mysql_close($conn);

}

public function toJsonString() {

    $data='{"reviews":[';
    $num = count($this->reviews);
    $i = 0;
    while ($i < $num) {
        $r = $this->reviews[$i];
        $name = strlen($r->nickname) > 0 ? $r->nickname : $r->username;
        
        $teacher='{"reviewer_id":' . $r->reviewer_id . ',' .
                 '"reviewername":"' . $name . '",' .
                 '"spec1_rating":"' . $r->spec1_rating . '",' .
                 '"spec2_rating":"' . $r->spec2_rating . '",' .
                 '"spec3_rating":"' . $r->spec3_rating . '",' .
                 '"comment":"' . $r->comment . '",' .
                 '"timestamp":' . $r->timestamp .
                 '}';
        
        $data = $data . $teacher;
        $i++;
        if ($i < $num) {
            $data = $data . ',';
        }
    }

    $data = $data . ']}';

    return $data;
}

}

?>