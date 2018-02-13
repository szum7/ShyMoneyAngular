<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../../../db.php';
require_once '../../view-models/monthly-averages.php';
require_once '../../view-models/graph-view.php';
require_once '../../view-models/period-averages.php';
require_once '../../view-models/sum.php';
require_once '../../view-models/option.php';
require_once '../../view-models/tag.php';
require_once '../../view-models/unit.php';
require_once '../../view-models/user.php';
require_once '../../globals.php';
require_once '../../settings.php';
require_once '../../dal/sums-dal.php';

$settings = new Settings($connection_id);
$sumDAL = new SumsDAL();
$data = array(
    "data" => $sumDAL->GetSums($connection_id),
    "dataMeta" => $sumDAL->GetSumsMeta()
);

echo json_encode($data);