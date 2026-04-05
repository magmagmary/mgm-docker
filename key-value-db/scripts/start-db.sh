# Sources
SCRIPT_DIR=$(dirname "$0")
DB_CONFIG_DIR=$(realpath "$SCRIPT_DIR/../db-config")
source "$SCRIPT_DIR/../.env.volume"
source "$SCRIPT_DIR/../.env.network"
source "$SCRIPT_DIR/../.env.db"

MONGO_IMAGE="mongodb/mongodb-community-server"
MONGO_VERSION="8.0.20-ubuntu2204"

#ROOT CREDENTIALS
MONGO_ROOT_USERNAME="admin"
MONGO_ROOT_PASSWORD="password"

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container $DB_CONTAINER_NAME already exists"
    exit 1;
else
    source "$SCRIPT_DIR/setup.sh"
fi

docker run -d --rm \
--name $DB_CONTAINER_NAME \
-e MONGO_INITDB_ROOT_USERNAME=$MONGO_ROOT_USERNAME \
-e MONGO_INITDB_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD \
-e DATABASE_NAME=$DATABASE_NAME \
-e MONGO_KEY_VALUE_USERNAME=$MONGO_KEY_VALUE_USERNAME \
-e MONGO_KEY_VALUE_PASSWORD=$MONGO_KEY_VALUE_PASSWORD \
-p $LOCALHOST_PORT:$CONTAINER_PORT \
-v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
-v "$DB_CONFIG_DIR/mongo-init.js":/docker-entrypoint-initdb.d/mongo-init.js:ro \
--network $NETWORK_NAME \
$MONGO_IMAGE:$MONGO_VERSION