# balancing-the-sun
React UI for "Balancing the Sun" touchscreen interactive in "Skin"
exhibit.

## Installation

Clone balancing-the-sun repo locally.

Unpack node modules via Yarn:

```
$ cd balancing-the-sun
$ yarn
```

Find movie.mp4, fonts.zip, and photos.zip in team Google Drive:
```
+-- DME: Web & Interactive
|   +-- Exhibit Interactives
|   |   +-- Skin Exhibit
|   |   |   +-- Balancing the Sun
|   |   |   |   +-- Technical
```

Copy movie.mp4 into "/public/video" directory of local project.

Copy contents of fonts.zip (a “fonts” directory) to project's “/src” directory.

Copy contents of photos.zip (a “photos” directory) to project's “/src/img/”
directory.

## Development and Build Notes

### .env variables for webpack module bundler build
URLs for live CMS data sources are saved as global REACT_APP_... environment
variables defined in project root .env.development and .env.production files.
Webpack hot-loads development variables on update in local development
environment and injects production variables into production distribution
codebase on build.

### Development
```
yarn start
```
Webpack auto-launches Chrome browser at localhost:3000 and hot-loads all source
file updates.

### Production Build
```
yarn build
```
Webpack builds optimized distribution code to /build directory.

## Deploy Notes

The deploy script deletes s3://balancing-the-sun.calacademy.org content and
copies local build folder contents to s3://balancing-the-sun.calacademy.org.

```
yarn deploy
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
