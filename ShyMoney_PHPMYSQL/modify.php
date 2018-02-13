<?php
header("Content-Type: text/html; charset=utf-8");
require_once './db.php';
?>
<!DOCTYPE html>
<html ng-app="ShyMoneyApp">
    <head>
        <?php include("./include/metaheader.php"); ?>
        
        <title>Modify dates - ShyMoney</title>
        <script src="./directives/modify_dates/modify-dates-controller.js"></script>
        <script src="./directives/modify_dates/modify-dates-directive.js"></script>

        <style>
            *{
                padding:0px;
                margin:0px;
                box-sizing: border-box;
            }
            p.pr{
                padding:5px;
            }
            html, body{
                font-size:10pt;
            }
            body{
                /* overflow-y: hidden !important; */
            }
            input[type="text"]{
                width:100%;
                padding:5px;
            }
            .header.day{
                
            }
            .header.day span{
                font-weight: bold;
            }
            .dates.header{
                
            }
            ul.item li, ul.header li{
                display:inline-block;
                vertical-align: top;
                height:50px;
                margin-right: 2px;
            }
            .items ul.header{
                margin-bottom:5px;                
            }
            .items ul.header li{
                height:auto;
                font-style: italic;
                color:#555;
            }
            .save{width:50px;}
            .delete{width:50px;}
            .update{width:50px;}
            .id{width:50px;}
            .date{width:80px;}
            .title{width:200px;}
            .sum{width:100px;}
            .tags{width:750px;}
        </style>
    </head>
    <body layout="column">
        <div class="main">
            
            <?php include("include/header.php"); ?>

            <!--<options-set></options-set>-->

            <modify-dates></modify-dates>
            
        </div>
        
    </body>
</html>