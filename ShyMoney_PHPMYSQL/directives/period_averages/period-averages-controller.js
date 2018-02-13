app.controller("periodAveragesController", function ($scope, $http, ngService) {
    
    $scope.tagsChips = (function () {
        var pub = {
        };

        pub.QuerySearch = function (str) {
            var arr = [];
            for (var i = 0; i < $scope.pacWrap.allTags.length; i++) {
                if (($scope.pacWrap.allTags[i].title.toLowerCase()).indexOf(str.toLowerCase()) !== -1) {
                    arr.push($scope.pacWrap.allTags[i]);
                }
            }
            return arr;
        };

        pub.TransformChip = function (chip) {
            return chip;
        };

        return pub;
    } ());
    
    $scope.pacWrap = (function(){
        
        var pub = {
            "options": {},
            "data": {
                "simple" : {},
                "tagsFiltered": {}
            },
            "tags": [],
            "allTags": [],
            "dateFrom" : "",
            "dateTo" : "",
            "searchText" : ""
        };
        
        pub.Init = function(){
            GetOptions();
            GetData();
            GetTags();
            GetTagsFilteredData();
        };
        
        pub.UpdatePeriodAveragesOptions = function(){
            $http({
                method: "post",
                url: "class/responses/post/update-period-averages-options.php",
                data: $scope.pacWrap.options
            }).then(function (response) {
                //console.log(response.data);
                $scope.pacWrap.dateFrom = angular.copy($scope.pacWrap.options.periodAverages.dateFrom);
                $scope.pacWrap.dateTo = angular.copy($scope.pacWrap.options.periodAverages.dateTo);            
                
                // update table
                GetData();

            }, function (response) {
                console.error(response);
            });
        };   
        
        pub.GetTagsFilteredPeriodAverages = function(){
            console.log($scope.pacWrap.tags);
            GetTagsFilteredData();
        };
        
        pub.PrefixClass = function(sum){
            return (sum < 0) ? "red" : "green";
        };     
        
        pub.FSumT = function(sum){
            return ngService.FSumT(sum);
        }
        
        function GetOptions(){
            $http({
                method: "get",
                url: "class/responses/get/get-options.php"
            }).then(function (response) {
                //console.log(response.data);
                $scope.pacWrap.options = response.data;
                $scope.pacWrap.dateFrom = angular.copy($scope.pacWrap.options.periodAverages.dateFrom);
                $scope.pacWrap.dateTo = angular.copy($scope.pacWrap.options.periodAverages.dateTo);
            }, function (response) {
                console.error(response);
            });
        }        

        function GetData(){
            $http({
                method: "get",
                url: "class/responses/get/get-period-averages.php"
            }).then(function (response) {
                //console.log(response.data);
                $scope.pacWrap.data.simple = response.data;
                //console.log($scope.pacWrap.data);
            }, function (response) {
                console.error(response);
            });
        }        

        function GetTagsFilteredData(){
            $http({
                method: "post",
                url: "class/responses/post/get-tags-filtered-period-averages.php",
                data: $scope.pacWrap.tags
            }).then(function (response) {
                //console.log(response.data);
                $scope.pacWrap.data.tagsFiltered = response.data;
            }, function (response) {
                console.error(response);
            });
        }  

        function GetTags(){
            $http({
                method: "get",
                url: "class/responses/get/get-tags.php"
            }).then(function (response) {
                //console.log(response.data);
                $scope.pacWrap.allTags = response.data;
            }, function (response) {
                console.error(response);
            });
        }
        
        return pub;        
    }());
});