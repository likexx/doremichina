<?php
    require_once('./class/dao.php');
  
    $sql = "select b.id as id,b.username as username,b.nickname as nickname,t.speciality1 as spec1,t.speciality2 as spec2,t.speciality3 as spec3 from user_basic b,teacher_info t where b.id=t.id";

    if (isset($_POST['area'])) {
        $area = $_POST['area'];
        $sql = $sql . " and area='$area'";
    } else if (isset($_POST['zone'])) {
        $zone = $_POST['zone'];
        $sql = $sql . " and zone='$zone'";
    } else {
        return;
    }
        
    $conn = mysql_connect(DAO::SERVER, DAO::USER, DAO::PASSWORD);
    mysql_select_db(DAO::DATABASE, $conn);

    $result = mysql_query($sql, $conn);
    $num = mysql_num_rows($result);
    
    $data='{"teachers":[';
    $i = 0;
    while ($row = mysql_fetch_assoc($result)) {
        $name=$row['nickname'];
        if (strlen($name)==0) {
            $name=$row['username'];
        }
        $id=$row['id'];
        
        $specs = $row['spec1'] . ',' . $row['spec2'] . ',' . $row['spec3'];
        
        $teacher='{"id":' . $id . ',' .
                 '"name":"' . $name . '",' .
                 '"rating": 3' . ',' .
                 '"specialities":"' . $specs . '"' .
                 '}';
        
        $data = $data . $teacher;
        $i++;
        if ($i < $num) {
            $data = $data . ',';
        }
    }
    
    mysql_close($conn);

    $data = $data . ']}';

    echo $data;

?>