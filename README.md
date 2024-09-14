# ✈️ Travel App

This project is a web application that fetches and displays weather data, location information, and relevant image for a location provided by the user. It utilizes [Weatherbit](https://www.weatherbit.io/api) for weather data, [Geonames](https://www.geonames.org/export/web-services.html) for geographical information, and [Pixabay](https://pixabay.com/service/about/api/) to retrieve the location image. Tt also allows the user to save or discard search results, and manage the saved tirps list. The project is bundled with webpack, styled with SCSS, and tested using Jest.

## ⚙️ Technologies

- Webpack
- SCSS
- Jest

## 🚀 Getting started

### Before starting the project:

[!NOTE]
This project is developed using Node.js version <em>20.1.0</em>, make sure you are using the correct version.
You can use `nvm` (Node Version Manager), to make it easier to transition between node versions.

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
     Now the development environment is running on port 3000.
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
     Server will be running on port 8000.

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
