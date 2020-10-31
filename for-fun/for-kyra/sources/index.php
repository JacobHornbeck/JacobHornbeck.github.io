<?php

// This PHP script must be in "SOME_PATH/jsonFile/index.php"

$file = 'jsonFile.txt';

// or if(!empty($_POST))
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    file_put_contents($file, $_POST["jsonTxt"]);
    //may be some error handling if you want
}
// or else if(!empty($_GET))
else if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents($file);
    //may be some error handling if you want
}
?>