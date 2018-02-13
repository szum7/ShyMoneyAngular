<?php
header("Content-Type: text/html; charset=utf-8");
require_once '../db.php';
require_once '../class/view-models/monthly-averages.php';
require_once '../class/view-models/graph-view.php';
require_once '../class/view-models/period-averages.php';
require_once '../class/view-models/sum.php';
require_once '../class/view-models/option.php';
require_once '../class/view-models/tag.php';
require_once '../class/view-models/unit.php';
require_once '../class/view-models/user.php';
require_once '../class/globals.php';
require_once '../class/settings.php';
require_once '../class/functions/date-order.php';
require_once '../class/functions/average.php';
require_once '../class/dal/sums-dal.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("../include/header.php"); ?>
        
        <title>ShyMoney - Graph view</title>
        
    </head>
    <body>
        <?php 
        
        function pp($arr){
            $retStr = '<ul>';
            if (is_array($arr)){
                foreach ($arr as $key=>$val){
                    if (is_array($val)){
                        $retStr .= '<li>' . $key . ' => ' . pp($val) . '</li>';
                    }else{
                        $retStr .= '<li>' . $key . ' => ' . $val . '</li>';
                    }
                }
            }
            $retStr .= '</ul>';
            return $retStr;
        }
        
        $settings = new Settings($connection_id);
        $dal = new SumsDAL();
        $arr = $dal->GetSimpleDates($connection_id);
        $arr = Dates_OrderByYear($arr);
        $err = YearOrdered_MonthlyAverages($arr);
        
        echo AverageExpensePerDay($connection_id, "2010-09-01", "2013-12-01");    
        echo "<br>";
        echo AverageIncomePerDay($connection_id, "2010-09-01", "2013-12-01");

        
        echo pp($err);
        //echo $arr[0]["data"][0]["data"][0]["data"][0]["sum"];
        
        ?>
    </body>
</html>