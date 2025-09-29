/**
 * @format
 */
global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;

global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

if (window.__FETCH_SUPPORT__) {
  window.__FETCH_SUPPORT__.blob = false;
}
const originalFetch = fetch;
fetch = async (...args) => {
  const url = args[0]; // first arg is the URL

  // Skip Metro's internal requests
  if (typeof url === 'string' && url.includes('symbolicate')) {
    return originalFetch(...args);
  }

  console.log('➡️ Fetch request:', ...args);
  const response = await originalFetch(...args);
  const clone = response.clone();

  clone.text().then(text => {
    console.log('⬅️ Fetch response:', text);
  });

  return response;
};

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
