<?php
echo date('Y-m', strtotime("-" . 4 . " months")) . "-01";
echo date('Y-m-d');
$connection_id = new mysqli("localhost", "root", "", "mymoney_10");
if ($connection_id->connect_errno) {
    echo "Failed to connect to MySQL: (" . $connection_id->connect_errno . ") " . $connection_id->connect_errno;
}
$connection_id->set_charset("utf8");

$query = "
    SELECT *
    FROM flow
    ;";
$result = mysqli_query($connection_id, $query) or die("BAD QUERY - " . $query);
if (mysqli_num_rows($result) > 0) {
    $str = "INSERT INTO sums (title, sum, date) VALUES ";
    $str .= "<br/>";
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        if($i != 0){
            $str .= ",<br/>";
        }
        $i++;
        $des = ($row["description"] == "null") ? "" : $row["description"];
        $str .= "('" . $des . "', " . $row["sum"] . ", '" . $row["date"] . " 00:00:00')";
    }
    $str .= ";";
}
echo $str;
?>
