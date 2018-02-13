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

$expensePer = AverageExpensePerYearMonthDay($connection_id, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo);
$incomePer = AverageIncomePerYearMonthDay($connection_id, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo);

// Get data
$data = array(
    "expense" => ExpenseByDate($connection_id, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo),
    "income" => IncomeByDate($connection_id, Settings::$OPTIONS->periodAverages->dateFrom, Settings::$OPTIONS->periodAverages->dateTo),
    "expensePerMonth" => round($expensePer["perMonth"]),
    "incomePerMonth" => round($incomePer["perMonth"]),
    "expensePerDay" => round($expensePer["perDay"]),
    "incomePerDay" => round($incomePer["perDay"])
);

$data["flow"] = round($data["income"] + $data["expense"]);
$data["flowPerMonth"] = round($data["incomePerMonth"] + $data["expensePerMonth"]);
$data["flowPerDay"] = round($data["incomePerDay"] + $data["expensePerDay"]);

echo json_encode($data);