<?php
require_once (__DIR__ . "/Database.php");

session_start();
session_regenerate_id(true);

//making a variable and storing something in it
$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";


//if there isnt a connection then make one
if(!isset($_SESSION["connection"])) {
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}