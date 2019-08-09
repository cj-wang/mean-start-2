# mean-start-2

Full stack [Angular](https://github.com/angular/angular) + [Nest](https://github.com/nestjs/nest) + [Universal](https://github.com/angular/universal).

The client application is based on [ngx-admin](https://github.com/akveo/ngx-admin) template with Angular 7+, Bootstrap 4 and [Nebular](https://github.com/akveo/nebular), integrated [Nest](https://github.com/nestjs/nest) server running APIs and server-side rendering.

## Demo

[Live Demo](https://mean-start-2.herokuapp.com) with upgraded [Tour of Heroes](https://mean-start-2.herokuapp.com/pages/heroes/dashboard).

## Development server

Run `npm run dev` to start the Angular dev server and the Nest API server concurrently. Navigate to `http://localhost:4200/` for the app. The Angular app or Nest server will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The built Angular artifacts will be stored in the `dist/client/` directory. The compiled server application with server-side rendering content will be the `dist/server.js` file.

## Production server

Run `npm start` to start the application in prod mode with server-side rendering. Navigate to `http://localhost:3000/` for the app.

## Running unit tests

Run `npm test` to execute the client and server unit tests concurrently.

## Running end-to-end tests

Run `npm run e2e` to execute the client and server end-to-end tests.

<!-- To wake up the Heroku instance -->
<img src="https://mean-start-2.herokuapp.com" alt="">
