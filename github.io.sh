set -x

git config --global user.email "NckHmml-Pages@users.noreply.github.com"
git config --global user.name "NckHmml-Pages"

git clone git@github.com:NckHmml/NckHmml.github.io.git
(
  cd NckHmml.github.io/
  git pull
)

cp -R dist/. NckHmml.github.io/

(
  cd NckHmml.github.io/
  git add -A
  git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
  git push --force --quiet
)