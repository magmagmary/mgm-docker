MONGO_IMAGE="mongodb/mongodb-community-server"
MONGO_VERSION="8.0.20-ubuntu2204"
CONTAINER_NAME="mongodb"

#ROOT CREDENTIALS
MONGO_ROOT_USERNAME="admin"
MONGO_ROOT_PASSWORD="password"

#KEY-VALUE CREDENTIALS
DATABASE_NAME="key-value-db"
MONGO_KEY_VALUE_USERNAME="key-value-user"
MONGO_KEY_VALUE_PASSWORD="key-value-password"

# Sources
SCRIPT_DIR=$(dirname "$0")
source "$SCRIPT_DIR/../.env.volume"
source "$SCRIPT_DIR/../.env.network"

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME already exists"
    exit 1;
else
    source "$SCRIPT_DIR/setup.sh"
fi

docker run -d \
--name $CONTAINER_NAME \
-e MONGO_INITDB_ROOT_USERNAME=$MONGO_ROOT_USERNAME \
-e MONGO_INITDB_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD \
-e DATABASE_NAME=$DATABASE_NAME \
-e MONGO_KEY_VALUE_USERNAME=$MONGO_KEY_VALUE_USERNAME \
-e MONGO_KEY_VALUE_PASSWORD=$MONGO_KEY_VALUE_PASSWORD \
-p $LOCALHOST_PORT:$CONTAINER_PORT \
-v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
-v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
--network $NETWORK_NAME \
$MONGO_IMAGE:$MONGO_VERSION