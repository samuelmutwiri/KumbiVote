# Generate a random password
generate_pwd() {
    # Generate a 16 character password using openssl
    openssl rand -base64 64
}

# Generate app secret key
SECRET_KEY=$(generate_pwd)
echo "SECRET_KEY=${SECRET_KEY}" > .env

# Configure PostgreSQL
echo "Setting up PostgreSQL..."
$roles = "CREATE ROLE admin WITH SUPERUSER LOGIN; CREATE ROLE read_only WITH LOGIN; CREATE ROLE read_write WITH LOGIN;"
sudo -u postgres psql -c "$roles"

# DB Roles
declare -A users
users=["admin"]=""
users=["kumbi"]=""
users=["reader"]=""

for username in "${!users[@]}"; do
    password = $(generate_pwd)
    echo "Creating user: $username"
    $sql = "CREATE ROLE $username WITH LOGIN PASSWORD '$password';"
    sudo -u postgres psql -c "$sql"
    echo "DB_USER_${username^^}=${password}" >> .env
done

echo "Database roles and users created. Credentials stored in .env file."
sudo -u postgres psql < utils/psql/setup.sql
