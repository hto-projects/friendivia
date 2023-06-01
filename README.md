# Friendpardy!
An online party game where participants have to answer questions about themselves, and then try to guess their friends' answers to the same questions.

## Gameplay
Check out the [experience page](Planning/Experience.md) for more information about how the game is played.

## Development Setup
This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), meaning that it contains multiple software projects. In this case, there is both a **front-end** and a **back-end**. In order to run the entire application, it will be necessary to run both the front-end _and_ the back-end projects.

### The Back-End
The back-end project is a [Node.js project](https://nodejs.org/en/about).

#### Setting Up the Environment Variables
In order for the application to work, it needs to connect to a database, and properly handle requests from the front-end. There are some configuration settings that make this possible, through [environment variables](https://en.wikipedia.org/wiki/Environment_variable). These make the project much more dynamic; it is possible to swap out one database for another, or update deployments without changing any code.

Create a new file named **.env** in the **back-end** folder with these contents:

```
MONGO_URI="<SECRET>"
DB_NAME="friendpardy-test"
FRONT_END_URL="http://localhost:3000"
```

Replace the `<SECRET>` part with an actual database URI. 

#### Running the Server
The next step is to run the server. Start by opening up a terminal from the base folder.

Run this command to change the directory to the **back-end** folder:

```sh
cd back-end
```

There, install all necessary packages using `npm`:

```sh
npm install
```

Finally, run the server with the following command:

```sh
npm run start
```

The output should hopefully end up looking something like this:

```
$ npm run start

> friendpardy-back-end@1.0.0 start
> nodemon --exec ts-node-esm index.ts

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node-esm index.ts`
Server listening on 4000
MongoDB successfully connected
```

### The Front-End
Running things on the front-end side will be very similar to the back-end. It is a [React project](https://react.dev/).

#### Setting Up the Environment Variables
Like the back-end, the front-end has some necessary configuration settings. These will also be set with environment variables.

Create a new file named **.env** in the **front-end** folder with these contents:

```
HTTP_PROXY="http://localhost:4000"
HTTPS_PROXY="http://localhost:4000"
REACT_APP_BACK_END_URL="http://localhost:4000"
```

#### Running the Front-End Server
Now, the front-end server is ready to run! Open another new terminal from the base folder.

Run this command to change the directory to the **front-end** folder:

```sh
cd front-end
```

There, install all necessary packages using `npm`:

```sh
npm install
```

Finally, run the front-end scripts with the following command:

```sh
npm run start
```

After a while, the output should hopefully end up looking something like this:

```
Compiled successfully!

You can now view friendpardy-front-end in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://10.10.21.235:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

## Testing
Once both the front-end _and_ the back-end projects are up and running, visit the front-end page to test out the application.
