@echo off
title Gamer BOT v14

docker build -t gamer-bot .
docker run -d --name gamer-bot gamer-bot

PAUSE