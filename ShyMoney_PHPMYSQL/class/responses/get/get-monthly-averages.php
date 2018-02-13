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

// Init settings
$settings = new Settings($connection_id);
// Init dal
$sumDAL = new SumsDAL();
// Get dates
$dates = $sumDAL->GetSimpleDates2($connection_id, Settings::$OPTIONS->monthlyAverages->dateFrom, Settings::$OPTIONS->monthlyAverages->dateTo);
// Format dates for YearOrdered_MonthlyAverages()
$dates = Dates_OrderByYear($dates);

// Get data
$data = YearOrdered_MonthlyAverages($dates);

echo json_encode($data);