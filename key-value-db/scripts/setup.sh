SCRIPT_DIR=$(dirname "$0")
source "$SCRIPT_DIR/../.env.volume"
source "$SCRIPT_DIR/../.env.network"

if [ -n "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Volume $VOLUME_NAME already exists"
else
    docker volume create $VOLUME_NAME
    echo "Volume $VOLUME_NAME created"
fi

if [ -n "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Network $NETWORK_NAME already exists"
else
    docker network create $NETWORK_NAME
    echo "Network $NETWORK_NAME created"
fi