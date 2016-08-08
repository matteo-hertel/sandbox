#!/bin/bash

#inside ./code
cd ./code
rm -rf *
find ./ -name ".*" -exec rm -rf {} \;
composer create-project asgardcms/platform ./
