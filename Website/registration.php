<!DOCTYPE html>
<html lang=fr>
<head>
    <meta charset="utf-8">
    <title> User Registration </title>
    <link rel="stylesheet" href="creation.css">
</head>

<body>

<div>
    <p>
    <?php
    $mySQLclient = new PDO (
        'mysql:host=localhost;dbname=mysql;charset=utf8',
        'root',
        ''
    );
    // Check connection
    if (!$mySQLclient) {
      die("Échec de la connexion : ");
    }

    if(isset($_POST['create'])){ 
        $identifiant = $_POST['identifiant'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $data = [$identifiant,$email,$password];

        /*echo "Identifiant :" . $identifiant;
        echo "Email : " . $email;
        echo "Mot de passe : " . $password;*/
        //echo "ICCCCCIIIIIIII3333333333333333333I" ;
        $insert = "INSERT INTO comptes (Identifiant, Email, Password) VALUES ('". $identifiant ."','"  . $email . "','" . $password . "');";
        //echo "ICCCCCIIIIIIIII"  . $insert;
        $stmt = $mySQLclient -> prepare ($insert);
        $stmt -> execute($data);
    }


    $sth = $mySQLclient -> query('SELECT * FROM comptes ;');
    if (!$sth){
        die('Echec');
    }

   /*
    if (PDO::query($mySQLclient, $sql)) {
        echo "Nouveau enregistrement créé avec succès";
    } */
    


    ?>
    </p>
</div>

<div>
    <form action="registration.php" method="post">
        <div class="container">
            <h1> Création de compte </h1>
            <p> Compléter les informations suivante pour créer votre compte </p>
            <br>
            <br>
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
            <input type="submit" name="create" value="Création du compte">

        </div>
    </form>
</div>


</body>
</html>
