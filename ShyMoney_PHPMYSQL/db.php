<?php
$connection_id = new mysqli("localhost", "root", "", "shy_money_v3");
//$connection_id = new mysqli("localhost", "szumcom_root", "1BitBitbit7", "szumcom_shy_moneytest");
if ($connection_id->connect_errno) {
    echo "Failed to connect to MySQL: (" . $connection_id->connect_errno . ") " . $connection_id->connect_errno;
}
$connection_id->set_charset("utf8");
?>