<?php

require_once(__DIR__ . "/../model/config.php");


//creating another table for users
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "username varchar(30) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "exp int(8),"
        . "exp1 int(8),"
        . "exp2 int(8),"
        . "exp3 int(8),"
        . "exp4 int(8),"
        . "PRIMARY KEY (id))");