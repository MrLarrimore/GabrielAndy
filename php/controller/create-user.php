<?php

require_once (__DIR__ . "/../model/config.php");
//inserts info in varables

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);


//makes salt
$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
//hashes password
$hashedPassword = crypt($password, $salt);
 //if there is a username with the same name then dont store the variables

$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt',"
        . "exp = 0,"
        . "exp1 = 0,"
        . "exp2 = 0,"
        . "exp3 = 0,"
        . "exp4 = 0");

$_SESSION["name"]=$username;

if ($query) {
    //need this for Ajax on index.php
    echo "true";
} else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
