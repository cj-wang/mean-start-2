# mean-start-2

Full stack [Angular](https://github.com/angular/angular) + [Nest](https://github.com/nestjs/nest), based on [ngx-admin](https://github.com/akveo/ngx-admin) template.

## Development server

Run `npm start` to start the Angular dev server and the Nest server concurrently. Navigate to `http://localhost:4200/` for the dev server. API calls to `http://localhost:4200/api` will be proxied to the Nest server on port 3000. The Angular app or Nest server will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The compiled server files will be stored in the `dist/` directory. The built Angular artifacts will be stored in the `dist/public/` directory.

## Production server
Run `npm run start:prod` to start in prod mode. The Nest server will serve the built Angular app as static pages. Navigate to `http://localhost:3000/`.

## Running unit tests

Run `npm test` to execute the client and server unit tests concurrently.

## Running end-to-end tests

Run `npm run e2e` to execute the client and server end-to-end tests.
