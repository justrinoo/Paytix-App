import {combineReducers} from 'redux';

import movie from './movie';
import schedule from './schedule';
import user from './user';

export default combineReducers({
  movie,
  user,
  schedule,
});
