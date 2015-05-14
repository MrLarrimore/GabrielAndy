<?php
require_once (__DIR__ ."/../model/config.php");
//logs out user by getting rid of variable
unset($_SESSION["authenticated"]);

session_destroy();
//re directs
header("Location: ../index.php");
