#!/bin/sh

cd frontend
yarn start &
cd ..

cd backend
php composer.phar start &
cd ..

