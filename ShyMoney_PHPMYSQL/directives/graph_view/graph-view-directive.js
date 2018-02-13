app.directive("graphView", function () {
    return {
        templateUrl: "./directives/graph_view/graph-view-template.html",
        controller: "graphViewController",
        restrict: "E"
    };
});