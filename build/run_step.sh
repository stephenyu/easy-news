#!/bin/bash
CURRENT_DIRECTORY=`pwd`
TARGET_DIRECTORY="$CURRENT_DIRECTORY/../"

cd $TARGET_DIRECTORY
yarn install
yarn build
yarn deploy
