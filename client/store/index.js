import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import location from './locations';
import destinations from './destinations';
import instagram from './instagram';
import awsFile from './awsFile';

const reducer = combineReducers({
  user,
  location,
  instagram,
  awsFile,
  destinations
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './locations';
export * from './destinations';
