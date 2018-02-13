<?php
include "../db.php";
$query = "SELECT id FROM sums WHERE sum = -11000 or sum = -11880";
$result = mysqli_query($connection_id, $query) or die("gsa17 - " . $query);

$str = "";
$ids = "";
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        if($str != ""){
            $str .= ",";
        }
        if($ids != ""){
            $ids .= ",";
        }
        $str .= "(" . $row["id"] . ",1),";
        $str .= "(" . $row["id"] . ",4),";
        $str .= "(" . $row["id"] . ",20)";
        
        $ids .= $row["id"];
    }
}
$ids = "DELETE FROM sum_tag_connection WHERE sum_id IN (" . $ids . ");";
$str = "INSERT INTO sum_tag_connection (sum_id, tag_id) VALUES " . $str . ";";
echo $ids . "<br>";
echo $str;
//function CreateDateRangeArray($strDateFrom, $strDateTo) {
//    // takes two dates formatted as YYYY-MM-DD and creates an
//    // inclusive array of the dates between the from and to dates.
//    // could test validity of dates here but I'm already doing
//    // that in the main script
//
//    $aryRange = array();
//
//    $iDateFrom = mktime(1, 0, 0, substr($strDateFrom, 5, 2), substr($strDateFrom, 8, 2), substr($strDateFrom, 0, 4));
//    $iDateTo = mktime(1, 0, 0, substr($strDateTo, 5, 2), substr($strDateTo, 8, 2), substr($strDateTo, 0, 4));
//
//    if ($iDateTo >= $iDateFrom) {
//        array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
//        while ($iDateFrom < $iDateTo) {
//            $iDateFrom+=86400; // add 24 hours
//            array_push($aryRange, date('Y-m-d', $iDateFrom));
//        }
//    }
//    return $aryRange;
//}
//$arr = CreateDateRangeArray("2016-03-10", "2016-10-20");
//
//$arr = array("Alma" => "gyümölcs");
//$arr["Körte"] = "Ez is gyümölcs";
//
//
//$arr = array(1, 2, 3, 4, 5, 6);
//$i = 1;
//$j = 0;
//while($i < count($arr) && $j < 3){
//    array_splice($arr, $i, 1);
//    $j++;
//}
//print_r($arr);

