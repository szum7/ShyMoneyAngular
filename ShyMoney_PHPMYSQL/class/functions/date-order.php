<?php
//    $ret = array(
//        array(
//            "date" => "2014-01-01",
//            "data" => array(
//                array(
//                    "title" => "",
//                    "sum" => 0,
//                    "tags" => array(
//                        array("id" => 0, "title" => ""),
//                        array("id" => 0, "title" => ""),
//                        array("id" => 0, "title" => "")
//                    )
//                ),
//                array(
//                    "title" => "",
//                    "sum" => 0,
//                    "tags" => array(
//                        array("id" => 0, "title" => ""),
//                        array("id" => 0, "title" => ""),
//                        array("id" => 0, "title" => "")
//                    )
//                )
//            )
//        )
//    );

function Dates_OrderByYear($dates){
    $arr = DayOrderedDates_OrderByMonth($dates);
    return MonthOrderedDates_OrderByYear($arr);
}

function MonthOrderedDates_OrderByYear($dates) {
    
    $prevDate = "";    
    $ret = array();    
    
    for ($i = 0; $i < count($dates); $i++) {
        if ($prevDate != substr($dates[$i]["date"], 0, 4)) {
            $prevDate = substr($dates[$i]["date"], 0, 4);
            array_push($ret, array(
                "date" => $prevDate,
                "data" => array()
            ));
        }
        array_push($ret[count($ret) - 1]["data"], $dates[$i]);
    }
    
    return $ret;
}

function DayOrderedDates_OrderByMonth($dates) {
    
    $prevDate = "";    
    $ret = array();    
    
    for ($i = 0; $i < count($dates); $i++) {
        if ($prevDate != substr($dates[$i]["date"], 5, 2)) {
            $prevDate = substr($dates[$i]["date"], 5, 2);
            array_push($ret, array(
                "date" => substr($dates[$i]["date"], 0, 7),
                "data" => array()
            ));
        }
        array_push($ret[count($ret) - 1]["data"], $dates[$i]);
    }
    
    return $ret;
}
