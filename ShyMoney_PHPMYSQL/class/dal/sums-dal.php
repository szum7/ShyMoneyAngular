<?php

class SumsDAL {

    private $tags = array();
    private $maxValue = 0;

    public function __construct() {
        
    }

    public function GetSums($connection_id) {
        $this->InitTagsArray($connection_id);

        $sums = $this->GetSumsArray($connection_id, Settings::$OPTIONS->graphView->dateFrom, Settings::$OPTIONS->graphView->dateTo);

        return $this->AssembleDataArray($sums);
    }

    public function GetCascTimeSums($connection_id) {
        $this->InitTagsArray($connection_id);

        $sums = $this->GetSumsArray($connection_id, Settings::$OPTIONS->graphView->dateFrom, Settings::$OPTIONS->graphView->dateTo);
        
        $datesSums = $this->AssembleSumsWithDates($sums);

        return $this->GetCascTimeSumsArray($datesSums);
    }

    public function GetSimpleDates2($connection_id, $from, $to) {
        $this->InitTagsArray($connection_id);

        $sums = $this->GetSumsArray($connection_id, $from, $to);
        
        return $this->AssembleSumsWithDates($sums, $from, $to, true);
    }

    public function GetSimpleDates($connection_id) {
        $this->InitTagsArray($connection_id);

        $sums = $this->GetSumsArray($connection_id, Settings::$OPTIONS->graphView->dateFrom, Settings::$OPTIONS->graphView->dateTo);
        
        return $this->AssembleSumsWithDates($sums, Settings::$OPTIONS->graphView->dateFrom, Settings::$OPTIONS->graphView->dateTo, true);
    }
    
    public function GetTagBars($connection_id){
        $arr = array();
        $query = "
            SELECT tags.title, SUM(IF(sums.sum > 0, sums.sum, 0)) as income, SUM(IF(sums.sum < 0, sums.sum, 0)) as expense
            FROM sums, tags, sum_tag_connection 
            WHERE sum_tag_connection.sum_id = sums.id 
            AND sum_tag_connection.tag_id = tags.id 
            GROUP BY tags.id
            ORDER BY expense, income;";
        $result = mysqli_query($connection_id, $query) or die("5u22f66 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)){
                array_push($arr, array(
                    "title" => $row["title"],
                    "expense" => intval($row["expense"]),
                    "income" => intval($row["income"]),
                    "flow" => (intval($row["expense"]) + intval($row["income"]))
                ));
            }
        }
        return $arr;
    }
    
    public function GetIncomeInPeriodBySingleTag($connection_id, $tagId, $date_from, $date_to){
        $query = "
            SELECT SUM(sums.sum) as osszeg
            FROM sums, tags, sum_tag_connection 
            WHERE sums.sum > 0 
            AND sums.date >= '" . $date_from . "' 
            AND sums.date < '" . $date_to . "' 
            AND sum_tag_connection.sum_id = sums.id 
            AND sum_tag_connection.tag_id = tags.id 
            AND tags.id = " . $tagId . " 
            ORDER BY osszeg
            ;";
        $result = mysqli_query($connection_id, $query) or die("fh566 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }
    
    public function GetExpenseInPeriodBySingleTag($connection_id, $tagId, $date_from, $date_to){
        $query = "
            SELECT SUM(sums.sum) as osszeg
            FROM sums, tags, sum_tag_connection 
            WHERE sums.sum < 0 
            AND sums.date >= '" . $date_from . "' 
            AND sums.date < '" . $date_to . "' 
            AND sum_tag_connection.sum_id = sums.id 
            AND sum_tag_connection.tag_id = tags.id 
            AND tags.id = " . $tagId . " 
            ORDER BY osszeg
            ;";
        $result = mysqli_query($connection_id, $query) or die("fh566 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }
    
    public function GetAllExpenseInPeriod($connection_id, $date_from, $date_to){
        $query = "
            SELECT SUM(sums.sum) as osszeg 
            FROM sums 
            WHERE sums.sum < 0 
            AND sums.date >= '" . $date_from . "' 
            AND sums.date < '" . $date_to . "' 
            ORDER BY osszeg
            ;";
        $result = mysqli_query($connection_id, $query) or die("fh566 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }
    
    public function GetAllIncomeInPeriod($date_from, $date_to){
        $query = "
            SELECT SUM(sums.sum) as osszeg 
            FROM sums 
            WHERE sums.sum > 0 
            AND sums.date >= '" . $date_from . "' 
            AND sums.date < '" . $date_to . "' 
            ORDER BY osszeg
            ;";
        $result = mysqli_query($connection_id, $query) or die("d556j - " . $query);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            return $row["osszeg"];
        }
    }

    private function InitTagsArray($connection_id) {
        $query = "
            SELECT sum_tag_connection.tag_id, sum_tag_connection.sum_id, tags.title
            FROM sum_tag_connection, tags
            WHERE sum_tag_connection.tag_id = tags.id
            ORDER BY sum_tag_connection.sum_id ASC
            ;";
        $result = mysqli_query($connection_id, $query) or die("gsa17 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $tag = new Tag();
                $tag->sumId = $row["sum_id"];
                $tag->id = $row["tag_id"];
                $tag->title = $row["title"];
                array_push($this->tags, $tag);
            }
        }
    }

    /**
     * Gets an unordered sums object array from database
     * @param type $connection_id
     * @return array ordered by date ASC
     */
    private function GetSumsArray($connection_id, $date_from, $date_to) {

        $query = "
            SELECT *
            FROM sums
            WHERE date >= '" . $date_from . "'
            AND date <= '" . $date_to . "'
            ORDER BY date ASC
            ;";
        $result = mysqli_query($connection_id, $query) or die("ss10 - " . $query);
        $sums = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {

                $sum = new Sum();
                $sum->id = $row["id"];
                $sum->title = $row["title"];
                $sum->sum = $row["sum"];
                $sum->date = $row["date"];
                $sum->created = $row["created"];
                $sum->tags = $this->AssembleSumTagArray($row["id"]);

                array_push($sums, $sum);
            }
        }
        return $sums;
    }

    /**
     *
     * @param
     * @return
     */
    private function GetCascTimeSumsArray($dates) {
        
        $ret = array();

        $prevYear = "";
        $prevMonth = "";
        $prevDay = "";
        
        $yearArr = array(
            "year" => substr($dates[0]["date"], 0, 4),
            "income" => 0,
            "incomeAverage" => 0,
            "filteredIncomeAverage" => 0,
            "expense" => 0,
            "expenseAverage" => 0,
            "filteredExpenseAverage" => 0,
            "filteredTags" => array(),
            "data" => array()
        );
        $monthArr = array(
            "month" => substr($dates[0]["date"], 5, 2),
            "income" => 0,
            "incomeAverage" => 0,
            "filteredIncomeAverage" => 0,
            "expense" => 0,
            "expenseAverage" => 0,
            "filteredExpenseAverage" => 0,
            "filteredTags" => array(),
            "data" => array()
        );
        $dayArr = array();
        
        for($i = 0; $i < count($dates); $i++){
            
            $date = $dates[$i]["date"];
            $year = substr($date, 0, 4);
            $month = substr($date, 5, 2);
            $day = substr($date, 8, 2);
            
            $dayArr = array(
                "day" => $day,
                "income" => 0,
                "expense" => 0,
                "data" => array()
            );
            
            for($j = 0; $j < count($dates[$i]["data"]); $j++){
                array_push($dayArr["data"], $dates[$i]["data"][$j]);   
                
                $sum = intval($dates[$i]["data"][$j]["sum"]);

                if ($sum > 0) {
                    $dayArr["income"] += $sum;
                    $monthArr["income"] += $sum;
                    $yearArr["income"] += $sum;
                } else if ($sum < 0) {
                    $dayArr["expense"] += $sum;
                    $monthArr["expense"] += $sum;
                    $yearArr["expense"] += $sum;
                }        
            }
            
            if($prevMonth != $month){
                $prevMonth = $month;
                
                if($prevYear != $year){
                    if (count($yearArr) > 0) {
                        array_push($ret, $yearArr);
                    }
                    
                    $prevYear = $year;
                    
                    $yearArr = array(
                        "year" => $year,
                        "income" => 0,
                        "incomeAverage" => 0,
                        "filteredIncomeAverage" => 0,
                        "expense" => 0,
                        "expenseAverage" => 0,
                        "filteredExpenseAverage" => 0,
                        "filteredTags" => array(),
                        "data" => array()
                    );
                }else{
                    array_push($yearArr["data"], $monthArr);
                }
                
                $monthArr = array(
                    "month" => $month,
                    "income" => 0,
                    "incomeAverage" => 0,
                    "filteredIncomeAverage" => 0,
                    "expense" => 0,
                    "expenseAverage" => 0,
                    "filteredExpenseAverage" => 0,
                    "filteredTags" => array(),
                    "data" => array()
                );
            }else{
                array_push($monthArr["data"], $dayArr);
            }
        }
        array_push($ret, $yearArr);
        return $ret;
    }

    /**
     * CONDITION: $this->tags SumId szerint növekvő sorrendben rendezett
     * @param type $id
     * @return array
     */
    private function AssembleSumTagArray($id) {
        /* $id = 5
         *
         * 3 2 Póni
         * 3 7 Ló
         * 3 13 Lovas
         * 4 2 Póni
         * 5 1 Nem
         * 7 7 Ló
         */
        $ret = array();
        $i = 0;
        while ($i < count($this->tags) && $this->tags[$i]->sumId < $id) {
            $i++;
        }
        while ($i < count($this->tags) && $this->tags[$i]->sumId == $id) {
            array_push($ret, array(
                "id" => $this->tags[$i]->id,
                "title" => $this->tags[$i]->title
            ));
            array_splice($this->tags, $i, 1);
            //$i++; // nem az $i, hanem a splice léptet
        }
        return $ret;
    }
    
    private function AssembleSumsWithDates($sums, $from, $to, $includeDate = false){
        $ret = array();
        $dates = Globals::CreateDateRangeArray($from, $to);
        
        $i = 0;
        $j = 0;
        while ($i < count($dates)) {
            
            $dateArray = array(
                "date" => $dates[$i],
                "data" => array()
            );

            $innerOut = false;
            $data = array();

            while ($j < count($sums) + 1 && !$innerOut) {

                if ($j < count($sums) && $dates[$i] == substr($sums[$j]->date, 0, 10)) { // a $dates előtte volt, de most beérte
                    $tmpArr = array(
                        "id" => $sums[$j]->id,
                        "title" => $sums[$j]->title,
                        "sum" => $sums[$j]->sum,
                        "tags" => $sums[$j]->tags
                    );
                    if($includeDate){
                        $tmpArr["date"] = $sums[$j]->date;
                    }
                    array_push($data, $tmpArr);
                    $j++;
                } else { // új nap következik, a ciklusból kilépünk : a $sums vizsgált dátuma előrébb van, mint a $dates
                    
                    $dateArray["data"] = $data;
                    $innerOut = true;
                }
            }
            array_push($ret, $dateArray);
            $i++;
        }
        return $ret;
    }

    private function AssembleDataArray($sums/* ordered, greater than "from" entities.Sum collection */) {
        $ret = array();
        $dates = Globals::CreateDateRangeArray(Settings::$OPTIONS->graphView->dateFrom, Settings::$OPTIONS->graphView->dateTo);

        $i = 0;
        $j = 0;
        $flowTMP = array();
        while ($i < count($dates)) {
            $dateArray = array(
                "date" => $dates[$i],
                "data" => array(
                    "incomeBars" => array(
                        "sum" => 0,
                        "data" => array()
                    ),
                    "expenseBars" => array(
                        "sum" => 0,
                        "data" => array()
                    )
                )
            );

            $innerOut = false;

            $incomeSums = 0;
            $incomeData = array();
            $expenseSums = 0;
            $expenseData = array();

            while ($j < count($sums) + 1 && !$innerOut) {

                if ($j < count($sums) && $dates[$i] == substr($sums[$j]->date, 0, 10)) { // a $dates előtte volt, de most beérte
                    if (intval($sums[$j]->sum) > 0) { // income
                        $incomeSums += $sums[$j]->sum;
                        array_push($incomeData, array(
                            "id" => $sums[$j]->id,
                            "title" => $sums[$j]->title,
                            "sum" => $sums[$j]->sum,
                            "tags" => $sums[$j]->tags
                        ));
                    } else if (intval($sums[$j]->sum) < 0) { // expense
                        $expenseSums += abs($sums[$j]->sum);
                        array_push($expenseData, array(
                            "id" => $sums[$j]->id,
                            "title" => $sums[$j]->title,
                            "sum" => $sums[$j]->sum,
                            "tags" => $sums[$j]->tags
                        ));
                    } else {
                        // sum = 0 Ft => kihagyjuk
                    }
                    $j++;
                } else { // új nap következik, a ciklusból kilépünk : a $sums vizsgált dátuma előrébb van, mint a $dates
                    // income bars
                    $dateArray["data"]["incomeBars"]["sum"] = intval($incomeSums);
                    $dateArray["data"]["incomeBars"]["data"] = $incomeData;

                    // expense bars
                    $dateArray["data"]["expenseBars"]["sum"] = intval($expenseSums);
                    $dateArray["data"]["expenseBars"]["data"] = $expenseData;

                    // flow
                    $fs = $incomeSums - $expenseSums;
                    if ($i == 0) { // start
                        $fs += Settings::$OPTIONS->relativeStartingSum;
                    } else { // add previous
                        $fs += $flowTMP[$i - 1];
                    }
                    array_push($flowTMP, $fs);

                    // maxValue
                    if ($this->maxValue < $fs) {
                        $this->maxValue = $fs;
                    }
                    if ($this->maxValue < $incomeSums) { // unlikely but possible scenario
                        $this->maxValue = $incomeSums;
                    }
                    if ($this->maxValue < $expenseSums) { // unlikely but possible scenario
                        $this->maxValue = $expenseSums;
                    }

                    $innerOut = true;
                }
            }
            array_push($ret, $dateArray);
            $i++;
        }
        return $ret;
    }

    public function GetSumsMeta() {
        return array(
            "MaxValue" => $this->maxValue
        );
    }
    
    public function SaveSum($connection_id, $sum/* angularJS.Sum */){
        // sum
        $query = "INSERT INTO sums (title, sum, date) VALUES ('" . $sum->title . "', " . $sum->sum . ", '" . $sum->date . "');";
        $result = mysqli_query($connection_id, $query) or die("ss351 - " . $query);
        
        // sum id
        $id = mysqli_insert_id($connection_id);
        
        // tags
        $tagSumConnStr = "";
        for($i = 0; $i < count($sum->tags); $i++){
            if($i != 0){
                $tagSumConnStr .= ", ";
            }
            $tagSumConnStr .= "(" . $id . "," . $sum->tags[$i]->id . ")";
        }
        if($tagSumConnStr != ""){
            $query = "
                INSERT INTO sum_tag_connection (sum_id, tag_id) VALUES 
                " . $tagSumConnStr . ";";
            $result = mysqli_query($connection_id, $query) or die("ss359 - " . $query);
        }
        return $id;
    }

    public function UpdateSum($connection_id, $sum/* angularJS.Sum */) {
        $query = "
            UPDATE sums
            SET title = '" . $sum->title . "',
                sum = '" . $sum->sum . "',
                date = '" . $sum->date . "'
            WHERE id = " . $sum->id . "
            ;";
        $result = mysqli_query($connection_id, $query) or die("us357 - " . $query);
        
        // delete old tags
        $query = "
            DELETE FROM sum_tag_connection
            WHERE sum_id = " . $sum->id . "
            ;";
        $result = mysqli_query($connection_id, $query) or die("us363 - " . $query);
        
        // build tags query
        $tagSumConnStr = "";
        for($i = 0; $i < count($sum->tags); $i++){
            if($i != 0){
                $tagSumConnStr .= ", ";
            }
            $tagSumConnStr .= "(" . $sum->id . "," . $sum->tags[$i]->id . ")";
        }
        
        // insert new tags
        if($tagSumConnStr != ""){
            $query = "
                INSERT INTO sum_tag_connection (sum_id, tag_id) VALUES 
                " . $tagSumConnStr . ";";
            $result = mysqli_query($connection_id, $query) or die("us380 - " . $query);
        }
        
        return $result;
    }

    public function DeleteSum($connection_id, $sumId) {
        $query = "
            DELETE FROM sums
            WHERE id = " . $sumId . "
            ;";
        $result = mysqli_query($connection_id, $query) or die("ds144 - " . $query);
        return $result;
    }

}
