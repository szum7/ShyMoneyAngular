app.service("ngService", function ($q, $http) {

    this.FSumT = function (sum) {
        if(sum === 0)
            return 0;
        
        if(!sum)
            return "NA";

        var bool = false;
        if(sum < 0){
            bool = true;
        }
        sum = Math.abs(sum);

        if (sum >= 1000) {
            sum = sum + "";
            var str = "";
            var i = 0;
            while ((sum.length - (3 * (i + 1))) > 0) {
                str = "." + sum.substr(sum.length - (3 * (i + 1)), sum.length - (4 * i)) + str;
                i++;
            }
            str = sum.substr(0, sum.length - (3 * i)) + str;
            return (bool) ? ("-" + str) : str;
        }
        return (bool) ? (-sum) : sum;
    }
});