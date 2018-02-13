<?php

$a = array(
    array("title" => "asd1"),
    array("title" => "asd2"),
    array("title" => "asd3"),
    array("title" => "asd4")
    
    );
$b = array(
    array("title" => "asd7"),
    array("title" => "asd1"),
    array("title" => "asd7"),
    array("title" => "asd3")
    );
$c = array_uintersect($a, $b, 'compareDeepValue');
if (count($c) > 0) {
    var_dump($c);
    //there is at least one equal value
}

function compareDeepValue($val1, $val2)
{
   return strcmp($val1['title'], $val2['title']);
}