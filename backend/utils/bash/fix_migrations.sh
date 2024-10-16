#!/bin/sh
# Fix migrations
# Usage:
# (a) Make executable
# chmod +x ./fix_migrations.sh
# (b) Run
# ./fix_migrations.sh
DIR="$(cd ../.. && pwd)"

find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
