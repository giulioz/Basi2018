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
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});

// get all orders
$app->get('/orders', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Ordini");
    $sth->execute();
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});

// get all ingredients
$app->get('/ingredients', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM Ingredienti");
    $sth->execute();
    $users = $sth->fetchAll();
    return $this->response->withJson($users);
});
