import React from 'react';
import logo from './logo.svg';
import './App.scss';
import LayoutSlide from './component/layout/layout'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todoApp from './redux/reducers';
import { BrowserRouter as Router } from 'react-router-dom';

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware
  )
);

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <LayoutSlide />
      </Provider>
    </Router>
  );
}



export default App;
