#!/bin/bash

# Change directory to this script's location.
cd "$(dirname "$0")"

# Set the virtual environment directory.
VIRTUALENV="$(pwd -P)/venv"

# Install NPM packages.
COMMAND="npm install"
echo ""
echo "Installing NPM packages ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Build NPM assets.
COMMAND="npm run build"
echo ""
echo "Building NPM assets ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Remove the existing virtual environment (if any)
if [ -d "$VIRTUALENV" ]; then
  COMMAND="rm -rf ${VIRTUALENV}"
  echo ""
  echo "Removing old virtual environment..."
  echo ""
  eval $COMMAND
fi

# Create a new virtual environment
COMMAND="/usr/bin/python3 -m venv ${VIRTUALENV}"
echo ""
echo "Creating a new virtual environment at ${VIRTUALENV}..."
echo ""
eval $COMMAND || {
  echo ""
  echo "ERROR: Failed to create the virtual environment."
  echo ""
  exit 1
}

# Activate the virtual environment
source "${VIRTUALENV}/bin/activate"

# Upgrade pip
COMMAND="pip3 install --upgrade pip"
echo ""
echo "Upgrading pip ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Install necessary system packages
COMMAND="pip3 install wheel"
echo ""
echo "Installing Python system packages ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Install required Python packages
COMMAND="pip3 install -r requirements/production.txt"
echo ""
echo "Installing core dependencies ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Apply any database migrations
COMMAND="python3 social/manage.py migrate"
echo ""
echo "Applying database migrations ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Collect static files
COMMAND="python3 social/manage.py collectstatic --no-input"
echo ""
echo "Collecting static files ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Delete any stale content types
COMMAND="python3 social/manage.py remove_stale_contenttypes --no-input"
echo ""
echo "Removing stale content types ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

# Delete any expired user sessions
COMMAND="python3 social/manage.py clearsessions"
echo ""
echo "Removing expired user sessions ($COMMAND)..."
echo ""
eval $COMMAND || exit 1

echo ""
echo "Upgrade complete! Don't forget to restart the Social services:"
echo ""
echo "  > sudo systemctl restart social"
