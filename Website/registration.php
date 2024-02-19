<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title> User Registration </title>
    <link rel="stylesheet" href="creation.css">
</head>

<body>

<div>
    <p>
    <?php
    // PHP code starts here
    // Creating a PDO instance for MySQL connection
    $mySQLclient = new PDO (
        'mysql:host=localhost;dbname=mysql;charset=utf8',
        'root',
        ''
    );
    // Check connection
    if (!$mySQLclient) {
      die("Échec de la connexion : ");
    }

    // Check if form is submitted
    if(isset($_POST['create'])){ 
        // Retrieve username, email, and password from the form
        $identifiant = $_POST['identifiant'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Prepare SQL statement to insert data into the database
        $insert = "INSERT INTO comptes (Identifiant, Email, Password) VALUES (?,?,?);";
        $stmt = $mySQLclient -> prepare ($insert);
        // Execute the prepared statement with the provided data
        $stmt -> execute([$identifiant, $email,$password]);
    }

    // Fetch data from the database
    $sth = $mySQLclient -> query('SELECT * FROM comptes ;');
    if (!$sth){
        die('Echec');
    }
    ?>
    </p>
</div>

<div>
    <!-- Form for user registration -->
    <form action="registration.php" method="post">
        <div class="container">
            <h1> Création de compte </h1>
            <p> Compléter les informations suivantes pour créer votre compte </p>
            <br>
            <br>
            <!-- Input fields for username, email, and password -->
            <label for="identifiant"><b> Identifiant :</b></label>
            <input type="text" name="identifiant" required>
            <br>
            <br>           
            <label for="email"><b>Adresse E-mail :</b></label>
            <input type="text" name ="email" required>
            <br>
            <br>
            <label for="password"><b>Mot de passe :</b></label>
            <input type="password" name ="password" required>
            <br>
            <br>
            <!-- Submit button -->
            <input type="submit" name="create" value="Création du compte">

        </div>
    </form>
</div>


</body>
</html>
