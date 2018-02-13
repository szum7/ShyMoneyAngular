<?php

class Globals {
    
    public static function CreateDateRangeArray($strDateFrom, $strDateTo) {
        // takes two dates formatted as YYYY-MM-DD and creates an
        // inclusive array of the dates between the from and to dates.
        // could test validity of dates here but I'm already doing
        // that in the main script

        $aryRange = array();

        $iDateFrom = mktime(1, 0, 0, substr($strDateFrom, 5, 2), substr($strDateFrom, 8, 2), substr($strDateFrom, 0, 4));
        $iDateTo = mktime(1, 0, 0, substr($strDateTo, 5, 2), substr($strDateTo, 8, 2), substr($strDateTo, 0, 4));

        if ($iDateTo >= $iDateFrom) {
            array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
            while ($iDateFrom < $iDateTo) {
                $iDateFrom+=86400; // add 24 hours
                array_push($aryRange, date('Y-m-d', $iDateFrom));
            }
        }
        return $aryRange;
    }
    
    public static function TodayDefault($date){
        if(!isset($date) || $date == "" || $date == "1000-01-01 00:00:00" || $date == "1000-01-01" || $date == "0000-00-00"){
            return date("Y-m-d");
        }
        return $date;
    }
    
    public static function XMonthyPreviousDefault($date, $monthsCount){
        if(!isset($date) || $date == "" || $date == "1000-01-01 00:00:00" || $date == "1000-01-01" || $date == "0000-00-00"){
            return date('Y-m', strtotime("-" . $monthsCount . " months")) . "-01";
        }
        return $date;
    }
}
