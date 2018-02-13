app.controller('SummerizeController', function ($scope, $http) {

    /* Public properties */
    $scope.previousDate = "";
    $scope.filterTags = [];
    $scope.filterTagsString = "";
    
    /* Private properties */
    // Adjuctable variables
    
    // Constant variables
    
    /* Public functions */    
    $scope.IsNewMonth = function(day){
        if($scope.previousDate !== day.date.substr(5, 2)){
            $scope.previousDate = day.date.substr(5, 2);            
            return true;
        }
        return false;
    };
    
    $scope.Filter = function(){
        $scope.filterTags = $scope.filterTagsString.split(",");
        // TODO
    };
    
    /* Private functions */
    
    /**
     * Common
     */
    $scope.Init = function () {

        /**
         * Document Ready
         */
        angular.element(document).ready(function () {

            // Init
            $scope.GetDays();
        });
    };

    $scope.GetDays = function () {
        $http({
            method: "get",
            url: "class/responses/get/get-dates.php"
        }).then(function (response) {
            $scope.dates = response.data;
            console.log(response.data);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.SaveNewSum = function (sum) {
        
    };

    $scope.UpdateSum = function (sum) {
        
    };

    $scope.DeleteSum = function (sum) {
        
    };
});