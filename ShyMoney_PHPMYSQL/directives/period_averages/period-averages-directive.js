app.directive("periodAverages", function () {
    return {
        templateUrl: "./directives/period_averages/period-averages-template.html",
        controller: "periodAveragesController",
        restrict: "E"
    };
});