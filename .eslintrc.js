module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "quotes": [2, "single"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.5" // React version, default to the latest React stable release
    },
    "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the propTypes object, such as `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
  }
};