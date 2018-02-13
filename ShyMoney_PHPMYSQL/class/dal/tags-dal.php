<?php

class TagsDAL{
    
    public function __construct() {
        
    }

    public function GetTags($connection_id) {
        $tags = array();
        $query = "
            SELECT id, title
            FROM tags
            ORDER BY id
            ;";
        $result = mysqli_query($connection_id, $query) or die("gsa17 - " . $query);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $tag = new Tag();
                $tag->id = $row["id"];
                $tag->title = $row["title"];
                array_push($tags, $tag);
            }
        }
        return $tags;
    }
}
