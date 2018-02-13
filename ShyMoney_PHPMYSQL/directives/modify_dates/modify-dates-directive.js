app.directive("modifyDates", function () {
    return {
        templateUrl: "./directives/modify_dates/modify-dates-template.html",
        controller: "modifyDatesController",
        restrict: "E"
    };
});