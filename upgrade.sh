#!/bin/bash

# Change directory to this script's location.
cd "$(dirname "$0")"

# Set the virtual environment directory.
VIRTUALENV="$(pwd -P)/venv"

# Install NPM packages.
COMMAND="/usr/bin/npm install"
echo "Installing NPM packages ($COMMAND)..."
eval $COMMAND || exit 1

# Build NPM assets.
COMMAND="/usr/bin/npm run build"
echo "Building NPM assets ($COMMAND)..."
eval $COMMAND || exit 1

# Remove the existing virtual environment (if any)
if [ -d "$VIRTUALENV" ]; then
  COMMAND="rm -rf ${VIRTUALENV}"
  echo "Removing old virtual environment..."
  eval $COMMAND
fi

# Create a new virtual environment
COMMAND="/usr/bin/python3 -m venv ${VIRTUALENV}"
echo "Creating a new virtual environment at ${VIRTUALENV}..."
eval $COMMAND || {
  echo "ERROR: Failed to create the virtual environment."
  exit 1
}

# Activate the virtual environment
source "${VIRTUALENV}/bin/activate"

# Upgrade pip
COMMAND="pip3 install --upgrade pip"
echo "Upgrading pip ($COMMAND)..."
eval $COMMAND || exit 1

# Install necessary system packages
COMMAND="pip3 install wheel"
echo "Installing Python system packages ($COMMAND)..."
eval $COMMAND || exit 1

# Install required Python packages
COMMAND="pip3 install -r requirements.txt"
echo "Installing core dependencies ($COMMAND)..."
eval $COMMAND || exit 1

# Apply any database migrations
COMMAND="python3 social/manage.py migrate"
echo "Applying database migrations ($COMMAND)..."
eval $COMMAND || exit 1

# Collect static files
COMMAND="python3 social/manage.py collectstatic --no-input"
echo "Collecting static files ($COMMAND)..."
eval $COMMAND || exit 1

# Delete any stale content types
COMMAND="python3 social/manage.py remove_stale_contenttypes --no-input"
echo "Removing stale content types ($COMMAND)..."
eval $COMMAND || exit 1

# Delete any expired user sessions
COMMAND="python3 social/manage.py clearsessions"
echo "Removing expired user sessions ($COMMAND)..."
eval $COMMAND || exit 1

echo "Upgrade complete! Don't forget to restart the Social services:"
echo "  > sudo systemctl restart social"
