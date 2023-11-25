@echo off
title Gamer BOT v14

docker build -t gamer-bot .
docker run -d --restart always --name gamer-bot gamer-bot