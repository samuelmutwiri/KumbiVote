# KumbiVote

## Overview

KumbiVote is a decentralized voting platform built on the Polygon network. It provides features for user registration (with KYC), election creation, sponsored and community elections, secure voting, and dispute resolution.

## Project Structure

- #### contracts/: Contains the Solidity smart contracts.
- #### migrations/: Migration scripts for deploying contracts.
- #### test/: Unit and integration tests.
- #### scripts/: Scripts for deployment and contract interaction.
- #### build/: Compiled contract artifacts.
- #### truffle-config.js**: Configuration for Truffle framework.

## Setup

### Prerequisites

- Git
- Node.js/Bun
- Javascript package management tool (npm/yarn/pnpm)
- Python ^3.10
- PostgreSQL
- Solidity
- Etherium Development Environment (Truffle/Hardhat)
- Etherium Client (`Ganache`,`truffle develop` would suffice)
- MetaMask with the Polygon Mumbai Testnet configured
- Remix IDE (for contract development) - [OPTIONAL]

### Environment Setup (Debian & Derivatives)

#### 1. Git, Python, PostgreSQL

```bash
sudo apt install git python3.10-full python3-pip python3-venv python3-pip-whl postgresql-14
```

#### 2. Node.js via nvm

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 18

# verifies the right Node.js version is in the environment
node -v # should print `v18.x.x`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

#### 3. Solidity

- ##### solcjs via npm

```bash
# Install solcjs
npm i -g solc

#Confirm Install
solcjs --version
```

- ##### System binaries via package manager

```bash
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```

#### 4. Truffle Suite **¹**

```bash
# Install truffle
npm i -g truffle

# Confirm Install
truffle --version
```

> **¹** `Please note that the truffle suite is being retired.
> Please see [Hardhat](https://www.hardhat.org/)`

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/kumbi-the-peoples-baraza/KumbiVote.git
cd KumbiVote
```

#### 2. Install dependencies

- ##### BACKEND

```bash
# Change to the backend directory
cd backend

# Install a Python virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

- ##### FRONTEND

```bash
cd ../frontend/
npm install
```

- ##### BLOCKCHAIN

```bash
```

## SETUP

### BACKEND

#### Generate app secret key

- ##### Using ssl

```bash
# Generate Key
openssl rand -base64 64
```

- ##### Using python

```bash
# Generate key using python
python3 -c 'import secrets; print(secrets.token_urlsafe(64))'
```

> `Please copy key value from stdout and paste it to your environment file.`

- #### Populate `.env` file and change environment variables

```bash
# Rename sample file to .env
mv .env.sample .env
```

- ##### Configure PostgreSQL

*(To be shared as a script)*

- ##### Test PostgreSQL connection to backend

```bash
# Connect to Db shell from Django
python3 manage.py dbshell
```

- ##### Run Migrations

```bash
 python3 manage.py makemigrations
 python3 manage.py migrate --run-syncdb --verbosity 3
 ```

- ##### Create a superuser

```bash
python manage.py createsuperuser
```

- ##### Run the development server

```bash
python manage.py runserver
```

- ##### Open your web browser and navigate to

`http://127.0.0.1:8000/`

### FRONTEND

- ##### Run development server

```bash
# Run dev server using npm
npm run dev

# Run dev server using bun
bun run dev

# Run dev server using pnpm
pnpm run dev

# Run dev server using yarn
yarn run dev

# NOTE: You're only supposed to invoke one of the above!
```

##### You should see

```bash
# Running dev instance using Bun
$bun run dev
$ next dev
▲ Next.js 14.2.6
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 5.7s
```
