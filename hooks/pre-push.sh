#!/bin/bash

# need add to /.git/hooks
#
# http://www.shellcheck.net/

if [[ "$(git branch | grep -e '^\*' | sed -e 's/^[\* ]*//g')" = "master" ]];
then
  for branch in $(git branch | grep -v master); do
      git checkout "$branch"
      git merge master
      git push
  done

  git checkout master
fi
