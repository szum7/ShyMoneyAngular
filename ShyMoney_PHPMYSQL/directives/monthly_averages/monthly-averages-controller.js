app.controller("monthlyAveragesController", function ($scope, $http) {
    
    $scope.macTagsChips = (function () {
        var pub = {
        };

        pub.QuerySearch = function (str) {
            var arr = [];
            for (var i = 0; i < $scope.pacWrap.allTags.length; i++) {
                if (($scope.pacWrap.allTags[i].title.toLowerCase()).indexOf(str.toLowerCase()) !== -1) {
                    arr.push($scope.pacWrap.allTags[i]);
                }
            }
            return arr;
        };

        pub.TransformChip = function (chip) {
            return chip;
        };

        return pub;
    } ());
    
    $scope.macWrap = (function(){
        
        var pub = {
            "options": {},
            "data": {
                "simple" : [],
                "tagsFiltered": [],
                "sumup": {
                    "expense": 0,
                    "income": 0,
                    "flow": 0,
                    "expensePerDay": 0,
                    "incomePerDay": 0,
                    "flowPerDay": 0
                }
            },
            "tags": [],
            "allTags": [],
            "dateFrom" : "",
            "dateTo" : "",
            "searchText" : ""
        };
        
        pub.Init = function(){
            GetOptions();
            GetData();
            GetTags();
            //GetTagsFilteredData();
        };
        
        pub.UpdateMonthlyAveragesOptions = function(){
            $http({
                method: "post",
                url: "class/responses/post/update-monthly-averages-options.php",
                data: $scope.macWrap.options
            }).then(function (response) {
                
                $scope.macWrap.dateFrom = angular.copy($scope.macWrap.options.monthlyAverages.dateFrom);
                $scope.macWrap.dateTo = angular.copy($scope.macWrap.options.monthlyAverages.dateTo);            
                
                // update table
                GetData();

            }, function (response) {
                console.error(response);
            });
        };   
        
        pub.GetTagsFilteredPeriodAverages = function(){
            GetTagsFilteredData();
        };
        
        pub.PrefixClass = function(sum){
            return (sum < 0) ? "red" : "green";
        };     
        
        pub.FSumT = function(sum){
            return ngService.FSumT(sum);
        };
        
        function GetOptions(){
            $http({
                method: "get",
                url: "class/responses/get/get-options.php"
            }).then(function (response) {
                
                $scope.macWrap.options = response.data;
                $scope.macWrap.dateFrom = angular.copy($scope.macWrap.options.monthlyAverages.dateFrom);
                $scope.macWrap.dateTo = angular.copy($scope.macWrap.options.monthlyAverages.dateTo);
                
            }, function (response) {
                console.error(response);
            });
        }        

        function GetData(){
            $http({
                method: "get",
                url: "class/responses/get/get-monthly-averages.php"
            }).then(function (response) {
                
                $scope.macWrap.data.simple = response.data;
                
                for (var i = 0; i < $scope.macWrap.data.simple.length; i++) {
                    $scope.macWrap.data.sumup.expense += $scope.macWrap.data.simple[i].expense;
                    $scope.macWrap.data.sumup.income += $scope.macWrap.data.simple[i].income;
                    $scope.macWrap.data.sumup.flow += $scope.macWrap.data.simple[i].flow;
                    $scope.macWrap.data.sumup.expensePerDay += $scope.macWrap.data.simple[i].expensePerDay;
                    $scope.macWrap.data.sumup.incomePerDay += $scope.macWrap.data.simple[i].incomePerDay;
                    $scope.macWrap.data.sumup.flowPerDay += $scope.macWrap.data.simple[i].flowPerDay;
                }
                
            }, function (response) {
                console.error(response);
            });
        }        

        function GetTagsFilteredData(){
            $http({
                method: "post",
                url: "class/responses/post/get-tags-filtered-monthly-averages.php",
                data: $scope.pacWrap.tags
            }).then(function (response) {
                
                $scope.macWrap.data.tagsFiltered = response.data;
                
            }, function (response) {
                console.error(response);
            });
        }  

        function GetTags(){
            $http({
                method: "get",
                url: "class/responses/get/get-tags.php"
            }).then(function (response) {
                
                $scope.macWrap.allTags = response.data;
                
            }, function (response) {
                console.error(response);
            });
        }
        
        return pub;        
    }());
});