import React from 'react';
import {Provider} from 'react-redux'

import {About} from './screens/about/AboutScreen';
import {store} from './store';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <About />
    </Provider>
  );
}

export default App;
