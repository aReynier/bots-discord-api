source .env.${ENV}

BACKUP_FILE="${1:-}"
[ -f "$BACKUP_FILE" ] || { echo "Backup introuvable: $BACKUP_FILE"; exit 1; }

cat $BACKUP_FILE | docker exec -i $CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE

echo "Database restored from: $BACKUP_FILE"