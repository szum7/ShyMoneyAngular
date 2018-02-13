app.controller("modifyDatesController", function ($scope, $http, $mdToast) {
    /* Public properties */
    
    /* Private properties */
    // Adjuctable variables
    
    // Constant variables
    
    /* Public functions */
    $scope.tagsChips = (function () {
        var pub = {
			QuerySearch: null
        };

        pub.QuerySearch = function (str) {
            var arr = [];
            for (var i = 0; i < $scope.tags.length; i++) {
                if (($scope.tags[i].title.toLowerCase()).indexOf(str.toLowerCase()) !== -1) {
                    arr.push($scope.tags[i]);
                }
            }
            return arr;
        };

        return pub;
    } ());
    
    /* Private functions */
    
    /**
     * Common
     */
    $scope.ModifyDatesInit = function () {

        /**
         * Document Ready
         */
        angular.element(document).ready(function () {

            // Init
            $scope.GetDays();
            $scope.GetTags();
        });
    };

    $scope.GetDays = function () {
        $http({
            method: "get",
            url: "class/responses/get/get-simple-dates.php"
        }).then(function (response) {
            $scope.dates = response.data;
            //console.log(response.data);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.GetTags = function () {
        $http({
            method: "get",
            url: "class/responses/get/get-tags.php"
        }).then(function (response) {
            $scope.tags = response.data;
        }, function (response) {
            console.error(response);
        });
    };
    
    $scope.AddNew = function(date){
        date.data.push({
            "date": angular.copy(date.date),
            "sum": 0,
            "title": "",
            "tags": [],
            "isNew": true
        });
    };

    $scope.Save = function (sum) {
        $http({
            method: "post",
            url: "class/responses/post/save-sum.php",
            data: sum
        }).then(function (response) {
            console.log(response.data);
            sum.id = response.data.data.sumId;
            sum.isNew = false;
            
            SimpleToast($mdToast, "Id: " + sum.id + " . Save successful.", 1000);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.Update = function (sum) {
        $http({
            method: "post",
            url: "class/responses/post/update-sum.php",
            data: sum
        }).then(function (response) {
            console.log(response.data);
            
            SimpleToast($mdToast, "Id: " + sum.id + " . Update successful.", 1000);
        }, function (response) {
            console.error(response);
        });
    };

    $scope.Delete = function (sum, date) {
        if(sum.isNew){
            var index = date.data.indexOf(sum);
            date.data.splice(index, 1);
            return;
        }
        $http({
            method: "post",
            url: "class/responses/post/delete-sum.php",
            data: sum.id
        }).then(function (response) {
            console.log(response.data);
            sum.isDeleted = true;
            
            SimpleToast($mdToast, "Id: " + sum.id + " . Delete successful.", 1000);
        }, function (response) {
            console.error(response);
        });
    };
});