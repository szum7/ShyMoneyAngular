<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("include/metaheader.php"); ?>
        
        <title>Graph view - ShyMoney</title>
        <script src="./directives/graph_view/graph-view-controller.js"></script>
        <script src="./directives/graph_view/graph-view-directive.js"></script>
        
        <style>            
        </style>
    </head>
    <body ng-app="ShyMoneyApp">
        
        <graph-view></graph-view>
    </body>
</html>