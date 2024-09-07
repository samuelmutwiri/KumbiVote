#!/usr/bin/sh
# check whether service is running
sudo systemctl status postgresql

# OR
service --status-all

# Enable service is not running
sudo systemctl enable postgresql

# Start service
sudo systemctl start postgresql

# Connect to RDMS as Postgres
psql -h localhost -U postgres
