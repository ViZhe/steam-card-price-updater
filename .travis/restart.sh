#!/bin/bash

body="{
  \"request\": {
    \"branch\":\"$TRAVIS_BRANCH\"
  }
}"

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token $TRAVIS_ACCESS_TOKEN" \
  -d "$body" \
  https://api.travis-ci.org/repo/13577134/requests
