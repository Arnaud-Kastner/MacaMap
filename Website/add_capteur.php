<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title> Add Capteur </title>
    <link rel="stylesheet" href="creation.css">
</head>

<body>

<div>
    <p>
    <?php
    // PHP code starts here
    $mySQLclient = new PDO (
        'mysql:host=localhost;dbname=mysql;charset=utf8',
        'root',
        ''
        );
        // Check connection
        if (!$mySQLclient) {
            die("Échec de la connexion : ");
        }
       /* else {
            echo "Connexion Success";
        } */

    // Check if form is submitted
    if(isset($_POST['create'])){
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $temperature = $_POST['temperature'];

        // Displaying latitude, longitude, and temperature
        /* echo "lat :" . $latitude;
        echo "long : " . $longitude;
        echo "temp : " . $temperature; */

        // SQL query to insert data into the database
        $insert = "INSERT INTO capteurs (Latitude, Longitude, Temperature) VALUES (?, ?, ?)";

        $stmt = $mySQLclient -> prepare ($insert);
        $stmt->execute([$latitude, $longitude, $temperature]); 
    }
    ?>
    </p>
</div>

<div>
    <!-- Form for adding sensor data -->
    <form action="add_capteur.php" method="post">
        <div class="container">
            <h1> Ajout d'un capteur </h1>
            <p> Veuillez rentrer les informations de votre capteur </p>
            <br>
            <br>
            <!-- Input fields for latitude, longitude, and temperature -->
            <label for="latitude"><b> Latitude :</b></label>
            <input type="text" name="latitude" required>
            <br>
            <br>           
            <label for="longitude"><b>Longitude :</b></label>
            <input type="text" name ="longitude" required>
            <br>
            <br>
            <label for="latitude"><b>Température :</b></label>
            <input type="text" name ="temperature" required>
            <br>
            <br>
            <!-- Submit button -->
            <input type="submit" name="create" value="Ajouter votre capteur">

        </div>
    </form>
</div>

</body>
