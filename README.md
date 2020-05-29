# flashcard-mobile
---
Flashcard Mobile using React Native Mobile application (Android or iOS) is Application that allows users to study using collections of flashcards. This applications allows user to craete Decks to categorized flashcard. User also can put unlimited card to that deck. User can start quiz to test study progress according corrent or incorrect answer


## Start Developing
---
To get started developing right away:

* Install and start the API server
    - `yarn install`
    - `yarn start`


## Available Scripts
---
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

#### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `yarn run ios`

Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn run android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools.


## File Structure

- public                  # Assets Publics
- src                     # Source files
    - actions             # Actions Logic
    - components          # React Components
    - reducers            # Redux Reducers
    - utils               # Utility Helpers, API
- README.md


## Plugin Used

- Formik (https://github.com/jaredpalmer/formik) : This application using Formik as Form Helper
- React Native Element (https://react-native-elements.github.io/): This application using React Native Element as Element Native
- yup (https://github.com/jquense/yup): This application using Yup as Schema Validator
- Redux (https://github.com/reduxjs/redux) : Redux as state management
- AsyncStorage: AsyncStorage as data storage