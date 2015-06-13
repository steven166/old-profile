<?php
error_reporting(LOG_ERR);

$file_name = "../../../shared/css/icons/google_icons.css";
$content = file_get_contents($file_name);

$output = array();
$split_1 = explode("}", $content);
foreach($split_1 as $part){
    $rule = trim(explode("{", $part)[0]);
    if(endsWith($rule, ":before")){
        $class = substr($rule, 1, strlen($rule) - 8);
        $split_2 = explode("-", $class);
        $collection = $split_2[1];
        if(!isset($output[$collection])){
            $output[$collection] = array();
        }
        $output[$collection][] = $class;
    }
}
echo json_encode($output);

function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}