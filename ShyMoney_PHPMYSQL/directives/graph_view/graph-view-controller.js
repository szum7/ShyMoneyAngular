app.controller("graphViewController", function ($scope, $http) {

    /* Public properties */
    $scope.container = "container";

    var DOMElements = {
        "dateEditer": "#sumControlPanel"
    };

    /* Private properties */
    // Adjuctable variables
    var xGap = 20;

    // Constant variables
    var paper;
    var windowWidth, windowHeight;

    $scope.setStyles = {
        "xLines": {stroke: "#222", "stroke-width": 1},
        "yLines": {stroke: "#222", "stroke-width": 1},
        "incomeBars": {fill: "#37A151", stroke: "none"},
        "expenseBars": {fill: "#D13030", stroke: "none"},
        "equalBars": {fill: "orange", stroke: "none"},
        "incomeGraphLine": {stroke: "#37A151", "stroke-width": 3},
        "incomeGraphPoint": {
            "attr": {fill: "#37A151", stroke: "none"},
            "r": 3
        },
        "expenseGraphLine": {stroke: "#D13030", "stroke-width": 3},
        "expenseGraphPoint": {
            "attr": {fill: "#D13030", stroke: "none"},
            "r": 3
        },
        "flowGraphLine": {stroke: "#3f72bf", "stroke-width": 3},
        "flowGraphPoint": {
            "attr": {fill: "#3f72bf", stroke: "none"},
            "r": 3
        },
        "monthBlanketText": {"fill": "#292929", "font-size": 30, "font-weight": "bold", "transform": "r-45"},
        "blanketColours": ["#FF4249", "#60CC6E", "#3f72bf", "#FFF242", "#ddd", "#E664F5", "#E89A56"]
    };

    $scope.dayPropertyTitles = {
        "date": "0000-00-00",
        "incomeBars": 0,
        "expenseBars": 0,
        "incomeGraph": 0,
        "expenseGraph": 0,
        "flowGraph": 0
    };

    var elements = {
        "xLinesSet": [],
        "yLinesSet": [],
        "incomeBars": [],
        "expenseBars": [],
        "incomeGraph": [],
        "expenseGraph": [],
        "flowGraph": [],
        "incomeGraphPoints": [],
        "expenseGraphPoints": [],
        "flowGraphPoints": []
    };

    var maxValue;
    var yGap;

    $scope.InitCanvas = function () {
        // properties
        windowWidth = $(window).width();
        windowHeight = $(window).height() - 20;
        paperWidth = ($scope.dates.length - 1) * xGap;
        $("#" + $scope.container).width(paperWidth);

        paper = Raphael(0, 0, paperWidth, windowHeight);

        elements.xLinesSet = paper.set();
        elements.yLinesSet = paper.set();
        elements.incomeBars = paper.set();
        elements.expenseBars = paper.set();
        elements.incomeGraph = paper.set();
        elements.expenseGraph = paper.set();
        elements.flowGraph = paper.set();
        elements.colourPanels = paper.set();

        maxValue = 70000;
        maxValue = $scope.datesMeta.MaxValue + ($scope.datesMeta.MaxValue * 0.2); // +20%
        yGap = CalculateYUnits(maxValue);

        // init
        $scope.InitMainLoop();
    };


    $scope.ClickPanelCSS = function (i) {
        return "left:" + (parseInt(i) * xGap) + "px;width:" + xGap + "px;";
    };


    $scope.ClickPanelHover = function (i, day) {
        $scope.dayPropertyTitles.date = FormatDate(day.date);
        $scope.dayPropertyTitles.flowGraph = FSumT(day.data.flowGraph.sum);
        $scope.dayPropertyTitles.incomeGraph = FSumT(day.data.incomeGraph.sum);
        $scope.dayPropertyTitles.incomeBars = FSumT(day.data.incomeBars.sum);
        $scope.dayPropertyTitles.expenseGraph = FSumT(day.data.expenseGraph.sum);
        $scope.dayPropertyTitles.expenseBars = FSumT(day.data.expenseBars.sum);
    };

    $scope.ClickPanelClick = function (i, day) {
        $scope.cPSelected = "cp" + day.date;
        $scope.isInEditMode = true;
        $scope.editingDay = day;
        $scope.index = i;
        $(DOMElements.dateEditer).css("left", GetChartLeft(i));
    };

    $scope.CloseSumControlPanel = function () {
        $scope.cPSelected = "";
        $scope.isInEditMode = false;
    };

    $scope.InitMainLoop = function () {

        // X-Lines : var
        var xLinesStr = "";
        // Y-Lines : var
        var yLinesStr = "";
        // Month color panels : var
        var cPanelWidth = 0; // count how wide the blanket should be (different months, different day count)
        var iC = 0; // index colour array (resets if at end)
        // Expense graph : var
        var expenseGraphStr = "M0 " + windowHeight;
        // Income graph : var
        var incomeGraphStr = "M0 " + windowHeight;
        // Flow graph : var
        var flowGraphStr = "M0 " + windowHeight;

        // Y-Lines __-- : init
        (function () {
            var textStyle = {"fill": "#eee", "font-size": 11};
            var textLeft = 25;
            for (var i = 0; i < Math.floor(maxValue / yGap) + 1; i++) {

                var lxy = windowHeight - (i * ((windowHeight / maxValue) * yGap));

                // units text
                paper.text(textLeft, lxy, (i * yGap)).attr(textStyle);

                // lines
                yLinesStr += "M0 ";
                yLinesStr += lxy;
                yLinesStr += "L";
                yLinesStr += paperWidth;
                yLinesStr += " ";
                yLinesStr += lxy;
                yLinesStr += " ";
            }
        }());

        /**
         * MAIN LOOP 
         **/
        var flowSum = $scope.options.relativeStartingSum;
        var incomeMonthSum = 0;
        var expenseMonthSum = 0;
        for (var i = 0; i < $scope.dates.length; i++) {

            // X-Lines ||| : init
            (function (i) {
                xLinesStr += "M";
                xLinesStr += i * xGap;
                xLinesStr += " ";
                xLinesStr += windowHeight;
                xLinesStr += "L";
                xLinesStr += i * xGap;
                xLinesStr += " ";
                xLinesStr += "0";
                xLinesStr += " ";
            }(i));

            // Month color panels : draw .toBack()
            (function (i) {
                if(($scope.dates[i].date).substr(8, 2) === "01" && i === 0) // omit 0 with starting panel
                    return;
                
                if (($scope.dates[i].date).substr(8, 2) === "01") {
                    if (iC == $scope.setStyles.blanketColours.length) {
                        iC = 0;
                    }
                    $scope.DrawMonthColourBlanket(i, cPanelWidth, $scope.setStyles.blanketColours[iC]);
                    $scope.DrawMonthText(i, cPanelWidth, ($scope.dates[i].date).substr(5, 2));
                    cPanelWidth = 1;
                    iC++;
                } else {
                    cPanelWidth++;
                }
            }(i));

            // Income bars : draw
            // Expense bars : draw
            (function (i) {
                var exHeight = $scope.dates[i].data.expenseBars.sum;
                var inHeight = $scope.dates[i].data.incomeBars.sum;

                // resolve overlaying
                if (exHeight > inHeight) {
                    $scope.DrawExpenseBar(i, $scope.setStyles.expenseBars);
                    $scope.DrawIncomeBar(i, $scope.setStyles.incomeBars);
                } else if (exHeight < inHeight) {
                    $scope.DrawIncomeBar(i, $scope.setStyles.incomeBars);
                    $scope.DrawExpenseBar(i, $scope.setStyles.expenseBars);
                } else {
                    $scope.DrawExpenseBar(i, $scope.setStyles.equalBars);
                    $scope.DrawIncomeBar(i, $scope.setStyles.equalBars);
                }
            }(i));

            // Expense graph, point : draw
            (function (i) {
                if (($scope.dates[i].date).substr(8, 10) === "01") {
                    expenseMonthSum = $scope.dates[i].data.expenseBars.sum;
                } else {
                    expenseMonthSum += $scope.dates[i].data.expenseBars.sum;
                }
                $scope.DrawGraphFragment(i, expenseMonthSum, "expenseGraph");
            }(i));

            // Income graph, point : draw
            (function (i) {
                if (($scope.dates[i].date).substr(8, 10) === "01") {
                    incomeMonthSum = $scope.dates[i].data.incomeBars.sum;
                } else {
                    incomeMonthSum += $scope.dates[i].data.incomeBars.sum;
                }
                $scope.DrawGraphFragment(i, incomeMonthSum, "incomeGraph");
            }(i));

            // Flow graph, point : draw
            (function (i) {
                flowSum += $scope.dates[i].data.incomeBars.sum - $scope.dates[i].data.expenseBars.sum;
                $scope.DrawGraphFragment(i, flowSum, "flowGraph");
            }(i));

        }
        // X-Lines : draw
        elements.xLinesSet.push(paper.path(xLinesStr)).attr($scope.setStyles.xLines).toBack();

        // Y-Lines : draw
        elements.yLinesSet.push(paper.path(yLinesStr)).attr($scope.setStyles.yLines).toBack();
    };

    $scope.DrawGraphFragment = function (i, sum, objName) {
        // Line
        var str = "";
        if (i == 0) {
            str = "M0 " + windowHeight;
        } else {
            str += "M";
            str += GetChartLeft(i - 1);
            str += " ";
            str += GetGraphTop($scope.dates[i - 1].data[objName].sum);
        }
        str += "L";
        str += GetChartLeft(i);
        str += " ";
        str += GetGraphTop(sum);

        elements[objName].push(paper.path(str)).attr($scope.setStyles[objName + "Line"]);
        $scope.dates[i].data[objName] = {
            "sum": sum
        };
        // Point
        var point = paper.circle(
                GetChartLeft(i),
                GetGraphTop(sum),
                $scope.setStyles[objName + "Point"].r).attr($scope.setStyles[objName + "Point"].attr);
        elements[objName + "Points"].push(point);
    };

    $scope.DrawMonthColourBlanket = function (i, cPanelWidth, colour) {
        
        var rect = paper.rect(
                ((i - cPanelWidth) * xGap),
                0,
                cPanelWidth * xGap,
                windowHeight).attr({
            fill: colour,
            stroke: "none",
            opacity: 0.1
        });
        elements.colourPanels.push(rect);
        elements.colourPanels[elements.colourPanels.length - 1].toBack();
    };
    
    $scope.DrawMonthText = function (i, cPanelWidth, monthI){
        var x;
        x = (i - cPanelWidth) * xGap;
        x += Math.round((cPanelWidth * xGap) / 2);
        
        monthI = parseInt(monthI);
        monthI--; // we need the previous month
		if (monthI == 0) monthI = 12;
        
        paper.text(x, Math.round(windowHeight / 2), GetMonthLiteral(monthI)).attr($scope.setStyles.monthBlanketText);
    };

    $scope.DrawExpenseBar = function (i, style) {
        var height = CalculateBarHeight($scope.dates[i].data.expenseBars.sum);
        var rect = paper.rect(
                (i * xGap) + 1,
                windowHeight - height,
                xGap - 2,
                height).attr(style);
        $scope.dates[i].data.expenseBars["graphic"] = rect;
        elements.expenseBars.push(rect);
    };

    $scope.DrawIncomeBar = function (i, style) {
        var height = CalculateBarHeight($scope.dates[i].data.incomeBars.sum);
        var rect = paper.rect(
                (i * xGap) + 1,
                windowHeight - height,
                xGap - 2,
                height).attr(style);
        $scope.dates[i].data.incomeBars["graphic"] = rect;
        elements.incomeBars.push(rect);
    };

    $scope.DrawExpensePoint = function (i) {
        var point = paper.circle(
                GetChartLeft(i),
                GetExpenseGraphTop(i),
                $scope.setStyles.expenseGraphPoint.r).attr($scope.setStyles.expenseGraphPoint.attr);
        elements.expensePoints.push(point);
    };

    $scope.DrawIncomePoint = function (i) {
        var point = paper.circle(
                GetChartLeft(i),
                GetIncomeGraphTop(i),
                $scope.setStyles.incomeGraphPoint.r).attr($scope.setStyles.incomeGraphPoint.attr);
        elements.incomePoints.push(point);
    };

    $scope.DrawFlowPoint = function (i) {
        var point = paper.circle(
                GetChartLeft(i),
                GetFlowGraphTop(i),
                $scope.setStyles.flowGraphPoint.r).attr($scope.setStyles.flowGraphPoint.attr);
        elements.flowPoints.push(point);
    };

    $scope.UpdateDay = function () {
        (function (i) {
            // remove old bars
            elements.expenseBars.exclude($scope.dates[i].data.expenseBars["graphic"]);
            elements.incomeBars.exclude($scope.dates[i].data.incomeBars["graphic"]);

            var exHeight = $scope.dates[i].data.expenseBars.sum;
            var inHeight = $scope.dates[i].data.incomeBars.sum;

            // resolve overlaying
            if (exHeight > inHeight) {
                $scope.DrawExpenseBar(i, $scope.setStyles.expenseBars);
                $scope.DrawIncomeBar(i, $scope.setStyles.incomeBars);
            } else if (exHeight < inHeight) {
                $scope.DrawIncomeBar(i, $scope.setStyles.incomeBars);
                $scope.DrawExpenseBar(i, $scope.setStyles.expenseBars);
            } else {
                $scope.DrawExpenseBar(i, $scope.setStyles.equalBars);
                $scope.DrawIncomeBar(i, $scope.setStyles.equalBars);
            }
        }($scope.index));
    };

    function ElementOrder() {
        for (var i = 0; i < elements.xLinesSet.length; i++) {
            elements.xLinesSet[i].toBack();
        }
        for (var i = 0; i < elements.yLinesSet.length; i++) {
            elements.yLinesSet[i].toBack();
        }
        // TODO...
    }

    function FormatDate(val) {
        // 2012-01-11 -> 2012. 01. 11
        if (val !== "") {
            var year = val.substring(0, 4);
            var month = val.substring(5, 7);
            var day = val.substring(8, 10);
            return year + ". " + month + ". " + day;
        } else {
            return val;
        }
    }

    function FSumT(sum) {
        if (sum >= 1000) {
            sum = sum + "";
            var str = "";
            var i = 0;
            while ((sum.length - (3 * (i + 1))) > 0) {
                str = "." + sum.substr(sum.length - (3 * (i + 1)), sum.length - (4 * i)) + str;
                i++;
            }
            str = sum.substr(0, sum.length - (3 * i)) + str;
            return str;
        }
        return sum;
    }

    function GetGraphTop(sum) {
        return windowHeight - CalculateBarHeight(sum);
    }

    function GetFlowGraphTop(i) {
        return windowHeight - CalculateBarHeight($scope.dates[i].data.flowGraph.sum);
    }

    function GetIncomeBarTop(i) {
        return windowHeight - CalculateBarHeight($scope.dates[i].data.incomeBars.sum);
    }

    function GetExpenseBarTop(i) {
        return windowHeight - CalculateBarHeight($scope.dates[i].data.expenseBars.sum);
    }

    function GetChartLeft(i) {
        return (i * xGap) + (xGap / 2);
    }

    function CalculateBarHeight(val) {
        val = parseInt(val);
        return Math.ceil(Math.abs(parseInt(val)) / maxValue * windowHeight);
    }

    function CalculateYUnits(max) {
        /* 1   |  0 - 50
         * 5   |  50 - 100
         * 10  |  100 - 500
         * 50  |  500 - 1000
         * 100 |  1000 - 5000
         * ...
         */
        var ret = 1;
        var cap = 50; // starting cap
        var c = 2;
        while (max > cap) {
            if (c % 2 === 0) {
                ret *= 5;
            } else {
                ret *= 2;
            }
            if (c % 2 === 0) {
                cap *= 2;
            } else {
                cap *= 5;
            }
            c++;
        }
        return ret;
    }

    function GetRandomColour() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function GetMonthLiteral(i) {
        i = parseInt(i);
        switch (i) {
            case 1: return "Január";
            case 2: return "Február";
            case 3: return "Március";
            case 4: return "Április";
            case 5: return "Május";
            case 6: return "Június";
            case 7: return "Július";
            case 8: return "Augusztus";
            case 9: return "Szeptember";
            case 10: return "Október";
            case 11: return "November";
            case 12: return "December";
            default: return "";
        }
    }

    /**
     * Common
     */

    $scope.dates = [];
    $scope.options = {};
    $scope.datesMeta = {};
    $scope.index = 0;

    $scope.editingDay = {};
    $scope.isInEditMode = false;
    $scope.cPSelected = "";

    $scope.GraphViewInit = function () {

        /**
         * Document Ready
         */
        angular.element(document).ready(function () {

            // Init
            $scope.GetOptions(function(){
                $scope.GetSums(function(){
                    $scope.InitCanvas();
                });
            });

            $("#sumControlPanel").draggable();
        });
    };

    $scope.InitSumsInitOptions = function () {
        $http({
            method: "get",
            url: "class/responses/get/get-options-get-sums.php"
        }).then(function (response) {
            $scope.options = response.data.options;
            $scope.dates = response.data.data;
            $scope.datesMeta = response.data.dataMeta;

            $scope.InitCanvas();
            console.log(response.data);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.GetOptions = function (func) {
        $http({
            method: "get",
            url: "class/responses/get/get-options.php"
        }).then(function (response) {
            
            $scope.options = response.data;
            
            func();
            
        }, function (response) {
            console.error(response);
        });
    };

    $scope.GetSums = function (func) {
        $http({
            method: "get",
            url: "class/responses/get/get-sums.php"
        }).then(function (response) {
            
            $scope.dates = response.data.data;
            $scope.datesMeta = response.data.dataMeta;
            
            func();
            
        }, function (response) {
            console.error(response);
        });
    };

    $scope.SaveNewSum = function (sum) {
        
        // TODO
    };

    $scope.UpdateSum = function (sum) {
        
        // TODO
    };

    $scope.DeleteSum = function (sum) {
        
        // TODO
    };

    $scope.AddNewInput = function () {
        $scope.editingDay.push({
            "id": -1,
            "title": "",
            "sum": 0,
            "tags": [],
            "isDeleted": false
        });
        // TODO...
    }
});