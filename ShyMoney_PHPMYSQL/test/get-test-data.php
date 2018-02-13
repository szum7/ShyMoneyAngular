<?php

$minYear = 2014;
$maxYear = 2016;
$sumDb = 500;
$tagDb = 100;
$connOdds = 70; // 0-100, the higher the better chance
$maxConns = 8;

$sumStr = '';
$tagStr = '';
$connStr = '';

for ($i = 0; $i < $sumDb; $i++) {

    $year = rand($minYear, $maxYear);
    $month = rand(1, 12);
    if ($month < 10) {
        $month = "0" . $month;
    }
    if ($month == "01" || $month == "03" || $month == "05" || $month == "07" || $month == "08" || $month == "10" || $month == "12") {
        $day = rand(1, 31);
    } else if ($month == "04" || $month == "06" || $month == "09" || $month == "11") {
        $day = rand(1, 30);
    } else if ($month == "02") {
        $day = rand(1, 28);
    }
    if ($day < 10) {
        $day = "0" . $day;
    }
    if ($i != 0) {
        $sumStr .= ', <br/>';
    }
    $sumStr .= '("' . $year . '-' . $month . '-' . $day . '", "' . GenerateRandomString(rand(5, 10)) . '", ' . rand(-6000, 6000) . ')';
}

// tags
$tagDB = 30;
for ($i = 0; $i < $tagDb; $i++) {

    if ($tagStr != "") {
        $tagStr .= ', <br/>';
    }
    $tagStr .= "('" . GenerateRandomString(rand(3, 7)) . "', '" . GenerateRandomString(rand(7, 25)) . "')";

    $rnd = rand(0, 100);
    $tmp = $maxConns;
    while ($connOdds > $rnd && $tmp > 0) {
        
        $tmp--;
        $rnd = rand(0, 100);
        
        if ($connStr != "") {
            $connStr .= ', <br/>';
        }
        $connStr .= "(" . rand(1, $sumDb - 1) . "," . ($i + 1) . ")";
    }
}

echo 'INSERT INTO sums (date, title, sum) VALUES <br/>' . $sumStr . ";<br/>";
echo 'INSERT INTO tags (title, description) VALUES <br/>' . $tagStr . ";</br>";
echo 'INSERT INTO sum_tag_connection (sum_id, tag_id) VALUES <br/>' . $connStr . ";</br>";

function GenerateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

/*
 * reset
 * 

DELETE FROM sum_tag_connection;
DELETE FROM tags;
DELETE FROM sums;
ALTER TABLE tablename AUTO_INCREMENT = 1;
ALTER TABLE tablename AUTO_INCREMENT = 1;
ALTER TABLE tablename AUTO_INCREMENT = 1;

 */

?>
