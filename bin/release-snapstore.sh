#!/bin/bash

set -e

ls -l dist/*.snap

apt-get update -qy
apt-get install -y snapcraft

echo "${SNAPCRAFT_LOGIN_FILE}" | base64 --decode --ignore-garbage > snapcraft.login
snapcraft login --with snapcraft.login

snapcraft push dist/*.snap --release=stable