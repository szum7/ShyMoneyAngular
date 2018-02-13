app.controller('ToastCtrl', function ($scope, $mdToast) {
    $scope.closeToast = function () {
        $mdToast.hide();
    }
});

function SimpleToast($mdToast, msg, delay) {
    $mdToast.show({
        controller: 'ToastCtrl',
        template: '<md-toast class="md-toast success">' + msg + '</md-toast>',
        hideDelay: delay,
        position: "bottom right",
        theme: "success-toast"
    });
}