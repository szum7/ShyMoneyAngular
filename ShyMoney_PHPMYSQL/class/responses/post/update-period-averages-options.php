<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../../../db.php';
require_once '../../view-models/monthly-averages.php';
require_once '../../view-models/graph-view.php';
require_once '../../view-models/period-averages.php';
require_once '../../view-models/option.php';
require_once '../../view-models/unit.php';
require_once '../../view-models/user.php';
require_once '../../globals.php';
require_once '../../settings.php';
require_once '../../dal/options-dal.php';

// get post data
$op = json_decode(file_get_contents("php://input"));

// init
$optionsDAL = new OptionsDAL();

// func
$result = $optionsDAL->UpdatePeriodAveragesOptions($connection_id, $op);

// response
echo json_encode($result);