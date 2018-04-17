#!/bin/bash
cd ~/web/minimata/Portfolio/portfolio
git pull
echo 'installing packages'
meteor npm install
meteor update --all-packages
echo 'building meteor app'
meteor build dist
cd dist
echo 'unpacking meteor dist'
tar xzf data-interface.tar.gz
cd bundle/programs/server
echo 'installing dependencies'
npm install --production

echo 'copying to destination'
cp -RT ~/web/minimata/Portfolio/portfolio/dist/ ~/web/minimata/
cd ~/web/minimata/
rm -rf ~/web/minimata/Portfolio/portfolio/dist/

