# angular-wordbox-web-server
Wordbox Project Nodejs Api && GraphQL on Server with Docker Image

First command : 
docker image build -t angular-wordbox-web-server-image .

Last command : 

docker container run --name angular-wordbox-web-server -d -p 83:3000 --rm angular-wordbox-web-server-image:latest