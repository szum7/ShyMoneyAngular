<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../../../db.php';
require_once '../../globals.php';
require_once '../../dal/tags-dal.php';
require_once '../../view-models/tag.php';

$tagsDAL = new TagsDAL();
$data = $tagsDAL->GetTags($connection_id);

echo json_encode($data);