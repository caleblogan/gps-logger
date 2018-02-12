# Gps Logger
Small web app using react and django-rest-framework. Records coordinates using browsers geolocation service.
Saves locations in memory if not logged in.

# Server Setup
- TODO
#### Env
- `DJANGO_SECRET_KEY` (set this for prod)
- `PROD` (will turn debug off if set to any value)

## Testing (server)
- run `python manage.py test`

# Client Setup
- clone repo
- cd in project directory
- run yarn or npm install
- run yarn start or npm start

#### Env
These must be set in webpack.prod file for the prod build process. Uses DefinePlugin.
- `API_BASE_URL` (the url of the api server, eg. 'http://localhost:8080/api/v1/'

## Testing (client)
- Uses `jest` and `enzyme`.
- Run `npm run test` to run tests.
- Tests are either with their component or in top level tests directory