#!/bin/bash
TARGET_DIRECTORY="./app"

cd $TARGET_DIRECTORY
yarn install
yarn extract
yarn build
yarn deploy
