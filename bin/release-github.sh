#!/bin/bash

set -e

ls -l dist/*.zip
ls -l dist/*.dmg
ls -l dist/*.snap

apt-get update -qy
apt-get install -y jq bzip2 curl

curl 'https://github.com/github-release/github-release/releases/download/v0.8.1/linux-amd64-github-release.bz2' \
    -L -o github-release.bz2
bzip2 -d github-release.bz2
chmod +x github-release
./github-release --version

RECENT_TAGGED_RELEASE="$(git describe --tags $(git rev-list --tags --max-count=1))"
COMMIT_CHANGELOG="$(git log ${RECENT_TAGGED_RELEASE}..master --pretty=format:%s --no-merges)"
PACKAGE_VERSION="$(cat package.json | jq '.version' --raw-output)"
NOTED_VERSION="v${PACKAGE_VERSION}"

./github-release release --user davidwinter --repo noted --tag "${NOTED_VERSION}" --name "${PACKAGE_VERSION}" --description "${COMMIT_CHANGELOG}" --draft
./github-release upload --user davidwinter --repo noted --tag "${NOTED_VERSION}" --file dist/*.zip --name "Noted-${PACKAGE_VERSION}-mac.zip"
./github-release upload --user davidwinter --repo noted --tag "${NOTED_VERSION}" --file dist/*.dmg --name "Noted-${PACKAGE_VERSION}-mac.dmg"
./github-release upload --user davidwinter --repo noted --tag "${NOTED_VERSION}" --file dist/*.snap --name "Noted-${PACKAGE_VERSION}-linux.snap"
./github-release edit --user davidwinter --repo noted --tag "${NOTED_VERSION}"