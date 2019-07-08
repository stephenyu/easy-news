#!/bin/bash
TARGET_DIRECTORY="./app"

cd $TARGET_DIRECTORY
yarn install
yarn export
yarn build
yarn deploy
