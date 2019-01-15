<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

const secret = "abc";

function getUser($request) {
    try {
        $headers = $request->getHeaders();
        $token = explode(" ", $headers["HTTP_AUTHORIZATION"][0])[1];
        $decoded = JWT::decode($token, secret, array('HS256'));
        return decoded;
    } catch (Exception $e) {
        return false;
    }
}



// check user and returns token
$app->post('/login', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sth = $this->db->prepare("SELECT u.Nome, u.Cognome, u.Indirizzo, u.Telefono, u.Login, u.Amministratore
    FROM Utenti u
    WHERE u.Login = :user AND u.Password = :password");
    $sth->bindParam("user", $input["user"]);
    $sth->bindParam("password", $input["password"]);
    $sth->execute();
    $users = $sth->fetchAll();

    if (count($users) <= 0) {
        return $response->withStatus(401);
    }

    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($users[0]);
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

    return $jwt;
});

// add new user
$app->post('/users', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sth = $this->db->prepare("CALL `AddUser`(:Nome, :Cognome, :Indirizzo, :Telefono, :Login, :Password);");
    $sth->bindParam("Nome", $input["Nome"]);
    $sth->bindParam("Cognome", $input["Cognome"]);
    $sth->bindParam("Indirizzo", $input["Indirizzo"]);
    $sth->bindParam("Telefono", $input["Telefono"]);
    $sth->bindParam("Login", $input["Login"]);
    $sth->bindParam("Password", $input["Password"]);
    $sth->execute();
    return 200;
});

// get all users
$app->get('/users', function ($request, $response, $args) {
    if (!getUser($request)->Amministratore) {
        return $response->withStatus(401);
    }

    $sth = $this->db->prepare("SELECT * FROM Utenti");
    $sth->execute();
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});

// get all pizzas
$app->get('/pizzas', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Pizze");
    $sth->execute();
    $pizzas = $sth->fetchAll();

    for ($i=0; $i < count($pizzas); $i++) {
        $sth1 = $this->db->prepare("SELECT ip.NomeIngrediente FROM Ing_Pizze ip WHERE ip.NomePizza=:name");
        $sth1->bindParam("name", $pizzas[$i]["Nome"]);
        $sth1->execute();
        $ingredients = $sth1->fetchAll();
        
        $tmp = array_map(function ($n) {
            return($n["NomeIngrediente"]);
        }, $ingredients);
        $pizzas[$i]["Ingredienti"] = $tmp;
    }
    
    return $this->response->withJson($pizzas);
});

// get all orders
$app->get('/orders', function ($request, $response, $args) {
    $user = getUser($request);

    if ($user->Amministratore) {
        $sth = $this->db->prepare("SELECT * FROM Ordini");
        $sth->execute();
        $orders = $sth->fetchAll();
        return $this->response->withJson($orders);
    } else if ($user) {
        $sth = $this->db->prepare("SELECT * FROM Ordini o WHERE o.Utente = :user");
        $sth->bindParam("user", $user->Login);
        $sth->execute();
        $orders = $sth->fetchAll();
        return $this->response->withJson($orders);
    } else {
        return $response->withStatus(401);
    }
});

// add a new order
$app->post('/orders', function ($request, $response, $args) {
    $user = getUser($request);
    
    if ($user) {
        $sth = $this->db->prepare("INSERT INTO Ordini()");
        $sth->bindParam("user", $user->Login);
        $sth->execute();
        $orders = $sth->fetchAll();
        return $this->response->withJson($orders);
    } else {
        return $response->withStatus(401);
    }
});

// delete an order
$app->delete('/orders/[{id}]', function ($request, $response, $args) {
    $user = getUser($request);
    
    if ($user->Amministratore) {
        $sth = $this->db->prepare("DELETE o FROM Ordini o WHERE o.ID_Ordine = :id");
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        return 200;
    } else if ($user) {
        $sth = $this->db->prepare("DELETE o FROM Ordini o WHERE o.Utente = :user AND o.ID_Ordine = :id");
        $sth->bindParam("user", $user->Login);
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        return 200;
    } else {
        return $response->withStatus(401);
    }
});

// get all ingredients
$app->get('/ingredients', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Ingredienti");
    $sth->execute();
    $ingredients = $sth->fetchAll();
    return $this->response->withJson($ingredients);
});
