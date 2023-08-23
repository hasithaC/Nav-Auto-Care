import React from 'react';
import Root from './Root';
import {Provider} from 'react-redux';
import {store} from './store/store';

const AppEntryPoint = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default AppEntryPoint;
