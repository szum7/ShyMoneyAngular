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
require_once '../../functions/date-order.php';
require_once '../../functions/average.php';
require_once '../../dal/sums-dal.php';

// get post data
$tags = json_decode(file_get_contents("php://input"));

// Init settings
$settings = new Settings($connection_id);
// Init dal
$sumDAL = new SumsDAL();
// Get dates
$dates = $sumDAL->GetSimpleDates2($connection_id, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo);
// Format dates for data
//$dates = Dates_OrderByYear($dates);

//echo json_encode($dates);

$formattedTags = array();
for($i = 0; $i < count($tags); $i++){
    array_push($formattedTags, array(
        "id"=> $tags[$i]->id,
        "title"=>$tags[$i]->title
    ));
}

echo json_encode(FilterByTagsPeriodAverages($dates, $formattedTags, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo));