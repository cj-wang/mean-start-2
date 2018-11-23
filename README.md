# mean-start-2

Full stack [Angular](https://github.com/angular/angular) + [Nest](https://github.com/nestjs/nest).

Client application is based on [ngx-admin](https://github.com/akveo/ngx-admin) template with Angular 7+, Bootstrap 4 and [Nebular](https://github.com/akveo/nebular), integrated with [Nest](https://github.com/nestjs/nest) on the server side.

<a href="https://akveo.github.io/nebular/"><img src="https://i.imgur.com/ScNTkCX.png"></a>

<p align="center">Admin template based on Angular 7+, Bootstrap 4 and <a href="https://github.com/akveo/nebular">Nebular</a></p>

| Corporate Theme |
|:---------------:|
|<a target="_blank" href="http://akveo.com/ngx-admin/#/pages/dashboard?theme=corporate&utm_source=github&utm_medium=ngx_admin_readme&utm_campaign=themes"><img src="https://i.imgur.com/axbJYdN.png"/></a>|

| Cosmic Theme | Light Theme |
|:------------:|:--------------:|
|<a target="_blank" href="http://akveo.com/ngx-admin/#/pages/dashboard?theme=cosmic&utm_source=github&utm_medium=ngx_admin_readme&utm_campaign=themes"><img src="https://i.imgur.com/FgRZcqL.png"/></a>|<a target="_blank" href="http://akveo.com/ngx-admin/#/pages/dashboard?theme=default&utm_source=github&utm_medium=ngx_admin_readme&utm_campaign=themes"><img src="https://i.imgur.com/fozHlRJ.png"/></a>|

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Development server

Run `npm start` to start the Angular dev server and the Nest server concurrently. Navigate to `http://localhost:4200/` for the dev server. API calls to `http://localhost:4200/api` will be proxied to the Nest server on port 3000. The Angular app or Nest server will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The compiled server files will be stored in the `dist/server/` directory. The built Angular artifacts will be stored in the `dist/client/` directory.

## Production server
Run `npm run start:prod` to start the Nest server and it serves the built Angular app as static pages as well. Navigate to `http://localhost:3000/`.

## Running unit tests

Run `npm test` to execute the client and server unit tests concurrently.

## Running end-to-end tests

Run `npm run e2e` to execute the client and server end-to-end tests.
