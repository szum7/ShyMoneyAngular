<?php

class Options {

    /**
     * @var int The database stored starting sum.
     */
    public static $ABS_STARTING_SUM;
    public static $ABS_STARTING_SUM_DATE;

    /**
     * @var int Starting sum accumulated with the sums before the starting date.
     */
    public static $STARTING_SUM;
    public static $UNIT;
    public static $UNIT_COUNT;
    public static $MASTER_DATE = array(); // "from", "to"
    public static $DATES = array();

    public function __construct($connection_id) {
        $this->InitPropertiesFromDB($connection_id);
    }

    public function GetOptions() {
        return array(
            "absStartingSum" => Options::$ABS_STARTING_SUM,
            "absStartingSumDate" => Options::$ABS_STARTING_SUM_DATE,
            "startingSum" => Options::$STARTING_SUM,
            "unit" => Options::$UNIT,
            "unitCount" => Options::$UNIT_COUNT,
            "masterDateFrom" => Options::$MASTER_DATE["from"],
            "masterDateTo" => Options::$MASTER_DATE["to"]
        );
    }

    private function InitPropertiesFromExample($connection_id, $User = null) {

        Options::$ABS_STARTING_SUM = 164203;
        //Options::$ABS_STARTING_SUM = 600000;
        Options::$ABS_STARTING_SUM_DATE = "2010-09-07";
        Options::$UNIT = "month";
        Options::$UNIT_COUNT = 5;
        Options::$MASTER_DATE["from"] = "2010-09-01";
        Options::$MASTER_DATE["to"] = "2011-06-20";
        Options::$MASTER_DATE["from"] = date('Y-m', strtotime("-" . Options::$UNIT_COUNT . " months")) . "-01";
        Options::$MASTER_DATE["to"] = date('Y-m-d');
        Options::$STARTING_SUM = Options::$ABS_STARTING_SUM + $this->GetCalculatedSumBeforeFromDate($connection_id);

        Options::$DATES = Globals::CreateDateRangeArray(Options::$MASTER_DATE["from"], Options::$MASTER_DATE["to"]);
    }
    
    private function InitPropertiesFromDB($connection_id, $User = null) {

        $query = "";
        if (isset($User)) {
            $query = "
                SELECT options.*, units.title
                FROM options, units
                WHERE user_id = " . $User->id . "
                AND unit_id = units.id
                LIMIT 1;
                ";
        } else {
            $query = "
                SELECT options.*, units.title
                FROM options, units
                WHERE unit_id = units.id
                LIMIT 1;
                ";
        }
        $result = mysqli_query($connection_id, $query) or die("ip32:: " . $query);
        if (mysqli_num_rows($result) > 0) {

            $row = mysqli_fetch_assoc($result);

            Options::$ABS_STARTING_SUM = intval($row["starting_sum"]);
            Options::$ABS_STARTING_SUM_DATE = $row["starting_sum_date"];
            Options::$UNIT = $row["title"];
            Options::$UNIT_COUNT = intval($row["unit_count"]);
            if ($row["date_from"] == "1000-01-01") {
                Options::$MASTER_DATE["from"] = date('Y-m', strtotime("-" . Options::$UNIT_COUNT . " months")) . "-01";
            } else {
                Options::$MASTER_DATE["from"] = $row["date_from"];
            }
            if ($row["date_to"] == "1000-01-01") {
                Options::$MASTER_DATE["to"] = date('Y-m-d');
            } else {
                Options::$MASTER_DATE["to"] = $row["date_to"];
            }
            Options::$STARTING_SUM = Options::$ABS_STARTING_SUM + $this->GetCalculatedSumBeforeFromDate($connection_id);
        }

        Options::$DATES = Globals::CreateDateRangeArray(Options::$MASTER_DATE["from"], Options::$MASTER_DATE["to"]);
    }

    private function GetCalculatedSumBeforeFromDate($connection_id) {
        $query = "
            SELECT sum(sum) osszeg
            FROM sums
            WHERE date < '" . Options::$MASTER_DATE["from"] . " 00:00:00';";
        $result = mysqli_query($connection_id, $query) or die("BAD QUERY - " . $query);

        if (mysqli_num_rows($result) > 0) {

            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }

}
