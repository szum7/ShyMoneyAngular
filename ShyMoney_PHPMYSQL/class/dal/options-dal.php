<?php

class OptionsDAL {

    public function __construct() {

    }

    public function UpdatePeriodAveragesOptions($connection_id, $o){

        $query = "
            UPDATE options SET period_averages_date_from = '" . $o->periodAverages->dateFrom . "', period_averages_date_to = '" . $o->periodAverages->dateTo . "' 
            WHERE id = " . $o->id . ";";
        $result = mysqli_query($connection_id, $query) or die("gsa17 - " . $query);

        return $o;
    }

    public function UpdateMonthlyAveragesOptions($connection_id, $o){

        $query = "
            UPDATE options SET monthly_averages_date_from = '" . $o->monthlyAverages->dateFrom . "', monthly_averages_date_to = '" . $o->monthlyAverages->dateTo . "' 
            WHERE id = " . $o->id . ";";
        $result = mysqli_query($connection_id, $query) or die("gsa17 - " . $query);

        return $o;
    }

}
