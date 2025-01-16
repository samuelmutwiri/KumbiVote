#!/bin/bash

set -e  # Exit on any error

echo "Starting KumbiVote setup..."

# 1. Prerequisites Installation
echo "Installing prerequisites..."
sudo apt update
sudo apt install -y git openssl python3.10-full python3-pip python3-venv python3-pip-whl postgresql-14 curl software-properties-common

# 2. Install Node.js via nvm
echo "Installing Node.js via nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 18

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# 3. Install Solidity Compiler
echo "Installing Solidity compiler..."
npm install -g solc
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update
sudo apt install -y solc

# 4. Install Truffle Suite
echo "Installing Truffle Suite..."
npm install -g truffle
echo "Truffle version: $(truffle --version)"

# 5. Clone Repository
echo "Cloning the KumbiVote repository..."
git clone https://github.com/kumbi-the-peoples-baraza/KumbiVote.git
cd KumbiVote

# 6. Backend Setup
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

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

# Run Django migrations
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb --verbosity 3

# Create superuser
echo "Creating Django superuser..."
python3 manage.py createsuperuser --noinput --username admin

# 7. Frontend Setup
echo "Setting up frontend..."
cd ../frontend
npm install

# 8. Blockchain Setup (Placeholder for blockchain-specific commands)
# echo "Setting up blockchain..."
# Add blockchain-specific setup here if required.

# 9. Running Development Servers
echo "Starting development servers..."
cd ../backend
echo "Starting Django server at http://127.0.0.1:8000/"
python3 manage.py runserver &

cd ../frontend
echo "Starting frontend server at http://localhost:3000/"
npm run dev &

echo "Setup complete! Access the app via your browser."
