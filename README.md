# basic-nodejs-api
NodeJS sample app with the following in it:
 - RESTful API using Express
 - WebSockets
 - Unit-Tests using Mocha and Chai
 - And other supporting libraries

# setting up
Need to have NodeJs installed and install all (dev and prod) project dependencies using:

`npm install`

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

# unit tests
The project uses the following packages for testing
 - Mocha: for running the actual unit tests (describe, it)
 - Chai: for testing the values (expect)
 - Sinon: for stubbing dependencies
 - Rewire: for injecting dependencies

The full command would be `./node_modules/.bin/mocha --recursive test/unit` but as it is added in `package.json` scripts the short command is:

`npm test`

# webSockets in action
The webSocket server is automatically started when you start the app. After starting the app you may directly open the `/websocket_page/index.html` in your browser by dragging the file into it.

`NOTE:` The client side HTML and JS are using new ES (EcmaScript) syntax and HTML5 features. You may need a newer browser version to support it.

## webSocket event broadcast
Once you do a `POST` call to create a new term on `/glossary` with payload:
```
{
	"term": "newterm",
	"meaning": "a meaning of newterm"
}
```
This will broadcast the new term to all glossary pages connected to the webSocket server.
