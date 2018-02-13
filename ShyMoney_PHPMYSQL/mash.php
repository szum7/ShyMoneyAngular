<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("include/metaheader.php"); ?>
        
        <title>All - ShyMoney</title>
        <script src="./directives/period_averages/period-averages-controller.js"></script>
        <script src="./directives/period_averages/period-averages-directive.js"></script>
        <script src="./directives/monthly_averages/monthly-averages-controller.js"></script>
        <script src="./directives/monthly_averages/monthly-averages-directive.js"></script>
        <script src="./directives/tag_bars/tag-bars-controller.js"></script>
        <script src="./directives/tag_bars/tag-bars-directive.js"></script>
        <script src="./js/services.js"></script>
        
        <style>            
        </style>
    </head>
    <body ng-app="ShyMoneyApp">
        
        <?php include("include/header.php"); ?>
        
        <div class="main">               
            <div class="main">            
                <section class="directive">
                    <h1>Period-averages</h1>
                    <period-averages></period-averages>		
                </section>
                <section class="directive">
                    <h1>Monthly-averages</h1>
                    <monthly-averages></monthly-averages>
                </section>
                <section class="directive">
                    <h1>Tag bars</h1>
                    <tag-bars></tag-bars>
                </section>
            </div>
        </div>
    </body>
</html>