# ray-chatbot

docker build -t vparth7/ray-chatbot:0.0.1.RELEASE . 

docker push vparth7/ray-chatbot:0.0.1.RELEASE

docker container run -p 8000:8000 vparth7/ray-chatbot:0.0.1.RELEASE
docker container run -p 3000:3000 vparth7/ray-chatbot-frontend:0.0.1.RELEASE

docker pull vparth7/ray-chatbot:0.0.1.RELEASE
docker pull vparth7/ray-chatbot-frontend:0.0.1.RELEASE
