#!/bin/sh
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo export default "{\"hash\": \"$(git log --format=%h -n 1 HEAD)\", \"date\": \"$(git log --format=%cI -n 1 HEAD)\"}"  > src/_git_commit.js 
fi

cat src/_git_commit.js 