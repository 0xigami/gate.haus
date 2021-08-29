# Gate.Haus

This project lets you create links that only NFT holders can view.  

## Deployment

Requirements: node-v16.8.0, Google Firebase

1. The whole project runs on Firebase, so to deploy you would first create a Firebase project.
2. Edit src/utils/firebase.js Firebase config
3. Edit src/utils/eth.js config
4. Go to your project folder and install packages 
```bash
$ yarn
```
5. Build frontend 
```bash
$ yarn build && firebase deploy --except functions
```
6. Go to ./functions folder and install packages
```bash
$ yarn
```
7. Install Firebase Tools 
```bash
$ sudo npm install -g firebase-tools
```
8. Set firebase as prefix 
```bash
$ alias firebase="`npm config get prefix`/bin/firebase"
```
9. Install Firebase backend
```bash
$ firebase deploy --only functions 
```

## Troubleshooting

#### Problem
```bash
$ Failed to authenticate, have you run    ?
```
#### Solution
The command pop up a new window login with the same id that you used for firebase db ,once logged in it will give you a string copy that string and paste in your terminal.
```bash
$ firebase login --no-localhost
```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
Note that you need the firebase functions to be deployed for this to work.
