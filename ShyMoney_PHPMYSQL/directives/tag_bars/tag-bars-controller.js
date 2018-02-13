app.controller("tagBarsController", function ($scope, $http, ngService) {
        
    $scope.tbcWrap = (function(){
        
        var pub = {
            "options": {},
            "data": [],
            "order": "expense-ASC"
        };
        
        var exMax = 0;
        var inMax = 0;
        var flMax = 0;
        
        pub.Init = function(){
            //GetOptions();
            GetData(function(){
                
                for (var i = 0; i < $scope.tbcWrap.data.length; i++) {
                    if($scope.tbcWrap.data[i].expense < exMax){
                        exMax = $scope.tbcWrap.data[i].expense;
                    }
                    if($scope.tbcWrap.data[i].income > inMax){
                        inMax = $scope.tbcWrap.data[i].income;
                    }
                    if(Math.abs($scope.tbcWrap.data[i].flow) > Math.abs(flMax)){
                        flMax = Math.abs($scope.tbcWrap.data[i].flow);
                    }
                }
                
                console.log(exMax);
                console.log(inMax);
            });
            
        };
        
        pub.UpdateTagBarsOptions = function(){
            $http({
                method: "post",
                url: "class/responses/post/update-tag-bars-options.php",
                data: $scope.tbcWrap.options
            }).then(function (response) {
                //console.log(response.data);
                $scope.tbcWrap.dateFrom = angular.copy($scope.tbcWrap.options.periodAverages.dateFrom);
                $scope.tbcWrap.dateTo = angular.copy($scope.tbcWrap.options.periodAverages.dateTo);            
                
                // update table
                GetData();

            }, function (response) {
                console.error(response);
            });
        };
        
        pub.ExpenseBarWidth = function(sum){
            if (exMax == 0) return "width:0%;";
            return "width:" + (sum / exMax) * 100 + "%;";
        };
        
        pub.IncomeBarWidth = function(sum){
            if (inMax == 0) return "width:0%;";
            return "width:" + (sum / inMax) * 100 + "%;";
        };
        
        pub.FlowBarWidth = function(sum){
            if (flMax == 0) return "width:0%;";
            return "width:" + Math.abs(sum / flMax) * 100 + "%;";
        };
        
        pub.PrefixClass = function(sum){
            return (sum < 0) ? "red" : "green";
        };     
        
        pub.FSumT = function(sum){
            return ngService.FSumT(sum);
        };
        
        pub.OrderByExpenseASC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.expense > b.expense) ? 1 : ((b.expense > a.expense) ? -1 : 0);} );
            $scope.tbcWrap.order = "expense-ASC";
        };
        
        pub.OrderByExpenseDESC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.expense > b.expense) ? -1 : ((b.expense > a.expense) ? 1 : 0);} );
            $scope.tbcWrap.order = "expense-DESC";
        };
        
        pub.OrderByIncomeASC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.income > b.income) ? 1 : ((b.income > a.income) ? -1 : 0);} );
            $scope.tbcWrap.order = "income-ASC";
        };
        
        pub.OrderByIncomeDESC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.income > b.income) ? -1 : ((b.income > a.income) ? 1 : 0);} );
            $scope.tbcWrap.order = "income-DESC";
        };
        
        pub.OrderByFlowASC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.flow > b.flow) ? 1 : ((b.flow > a.flow) ? -1 : 0);} );
            $scope.tbcWrap.order = "flow-ASC";
        };
        
        pub.OrderByFlowDESC = function(){
            $scope.tbcWrap.data.sort(function(a,b) {return (a.flow > b.flow) ? -1 : ((b.flow > a.flow) ? 1 : 0);} );
            $scope.tbcWrap.order = "flow-DESC";
        };
        
        function compareExpense(a,b) {
            if (a.expense < b.expense)
                return -1;
            if (a.expense > b.expense)
                return 1;
            return 0;
        }
        
        function GetOptions(){
            $http({
                method: "get",
                url: "class/responses/get/get-options.php"
            }).then(function (response) {
                //console.log(response.data);
                $scope.tbcWrap.options = response.data;
                $scope.tbcWrap.dateFrom = angular.copy($scope.tbcWrap.options.periodAverages.dateFrom);
                $scope.tbcWrap.dateTo = angular.copy($scope.tbcWrap.options.periodAverages.dateTo);
            }, function (response) {
                console.error(response);
            });
        }        

        function GetData(callback){
            $http({
                method: "get",
                url: "class/responses/get/get-tag-bars.php"
            }).then(function (response) {
                
                $scope.tbcWrap.data = response.data;
                console.log($scope.tbcWrap.data);
                
                callback();
                
            }, function (response) {
                console.error(response);
            });
        }
        
        return pub;        
    }());
});