app.directive("optionsSet", function () {
    return {
        templateUrl: "./directives/options_set/options-set-template.html",
        controller: "optionsSetController",
        restrict: "E"
    };
});