<?php
$servername = "localhost";
$username = "animekiss"; // Change this to your MySQL username
$password = "your_password"; // Change this to your MySQL password
$dbname = "anime_quiz"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all quiz questions
$sql = "SELECT * FROM questions";
$result = $conn->query($sql);

$questions = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

// Return the questions as JSON
echo json_encode($questions);
?>
