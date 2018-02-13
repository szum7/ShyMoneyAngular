app.controller("optionsSetController", function ($scope, $http) {
    
    $scope.allFrom = "";
    $scope.allTo = "";
    $scope.options = {};
    $scope.optionsSafe = {};

    $scope.OptionsSetInit = function(){
        $scope.GetOptions();
    };

    $scope.GetOptions = function () {
        $http({
            method: "get",
            url: "class/responses/get/get-options.php"
        }).then(function (response) {

            console.log(response.data);
            $scope.options = response.data;
            $scope.optionsSafe = angular.copy($scope.options);

        }, function (response) {
            console.error(response);
        });
    };
    
    $scope.ChangeAllDateFrom = function(){
        if(!$scope.allFrom == ""){
            // TODO
        }
    };
    
    $scope.ChangeAllDateTo = function(){
        if(!$scope.allTo == ""){
            // TODO
        }
    };

    $scope.GetUnits = function () {
        // TODO
    };

    $scope.ResetGraphViewOptions = function () {
        $scope.options.graphView.dateFrom = angular.copy($scope.optionsSafe.graphView.dateFrom);
        $scope.options.graphView.dateTo = angular.copy($scope.optionsSafe.graphView.dateTo);
    };

    $scope.ResetPeriodAveragesOptions = function () {
        $scope.options.periodAverages.dateFrom = angular.copy($scope.optionsSafe.periodAverages.dateFrom);
        $scope.options.periodAverages.dateTo = angular.copy($scope.optionsSafe.periodAverages.dateTo);
    };

    $scope.ResetMonthlyAveragesOptions = function () {
        $scope.options.monthlyAverages.dateFrom = angular.copy($scope.optionsSafe.monthlyAverages.dateFrom);
        $scope.options.monthlyAverages.dateTo = angular.copy($scope.optionsSafe.monthlyAverages.dateTo);
    };

    $scope.UpdateOptions = function () {
        $http({
            method: "post",
            url: "class/responses/post/update-options.php",
            data: $scope.options
        }).then(function (response) {

            console.log(response.data);

            // update safe array
            $scope.optionsSafe = angular.copy($scope.options);

        }, function (response) {
            console.error(response);
        });
    };
});