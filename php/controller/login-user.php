<?php

require_once (__DIR__ . "/../model/config.php");
//makes a array with exps
$array = array(
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
);
//sets what the username that the user typed in, in a variable called $username 
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
//sets what the password that the user typed in, in a variable called $password 
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//BINARY makes it case sensitive
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = BINARY '$username'");
//if some one typed something in the log them ;in
if ($query->num_rows == 1) {
    $row = $query->fetch_array();

    if ($row["password"] === crypt($password, $row["salt"])) {

        
        $_SESSION["authenticated"] = true;
        //sets the exps to save
        $array["exp"] = $row["exp"];
        $array["exp1"] = $row["exp1"];
        $array["exp2"] = $row["exp2"];
        $array["exp3"] = $row["exp3"];
        $array["exp4"] = $row["exp4"];
        $_SESSION["name"]=$username;
        echo json_encode($array);
    } else {
        echo "Invalid username or password";
    }
} else {
    echo "Invalid username or password";
}
     