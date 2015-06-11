gulp prod
ssh oceanstar "mkdir -p ~/www/github-issue-viewer"
scp -r ../build/* oceanstar:~/www/github-issue-viewer
