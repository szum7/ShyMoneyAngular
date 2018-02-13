<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../../../db.php';
require_once '../../view-models/sum.php';
require_once '../../view-models/option.php';
require_once '../../view-models/tag.php';
require_once '../../view-models/unit.php';
require_once '../../view-models/user.php';
require_once '../../view-models/monthly-averages.php';
require_once '../../view-models/period-averages.php';
require_once '../../view-models/graph-view.php';
require_once '../../globals.php';
require_once '../../settings.php';
require_once '../../dal/sums-dal.php';

// get post data
$sumId = json_decode(file_get_contents("php://input"));

// init
$settings = new Settings($connection_id);
$sumDAL = new SumsDAL();

// func
$bool = $sumDAL->DeleteSum($connection_id, $sumId);

// response
if($bool){
    echo json_encode(array(
        "Message" => "Success"
    ));
}else{
    echo json_encode(array(
        "Message" => "Error"
    ));
}
