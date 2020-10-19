#Install local server-side code
npm install

cd ./client

#Install client side
npm install

cd ..

#install python devs
pip install -r requirements.txt

#copy over correct binary
if [ "$1" == "linux" ]; then
    cp alignment/bin/blastn_linux alignment/blastn 
else
    cp alignment/bin/blastn_mac alignment/blastn 
fi

#run the app locally
npm run dev 
