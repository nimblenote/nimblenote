#!/bin/bash

set -e

which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)
ssh-add <(echo "$GIT_SSH_PRIV_KEY")
git config --global user.email "hello@notedapp.org"
git config --global user.name "Noted bot"
mkdir -p ~/.ssh
ssh-keyscan gitlab.com >> gitlab-known-hosts
cat gitlab-known-hosts >> ~/.ssh/known_hosts
