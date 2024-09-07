# KumbiVote

## Overview

KumbiVote is a decentralized voting platform built on the Polygon network. It provides features for user registration (with KYC), election creation, sponsored and community elections, secure voting, and dispute resolution.

## Project Structure

- **contracts/**: Contains the Solidity smart contracts.
- **migrations/**: Migration scripts for deploying contracts.
- **test/**: Unit and integration tests.
- **scripts/**: Scripts for deployment and contract interaction.
- **build/**: Compiled contract artifacts.
- **truffle-config.js**: Configuration for Truffle framework.

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

1. ### Git, Python, PostgreSQL

    ```bash
    sudo apt install git python3.10-full python3-pip python3-venv python3-pip-whl postgresql-14
    ```

2. ### Node.js via nvm

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


3. ### Solidity

- #### soljs via npm:

    ```bash
    npm i -g solc
    ```

- #### System binaries via package manager:

    ```bash
    sudo add-apt-repository ppa:ethereum/ethereum
    sudo apt-get update
    sudo apt-get install solc
    ```

4. ### Truffle Suite [¹]

    ```bash
    npm i -g truffle
    ```

> [¹] 
>> ```Please note that the truffle suite is being retired.```
>> ```See [Hardhat](https://www.hardhat.org/)```



## Installation

1. ### Clone the repository:

    ```bash
    git clone https://github.com/kumbi-the-peoples-baraza/KumbiVote.git
    cd KumbiVote
    ```

2. ### Install dependencies:

- #### BACKEND

    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt
    ```

- #### FRONTEND

    ```bash
    cd ../frontend/
    npm install
    ```

- #### BLOCKCHAIN

    ```bash
    ```

## SETUP

### BACKEND

- #### Generate app secret key:

    1. ##### Using ssl

    ```bash
    openssl rand -base64 64
    ```

    2. ##### Using python

    ```bash
    python3 -c 'import secrets; print(secrets.token_urlsafe(64))'
    ```

>> `Please copy key value from stdout and paste it to your environment file.`


- #### Populate `.env` file and change environment variables:

    ```bash
    mv .env.sample .env
    ```

- #### Configure PostgrSQL:
*(To be shared as a script)*

- #### Test PostgreSQL connection to backend:

    ```bash
    python3 manage.py dbshell
    ```

- #### Run Migrations:

    ```bash
     python3 manage.py makemigrations
     python3 manage.py migrate --run-syncdb --verbosity 3
     ```

- #### Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```

- #### Run the development server:

    ```bash
    python manage.py runserver
    ```

- #### Open your web browser and navigate to:

    `http://127.0.0.1:8000/`


## FRONTEND

- #### Run development server:

    ```bash
    npm run dev
    bun run dev
    pnpm run dev
    yarn run dev
    ```

    #### You should see:

    ```bash
    bun run dev
    $ next dev
      ▲ Next.js 14.2.6
          - Local:        http://localhost:3000

         ✓ Starting...
         ✓ Ready in 5.7s
    ```
