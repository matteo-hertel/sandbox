#!/bin/bash

#Variables
MACHINE=${1-default}
ROOT=$(pwd)

#inside ./code
cd ./code
rm -rf *
find ./ -name ".*" -exec rm -rf {} \;
composer create-project --prefer-dist laravel/laravel ./

#in script root
cd $ROOT
bash ./start.sh $MACHINE