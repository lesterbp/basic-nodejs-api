# basic-nodejs-api
Just some basic NodeJs API

# setting up
Need to have NodeJs installed and install all (dev and prod) project dependencies using:

`npm install --dev`

For production use, it is recommended to only install dependencies needed for prod and not include dev dependencies.

`npm install --prod`

These commands will install dependencies in `node_modules` folder and it should not be committed. You may also just delete the folder if you want to freshly install dependencies.

# starting the server
For development purpose to auto-load changed files you may use `./node_modules/node-dev/bin/node-dev lib/app` or the shorted command as specified in `package.json` scripts would be

`npm start`

In production it would be advisable to use `node lib/app`

# adding dependencies
`npm install --save your-package-name`

The command will install `your-package-name` and will add it to the `dependencies` in your package.json. You may also add dev dependencies, these are the dependencies needed only during development. Use the command `npm install --save-dev your-package-name` to add a package as a dev dependencies