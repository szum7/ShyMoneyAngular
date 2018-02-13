<?php

/**
 * Single averages
 */

// public
function FilterByTagsPeriodAverages($sums /* $sumDAL->GetSimpleDates */, $tags, $date_from, $date_to){
        
    $ret = array(
        "expense" => 0,
        "income" => 0,
        "flow" => 0,
        "expensePerMonth" => 0,
        "incomePerMonth" => 0,
        "flowPerMonth" => 0,
        "expensePerDay" => 0,
        "incomePerDay" => 0,
        "flowPerDay" => 0
    );
    
    if(count($tags) == 0){
        return $ret;
    }
    
    function compareDeepValue($val1, $val2){
       return strcmp($val1["id"], $val2["id"]);
    }
    
    for($i = 0; $i < count($sums); $i++){
        for($j = 0; $j < count($sums[$i]["data"]); $j++){
            
            if(count($sums[$i]["data"][$j]["tags"]) > 0 && count($tags) <= count($sums[$i]["data"][$j]["tags"])){
                
                $inter = array_uintersect($tags, $sums[$i]["data"][$j]["tags"], "compareDeepValue");
                if(count($inter) == count($tags)){
                    
                    if($sums[$i]["data"][$j]["sum"] > 0){                        
                        $ret["income"] += $sums[$i]["data"][$j]["sum"];                        
                    }else if($sums[$i]["data"][$j]["sum"] < 0){                        
                        $ret["expense"] += $sums[$i]["data"][$j]["sum"];
                    }
                    
                }                
            }
        }
    }
    
    $d1 = new DateTime($date_from);
    $d2 = new DateTime($date_to);

    $monthCount = ($d1->diff($d2)->m + ($d1->diff($d2)->y*12)); // int(8)(?)
    $days = intval(substr($date_to, 8, 2)) - 1;    
    
    $ret["flow"] = round($ret["income"] + $ret["expense"]);
    $ret["expensePerDay"] = round($ret["expense"] / ($monthCount * (30 + $days)));
    $ret["incomePerDay"] = round($ret["income"] / ($monthCount * (30 + $days)));
    $ret["flowPerDay"] = round($ret["incomePerDay"] + $ret["expensePerDay"]);
    $ret["expensePerMonth"] = round($ret["expense"] / $monthCount);
    $ret["incomePerMonth"] = round($ret["income"] / $monthCount);
    $ret["flowPerMonth"] = round($ret["incomePerMonth"] + $ret["expensePerMonth"]);
    
    return $ret;
}

// public
function ExpenseByDate($connection_id, $date_from = "1000-01-01", $date_to = "unset"){
    if($date_to == "unset"){ $date_to = date("Y-m-d"); }
    $query = "
        select SUM(sums.sum) as expense
        from sums
        where sums.sum < 0
        and sums.date >= '" . $date_from . "'
        and sums.date < '" . $date_to . "'
        order by expense;";
    $result = mysqli_query($connection_id, $query) or die("ss10 - " . $query);
    if (mysqli_num_rows($result) > 0) {
        
        $row = mysqli_fetch_assoc($result);
        
        return intval($row["expense"]);        
    }
}

// public
function IncomeByDate($connection_id, $date_from = "1000-01-01", $date_to = "unset"){
    if($date_to == "unset"){ $date_to = date("Y-m-d"); }
    $query = "
        select SUM(sums.sum) as income
        from sums
        where sums.sum > 0
        and sums.date >= '" . $date_from . "'
        and sums.date < '" . $date_to . "'
        order by income;";
    $result = mysqli_query($connection_id, $query) or die("ss10 - " . $query);
    if (mysqli_num_rows($result) > 0) {
        
        $row = mysqli_fetch_assoc($result);
        
        return intval($row["income"]);        
    }
}

// public
function AverageExpensePerYearMonthDay($connection_id, $date_from = "1000-01-01", $date_to = "unset"){
    if($date_to == "unset"){ $date_to = date("Y-m-d"); }
    $query = "
        select SUM(sums.sum) as expense
        from sums
        where sums.sum < 0
        and sums.date >= '" . $date_from . "'
        and sums.date < '" . $date_to . "';";
    $result = mysqli_query($connection_id, $query) or die("ss10 - " . $query);
    if (mysqli_num_rows($result) > 0) {
        
        $row = mysqli_fetch_assoc($result);
        $d1 = new DateTime($date_from);
        $d2 = new DateTime($date_to);

        $monthCount = ($d1->diff($d2)->m + ($d1->diff($d2)->y*12)); // int(8)(?)
        $days = intval(substr($date_to, 8, 2)) - 1;
        
        return array(
            "perYear" => 0,
            "perMonth" => intval($row["expense"]) / $monthCount,
            "perDay" => (intval($row["expense"]) / ($monthCount * (30 + $days)))
        );      
    }
}

// public
function AverageIncomePerYearMonthDay($connection_id, $date_from = "1000-01-01", $date_to = "unset"){
    if($date_to == "unset"){ $date_to = date("Y-m-d"); }
    $query = "
        select SUM(sums.sum) as income
        from sums
        where sums.sum > 0
        and sums.date >= '" . $date_from . "'
        and sums.date < '" . $date_to . "';";
    $result = mysqli_query($connection_id, $query) or die("ss10 - " . $query);
    if (mysqli_num_rows($result) > 0) {
        
        $row = mysqli_fetch_assoc($result);
        $d1 = new DateTime($date_from);
        $d2 = new DateTime($date_to);

        $monthCount = ($d1->diff($d2)->m + ($d1->diff($d2)->y*12));
        $days = intval(substr($date_to, 8, 2)) - 1;  
        
        return array(
            "perYear" => 0,
            "perMonth" => intval($row["income"]) / $monthCount,
            "perDay" => (intval($row["income"]) / ($monthCount * (30 + $days)))
        );
    }
}

/**
 * Multiple averages (by months)
 */

// public
function YearOrdered_MonthlyAverages($dates){
    return YearOrdered_MonthlyAverages_Core($dates, "simple");
}

// public
function YearOrdered_MonthlyAverages_ByTag($dates, $tag){
    return YearOrdered_MonthlyAverages_Core($dates, "tag", $tag);
}

// public
function YearOrdered_MonthlyAverages_ByTags($dates, $tags){
    return YearOrdered_MonthlyAverages_Core($dates, "tags", $tags);
}

// private
function YearOrdered_MonthlyAverages_Core($dates, $type, $addData = array()){
//    $arr = array(
//        "date" => "2013-03",
//        "income" => 34500,
//        "expense" => -54220,
//        "incomePerDay" => 130,
//        "expensePerDay" => -2300
//    );
    $ret = array();
    for($i = 0; $i < count($dates); $i++){
        for($j = 0; $j < count($dates[$i]["data"]); $j++){
            
            $income = 0;
            $expense = 0;
            
            for($m = 0; $m < count($dates[$i]["data"][$j]["data"]); $m++){
                for($d = 0; $d < count($dates[$i]["data"][$j]["data"][$m]["data"]); $d++){
                    
                    // Type switch
                    $bool = false;
                    if($type == "simple"){
                        $bool = true;
                    }else if($type = "tag"){
                        if(in_array($tag, $dates[$i]["data"][$j]["data"][$m]["data"][$d]["tags"])){
                            $bool = true;
                        }
                    }else if($type = "tags"){
                        $inter = array_intersect($tags, $dates[$i]["data"][$j]["data"][$m]["data"][$d]["tags"]);
                        if(count($inter) > 0){
                            $bool = true;
                        }
                    }
                    
                    // Core adder
                    if($bool){                        
                        if($dates[$i]["data"][$j]["data"][$m]["data"][$d]["sum"] > 0){
                            $income += intval($dates[$i]["data"][$j]["data"][$m]["data"][$d]["sum"]);
                        }else if($dates[$i]["data"][$j]["data"][$m]["data"][$d]["sum"] < 0){
                            $expense += intval($dates[$i]["data"][$j]["data"][$m]["data"][$d]["sum"]);
                        }
                    }                    
                    
                }
            }
            
            $dayCount = count($dates[$i]["data"][$j]["data"]);
            array_push($ret, array(
                "date" => $dates[$i]["data"][$j]["date"],
                "income" => $income,
                "expense" => $expense,
                "flow" => $income + $expense,
                "incomePerDay" => intval($income / $dayCount),
                "expensePerDay" => intval($expense / $dayCount),
                "flowPerDay" => intval(($income + $expense) / $dayCount)
            ));
            
        }
    }
    return $ret;
}
