<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("include/metaheader.php"); ?>
        
        <title></title>
        <script src="js/controllers/tag-bars.js"></script>

        <style>
        </style>
    </head>
    <body ng-app="ShyMoneyApp" ng-controller="TagBarsController">
        
        <?php include("include/header.php"); ?>
        
        <div ng-init="Init()" ng-cloak>
            
        </div>
    </body>
</html>