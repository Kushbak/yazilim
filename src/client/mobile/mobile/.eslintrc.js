module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
},
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".json", ".native.js"]
      }
    }
  }
};
