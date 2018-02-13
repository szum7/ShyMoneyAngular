app.directive("monthlyAverages", function () {
    return {
        templateUrl: "./directives/monthly_averages/monthly-averages-template.html",
        controller: "monthlyAveragesController",
        restrict: "E"
    };
});