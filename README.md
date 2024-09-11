# ✈️ Travel App

this project is a web application that fetches and displays weather data, location information, and relevant image for a location provided by the user. it utilizes [weatherbit](https://www.weatherbit.io/api) for weather data, [geonames](https://www.geonames.org/export/web-services.html) for geographical information, and [pixabay](https://pixabay.com/service/about/api/) to retrieve the location image. it also allows the user to save or discard search results, and manage the saved tirps list. the project is bundled with webpack, styled with SCSS, and tested using Jest.

## ⚙️ Technologies

- Webpack
- SCSS
- Jest

## 🚀 Getting started

### Before starting the project:

First run the command `npm install` to install project dependencies. Then you need to get your API keys for Pixabay and Weatherbit APIs, and get your Geonames username. Finally, you need to create a file called `.env` at project's root to store API credentials. The file should look like the following:

```sh
PIXABAY_KEY=your_pixabay_api_key
WEATHERBIT_KEY=your_weatherbit_api_key
GEONAMES_USERNAME=your_geonames_username
```

### Running the project:

- To start in development mode:
  1. Start the back-end server
     ```sh
     npm run start
     ```
  2. Run the following command to start Webpack's dev-server
     ```sh
     npm run build-dev
     ```
     Now the development environment is running on port 3000
- Finally to start the production mode
  1. Build the `dist` folder:
     ```sh
     npm run build-prod
     ```
     to create the dist folder.
  2. Run the application
     ```sh
     npm run start
     ```
     Server will be running on port 8000

### Run the tests

To run unit test cases:

```sh
npm run test
```

or

```sh
npm run watch
```

---

Thank you:D.