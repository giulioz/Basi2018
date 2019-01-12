<?php

use Slim\Http\Request;
use Slim\Http\Response;


// get all users
$app->get('/users', function ($request, $response, $args) {
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

        function ext($n) {
            return($n["NomeIngrediente"]);
        }
        $tmp = array_map("ext", $ingredients);
        $pizzas[$i]["Ingredienti"] = $tmp;
    }
    
    return $this->response->withJson($pizzas);
});

// get all orders
$app->get('/orders', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Ordini");
    $sth->execute();
    $orders = $sth->fetchAll();
    return $this->response->withJson($orders);
});

// get all ingredients
$app->get('/ingredients', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Ingredienti");
    $sth->execute();
    $ingredients = $sth->fetchAll();
    return $this->response->withJson($ingredients);
});
