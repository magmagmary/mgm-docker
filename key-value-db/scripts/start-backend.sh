# Sources
SCRIPT_DIR=$(dirname "$0")
BACKEND_DIR=$(realpath "$SCRIPT_DIR/../back-end")
source "$SCRIPT_DIR/../.env.network"
source "$SCRIPT_DIR/../.env.db"
source "$SCRIPT_DIR/../.env.backend"

#PORTS
export LOCALHOST_PORT=5001
export CONTAINER_PORT=5000

docker build -t $BACKEND_IMAGE_NAME -f $BACKEND_DIR/Dockerfile $BACKEND_DIR

if [ "$(docker ps -q -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "Container $BACKEND_CONTAINER_NAME already exists"
    exit 1;
else
    docker run -d --rm \
    --name $BACKEND_CONTAINER_NAME \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    --network $NETWORK_NAME \
    -e MONGO_HOST=$DB_CONTAINER_NAME \
    -e DATABASE_NAME=$DATABASE_NAME \
    -e MONGO_KEY_VALUE_USERNAME=$MONGO_KEY_VALUE_USERNAME \
    -e MONGO_KEY_VALUE_PASSWORD=$MONGO_KEY_VALUE_PASSWORD \
    -e PORT=$CONTAINER_PORT \
    $BACKEND_IMAGE_NAME
fi  