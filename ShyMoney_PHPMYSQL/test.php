<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta property="og:image" content="http:///media/logo.png">
        <meta property="og:url" content="http:///">
        <meta property="og:title" content="">
        <meta property="og:description" content="">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <title></title>
        <link rel="shortcut icon" href="media/icon.png">
        
        <link rel="stylesheet" href="components/font-awesome/css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="css/reset.css" type="text/css" />
        <link rel="stylesheet" href="css/index.css" type="text/css" />
        
        <script src="components/jquery/jquery-3.1.0.min.js"></script>
        <script src="components/jquery-ui/jquery-ui.min.js"></script>
        <script src="components/raphael-js/raphael_min.js"></script>
        <script src="components/angular-js/angular.min.js"></script>
        <script src="js/test5.js"></script>
        <script src="js/directives.js"></script>
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        
        <style>
            * {
                margin:0;
                padding:0;
                font-size:inherit;
            }
            body, html {
                height: 100%;
                width:100%;
                font-family: "Arial";
            }
            #container{
                position: relative;
                background:#333;
                height:100%;
            }
            #container .clickPanel{
                position: absolute;
                opacity: 0.1;
                top:0px; bottom:0px;
                height:100%;
                z-index:3000;
                transition: background 0.2s ease;
            }
            #container .clickPanel:hover{
                background:#fff;
            }
            #container #sumControlPanel{
                position: absolute;
                top:20px;left:0px;
                opacity:0.8;
                background:#000;
                border:1px solid #fff;
                padding:10px;
                z-index:5000;
                cursor: move;
            }
            #container #sumControlPanel .date{
                color:#fff;
            }
            #container .dayProperties{
                position: fixed;
                top:0px;left:0px;right:0px;
                background:#333;
                z-index: 4000;
            }
            #container .dayProperties ul{
                display: inline-block;
            }
            #container .dayProperties .title{
                display: inline-block;
                padding:5px;
                width: 100px;
                border:2px solid;
                font-size: 10pt;
                font-weight: bold;
                cursor: pointer;
            }
            #container .dayProperties .title.date{
                color:#fff;
            }
            .btn{
                display: inline-block;
                padding:5px;
                cursor: pointer;
            }
            .btn.close{
                background:red;
            }
        </style>
    </head>
    <body ng-app="ShyMoneyApp" ng-controller="Test2Controller">
        <div id="container" ng-init="Init()">
            
            <div class="dayProperties">
                <span class="title date">{{dayPropertyTitles.date}}</span>
                <ul>
                    <li class="title" style="color:{{setStyles.flowGraphLine.stroke}};">
                        <span class="fa fa-line-chart"></span>
                        <span>{{dayPropertyTitles.flowGraph}}</span>
                    </li><li class="title" style="color:{{setStyles.expenseGraphLine.stroke}};">
                        <span class="fa fa-line-chart"></span>
                        <span>-{{dayPropertyTitles.expenseGraph}}</span>
                    </li><li class="title" style="color:{{setStyles.incomeGraphLine.stroke}};">
                        <span class="fa fa-line-chart"></span>
                        <span>{{dayPropertyTitles.incomeGraph}}</span>
                    </li><li class="title" style="color:{{setStyles.expenseBars.fill}};">
                        <span class="fa fa-signal"></span>
                        <span>-{{dayPropertyTitles.expenseBars}}</span>
                    </li><li class="title" style="color:{{setStyles.incomeBars.fill}};">
                        <span class="fa fa-signal"></span>
                        <span>{{dayPropertyTitles.incomeBars}}</span>
                    </li>
                </ul>
            </div>
            
            <div class="clickPanel" style="{{ClickPanelCSS($index)}}" 
                 ng-repeat="day in dates"
                 ng-click="ClickPanelClick($index, day)"
                 ng-mouseover="ClickPanelHover($index, day, isInEditMode)"></div>
            
            <div id="sumControlPanel" ng-show="isInEditMode">     
                <!-- Header -->
                <div class="btn close" 
                     ng-click="CloseSumControlPanel()">X</div>
                <!-- Date -->
                <span class="date">{{editingDay.date}}</span><br/>
                <!-- Expenses -->
                <div ng-repeat="sum in editingDay.data.expenseBars.data">
                    <input type="text" ng-model="sum.title" />
                    <input type="text" ng-model="sum.sum" />
                    <span ng-repeat="tag in sum.tags">{{tag.id}} - {{tag.title}}</span>
                    <input type="button" value="Módosít" 
                           ng-click="UpdateSum(sum)" />
                    <input type="button" value="Töröl" 
                           ng-click="DeleteSum(sum.id)" />
                </div>
                <!-- Incomes -->
                <div ng-repeat="sum in editingDay.data.incomeBars.data">
                    <input type="text" ng-model="sum.title" />
                    <input type="text" ng-model="sum.sum" />
                    <span ng-repeat="tag in sum.tags">{{tag.id}} - {{tag.title}}</span>
                    <input type="button" value="Módosít" 
                           ng-click="UpdateSum(sum)" />
                    <input type="button" value="Töröl" 
                           ng-click="DeleteSum(sum.id)" />
                </div>
                <!-- New sum -->
                <div>
                    <input type="text" ng-model="newSum.title" />
                    <input type="text" ng-model="newSum.sum" />
                    <input type="button" value="Mentés" 
                           ng-click="SaveNewSum(newSum)" />
                    <input type="button" value="Töröl" 
                           ng-click="DeleteSum(sum.id)" />
                </div>
            </div>
        </div>
    </body>
    
    <script>
    </script>
</html>
