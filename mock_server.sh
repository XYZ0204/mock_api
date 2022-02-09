#!/bin/bash
CONTAINER_NAME="mock_api"
stop_func()
{
  echo "exec stop container"
  docker stop $CONTAINER_NAME
  echo "exec remove container"
  docker rm $CONTAINER_NAME
}

if [ "$1" = "start" ];then
#  stop_func
  echo "start container $CONTAINER_NAME"
  HOST_IP=`ifconfig -l | xargs -n1 ipconfig getifaddr`
  echo "internalIP = $HOST_IP"
  export IP=$HOST_IP
  export CONTAINER_NAME=$CONTAINER_NAME
  docker-compose config
  docker-compose up -d --build
elif [ "$1" = "stop" ];then
  stop_func
else
  echo "please exec with arg 'start' or 'stop'."
fi

exit 0
