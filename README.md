![Prezzo](https://prezzo.io)
The Digital Menu for Restaurants
================================

## Getting Started

Here is a quick start guide:

```
git clone git@github.com:odotan/prezzo.git
cd prezzo
yarn install
react-native run-ios
```

For further setup instructions please see our [Getting Started](#getting-started) section.

## Contents

:warning: **WORK IN PROGRESS** |
:star: **COMING SOON**

Not all of the below is yet fully implemented

### Application Blueprint

* Always up-to-date [React Native](https://facebook.github.io/react-native/) scaffolding
* Modular and well-documented structure for application code
* [Redux](http://redux.js.org/) and [ImmutableJS](https://facebook.github.io/immutable-js/) for safe and **Reasonaboutable**:tm: state management
* [Redux Loop](https://github.com/raisemarketplace/redux-loop) for Elm-style controlled side effects
* [React Navigation](https://reactnavigation.org/) for awesome navigation with 60fps transitions
* Disk-persisted application state caching for offline support and snappy startup performance
* Clean and testable service layer for interacting with RESTful APIs
* :warning: Sample app to show how to wire it all together
* :star: JSON Web Token authentication
* :star: Multi-environment configuration (dev, staging, production) for iOS and Android
* :star: Built-in error handling and customizable error screens

### Testing Setup

* [Jest](https://facebook.github.io/jest/) for unit testing application code and providing coverage information.
* [Enzyme](https://github.com/airbnb/enzyme) and fully mocked React Native for unit testing UI components
* Utilities for end-to-end integration testing Redux state, including side effects and asynchronous actions

### Development & Deployment Infrastructure

* [Bitrise.io](https://www.bitrise.io) configurations for Continuous Integration and beta app distribution
* :warning: [Google Tag Manager](https://www.google.com/analytics/tag-manager/) analytics
* [Travis CI](https://travis-ci.org/futurice/pepperoni-app-kit) example [configuration](https://github.com/futurice/pepperoni-app-kit/blob/master/.travis.yml) for Android, iOS and Javascript tests.


### Roadmap

* **TODO** :star: [Microsoft Code Push](http://microsoft.github.io/code-push) for instant JavaScript and images update
* **TODO** Crash reporting
* **TODO** Android and iOS UI Testing with Calaba.sh?
* **TODO** Feature flags?

## Getting started

To build your own app on top of the Starter Kit, fork or mirror this repository. For serious use we recommend [mirroring using these instructions](https://help.github.com/articles/duplicating-a-repository/), since you can't make a fork of a public repository private on GitHub. To contribute to Starter Kit development or just playing around, forking is the way to go.

First, give your application a name by running `./support/rename.sh YourAppName`.

Once you have the code downloaded, follow the **[Setup guide](docs/SETUP.md)** to get started.

## Development workflow

After you have set up the project using above instructions, you can use your favorite IDE or text editor to write code, and run the application from the command line. Turn on React Native hot module reloading in the app developer menu to update your application as you code.

To learn how to structure your application and use the Redux application architecture, read the **[Architecture guide](docs/ARCHITECTURE.md)** for more details.

##### Start the application in iOS simulator
```
$ react-native run-ios
```

##### Start the application in Android simulator
(If using the stock emulator, the emulator must be running)
```
$ react-native run-android
```

##### Run unit tests
```
$ npm test
```

##### Run tests every time code changes
```
$ npm run test:watch
```

##### Generate code coverage report
```
$ npm run coverage
```

Read the **[Testing guide](docs/TESTING.md)** for more information about writing tests.

## Debugging

For standard debugging select *Debug JS Remotely* from the React Native Development context menu (To open the context menu, press *CMD+D* in iOS or *D+D* in Android). This will open a new Chrome tab under [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui) and prints all actions to the console.

For advanced debugging under **macOS** we suggest using the standalone [React Native Debugger](https://github.com/jhen0409/react-native-debugger), which is based on the official debugger of React Native.
It includes the React Inspector and Redux DevTools so you can inspect React views and get a detailed history of the Redux state.

You can install it via [brew](https://brew.sh/) and run it as a standalone app:
```
$ brew update && brew cask install react-native-debugger
```
> Note: Make sure you close all active chrome debugger tabs and then restart the debugger from the React Native Development context menu.

## Deployment

Read the **[Deployment guide](docs/DEPLOYMENT.md)** to learn how to deploy the application to test devices, app stores, and how to use Code Push to push updates to your users immediately.
