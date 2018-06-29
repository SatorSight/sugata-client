import { combineReducers } from 'redux';
import navMenu from './navMenu';
import server from './server';
import router from './router';
import pageTracker from './pageTracker';

export default combineReducers({
    navMenu,
    server,
    router,
    pageTracker,
});