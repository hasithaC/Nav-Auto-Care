/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppEntryPoint from './app/AppEntryPoint';

AppRegistry.registerComponent(appName, () => AppEntryPoint);
