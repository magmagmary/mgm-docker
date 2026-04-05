# Sources
SCRIPT_DIR=$(dirname "$0")
source "$SCRIPT_DIR/../.env.volume"
source "$SCRIPT_DIR/../.env.network"
source "$SCRIPT_DIR/../.env.db"
source "$SCRIPT_DIR/../.env.backend"

echo "Cleaning up database... $BACKEND_CONTAINER_NAME"

if [ "$(docker ps -q -f name=$BACKEND_CONTAINER_NAME)" ]; then
    docker stop $BACKEND_CONTAINER_NAME
    docker rm $BACKEND_CONTAINER_NAME
    echo "Container $BACKEND_CONTAINER_NAME stopped and removed"
else
    echo "Container $BACKEND_CONTAINER_NAME not found"
fi

if [ "$(docker images -q -f reference=$BACKEND_IMAGE_NAME)" ]; then
    docker image rm $BACKEND_IMAGE_NAME
    echo "Image $BACKEND_IMAGE_NAME removed"
else
    echo "Image $BACKEND_IMAGE_NAME not found"
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    docker stop $DB_CONTAINER_NAME
    echo "Container $DB_CONTAINER_NAME stopped and removed"
else
    echo "Container $DB_CONTAINER_NAME not found"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    docker volume rm $VOLUME_NAME
    echo "Volume $VOLUME_NAME removed"
else
    echo "Volume $VOLUME_NAME not found"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    docker network rm $NETWORK_NAME
    echo "Network $NETWORK_NAME removed"
else
    echo "Network $NETWORK_NAME not found"
fi
