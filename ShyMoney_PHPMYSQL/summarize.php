<?php
header("Content-Type: text/html; charset=utf-8");
require_once 'db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("include/metaheader.php"); ?>
        
        <title></title>
        <script src="js/controllers/summarize.js"></script>

        <style>
            .newMonth{
                border-top:2px solid #aaa;
            }
            table tr td{
                border:1px solid #ddd;
                padding:5px;
            }
            .tag{
                padding:5px;
                background:#ddd;
                margin-right:5px;
            }
            .ib{
                display:inline-block;
                vertical-align: top;
            }
            p{
                text-align: center;
            }
            p.title{
                background: #555;
                color:#ddd;
                border-right:2px solid #fff;
            }
            .year{
                white-space: nowrap;
            }
        </style>
    </head>
    <body ng-app="ShyMoneyApp" ng-controller="SummerizeController">
        
        <?php include("include/header.php"); ?>
        
        <div ng-init="Init()" ng-cloak>

            <div class="filter">
                <input type="text" placeholder="Type in tags, separated by commas"
                       ng-model="filterTagsString" />
                <input type="button" value="Filter"
                       ng-click="Filter()" />
            </div>

            <div class="year ib"
                 ng-repeat="year in dates">
                <p class="title">{{year.year}}</p>
                <p>{{year.income}}</p>
                <p>{{year.expense}}</p>
                <div class="month ib"
                     ng-repeat="month in year.data">
                    <p class="title">{{year.year}}.{{month.month}}</p>
                    <p>{{month.income}}</p>
                    <p>{{month.expense}}</p>
                    <div class="day ib"
                         ng-repeat="day in month.data">
                        <p class="title">{{year.year}}.{{month.month}}.{{day.day}}</p>
                        <p>{{day.income}}</p>
                        <p>{{day.expense}}</p>
                        <table>
                            <tr class="sum" 
                                ng-repeat="sum in day.data">
                                <td>{{sum.id}}</td>
                                <td>{{sum.title}}</td>
                                <td>{{sum.sum}}</td>
                                <td>
                                    <span class="tag"
                                          ng-repeat="tag in sum.tags">
                                        {{tag.title}}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </body>
</html>