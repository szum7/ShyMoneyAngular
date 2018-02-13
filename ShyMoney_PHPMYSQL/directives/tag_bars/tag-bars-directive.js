app.directive("tagBars", function () {
    return {
        templateUrl: "./directives/tag_bars/tag-bars-template.html",
        controller: "tagBarsController",
        restrict: "E"
    };
});