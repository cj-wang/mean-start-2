# mean-start-2

Full stack [Angular](https://github.com/angular/angular) + [Nest](https://github.com/nestjs/nest).

The client application is based on [ngx-admin](https://github.com/akveo/ngx-admin) template with Angular 7+, Bootstrap 4 and [Nebular](https://github.com/akveo/nebular), integrated with [Nest](https://github.com/nestjs/nest) as the server-side framework.

## Demo

[Live Demo](https://mean-start-2.herokuapp.com) with upgraded [Tour of Heroes](https://mean-start-2.herokuapp.com/#/pages/heroes/dashboard) built with this framework.

Major changes to the original Tour of Heroes:
-	Heroes `AppModule` as a lazy loading feature module [0645fed](https://github.com/cj-wang/mean-start-2/commit/0645fed0c5d716325a5f8064f7778b9c719deb0c) [34923b4](https://github.com/cj-wang/mean-start-2/commit/34923b4d21bbc5170da8356554e148252bb811ce)
-	Import `ThemeModule` to make use of the features provided by the framework [f2d2081](https://github.com/cj-wang/mean-start-2/commit/f2d20813fa12d113eaf40ac9ed1fa7df3af8e265)
-	Real server APIs built with Nest [ceb40ba](https://github.com/cj-wang/mean-start-2/commit/ceb40ba252d7be6c73a73c3a25bd60021bebd350)
- *WIP*

## Development server

Run `npm run dev` to start the Angular dev server and the Nest server concurrently. Navigate to `http://localhost:4200/` for the dev server. API calls to `http://localhost:4200/api` will be proxied to the Nest server running on port 3000. The Angular app or Nest server will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The compiled server files will be stored in the `dist/server/` directory. The built Angular artifacts will be stored in the `dist/client/` directory.

## Production server

Run `npm start` to start the Nest server and it will serve the server APIs and the built Angular app as static pages as well. Navigate to `http://localhost:3000/` for the app.
> This is just to demonstrate the simplest way to run the app in production mode, not suitable for real world deployments.

## Running unit tests

Run `npm test` to execute the client and server unit tests concurrently.

## Running end-to-end tests

Run `npm run e2e` to execute the client and server end-to-end tests.
