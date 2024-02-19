<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title> User Connexion </title>
    <link rel="stylesheet" href="creation.css">
</head>

<body>

<div>
    <p>
    <?php
    // PHP code starts here
    if(isset($_POST['create'])){

        // Retrieving username and password from the form
        $identifiant = $_POST['identifiant'];
        $password = $_POST['password'];
 
        // Displaying successful login message
        echo "Connexion Réussie, profitez bien de votre expérience cher ". $identifiant;
    }
    ?>

    </p>
</div>

<div>
    <!-- Form for user login -->
    <form action="connexion.php" method="post">
        <div class="container">
            <h1> Connexion </h1>
            <p> Veuillez rentrer votre identifiant et votre mot de passe </p>
            <br>
            <br>
            <!-- Input fields for username and password -->
            <label for="identifiant"><b> Identifiant :</b></label>
            <input type="text" name="identifiant" required>
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
