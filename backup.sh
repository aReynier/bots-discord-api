source .env.${ENV}

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%F_%T")
BACKUP_FILE=$BACKUP_DIR/backup_$DB_DATABASE_$TIMESTAMP.sql

docker exec -t $CONTAINER_NAME pg_dump -U $DB_USERNAME $DB_DATABASE > $BACKUP_FILE

echo "Backup completed: $BACKUP_FILE"