# basic-nodejs-api
Just some basic NodeJs API

# setting up
Need to have NodeJs installed and install all (dev and prod) project dependencies using:

`npm install --dev`

For production use, it is recommended to only install dependencies needed for prod and not include dev dependencies.

`npm install --prod`

These commands will install dependencies in `node_modules` folder and it should not be committed. You may also just delete the folder if you want to freshly install dependencies.

# starting the server
For development purpose to auto-load changed files you may use `./node_modules/node-dev/bin/node-dev lib/app` or the shorter command as specified in `package.json` scripts would be

`npm run dev`

In production it would be advisable to use `node lib/app` or an npm command as specified in `package.json` would be

`npm start`

# adding dependencies
`npm install --save your-package-name`

The command will install `your-package-name` and will add it to the `dependencies` in your package.json. You may also add dev dependencies, these are the dependencies needed only during development. To add a package as a dev dependency:

`npm install --save-dev your-package-name`

# linter
This project is using ESLint (https://eslint.org/) as its linter.
The short command to run the linter as specified in `package.json` scripts:

`npm run linter`
