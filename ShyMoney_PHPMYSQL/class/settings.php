<?php

class Settings {

    public static $OPTIONS;
    //public static $DATES = array();

    public function __construct($connection_id) {

        $this->InitPropertiesFromDB($connection_id);
    }

    public function GetOptions() {
        return Settings::$OPTIONS;
    }
	    
    private function InitPropertiesFromDB($connection_id, $User = null) {

        $query = "";
        if (isset($User)) {
            $query = "
                SELECT options.*, users.id AS uid, users.username AS username, units.id AS unid, units.title AS unit_title
                FROM options, units, users
                WHERE user_id = " . $User->id . "
                AND unit_id = units.id
				AND users.id = options.user_id
                LIMIT 1;
                ";
        } else {
            $query = "
                SELECT options.*, users.id AS uid, users.username AS username, units.id AS unid, units.title AS unit_title
                FROM options, units, users
                WHERE unit_id = units.id
				AND users.id = options.user_id
                LIMIT 1;
                ";
        }
        $result = mysqli_query($connection_id, $query) or die("ip32:: " . $query);
        if (mysqli_num_rows($result) > 0) {

            $row = mysqli_fetch_assoc($result);

            Settings::$OPTIONS = new Option();

            Settings::$OPTIONS->id = $row["id"];
            Settings::$OPTIONS->startingSum = intval($row["starting_sum"]);
            Settings::$OPTIONS->startingSumDate = $row["starting_sum_date"];
            Settings::$OPTIONS->unitCount = intval($row["unit_count"]);
            Settings::$OPTIONS->dateFrom = Globals::XMonthyPreviousDefault($row["date_from"], Settings::$OPTIONS->unitCount);
            Settings::$OPTIONS->dateTo = Globals::TodayDefault($row["date_to"]);

            Settings::$OPTIONS->relativeStartingSum = Settings::$OPTIONS->startingSum + $this->GetCalculatedSumBeforeFromDate($connection_id);

            Settings::$OPTIONS->user = new User();
                Settings::$OPTIONS->user->id = $row["uid"];
                Settings::$OPTIONS->user->username = $row["username"];

            Settings::$OPTIONS->unit = new Unit();
                Settings::$OPTIONS->unit->id = $row["unid"];
                Settings::$OPTIONS->unit->title = $row["unit_title"];

            Settings::$OPTIONS->monthlyAverages = new MonthlyAverages();
                Settings::$OPTIONS->monthlyAverages->dateFrom = Globals::XMonthyPreviousDefault($row["monthly_averages_date_from"], Settings::$OPTIONS->unitCount);
                Settings::$OPTIONS->monthlyAverages->dateTo = Globals::TodayDefault($row["monthly_averages_date_to"]);

            Settings::$OPTIONS->periodAverages = new PeriodAverages();
                Settings::$OPTIONS->periodAverages->dateFrom = Globals::XMonthyPreviousDefault($row["period_averages_date_from"], Settings::$OPTIONS->unitCount);
                Settings::$OPTIONS->periodAverages->dateTo = Globals::TodayDefault($row["period_averages_date_to"]);

            Settings::$OPTIONS->graphView = new GraphView();
                Settings::$OPTIONS->graphView->dateFrom = Globals::XMonthyPreviousDefault($row["graph_view_date_from"], Settings::$OPTIONS->unitCount);
                Settings::$OPTIONS->graphView->dateTo = Globals::TodayDefault($row["graph_view_date_to"]);
        }
	// TODO - make it graphview-specific, not settings
        // Settings::$OPTIONS->graphView->dates = Globals::CreateDateRangeArray(Settings::$OPTIONS->graphView->dateFrom, Options::$OPTIONS->graphView->dateTo);
    }

    private function GetCalculatedSumBeforeFromDate($connection_id) {
        $query = "
            SELECT sum(sum) osszeg
            FROM sums
            WHERE date < '" . Settings::$OPTIONS->dateFrom . "';";
        $result = mysqli_query($connection_id, $query) or die("BAD QUERY - " . $query);

        if (mysqli_num_rows($result) > 0) {

            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }

}
