#!/bin/sh

DEPLOY_TARGET_SERVER="pi@192.168.178.104"

echo 'Remove old page on pi'
ssh $DEPLOY_TARGET_SERVER 'cd /home/pi; rm -rf todo-app'

echo 'Copy content to pi'
scp -r dist/todo-app $DEPLOY_TARGET_SERVER:/home/pi
