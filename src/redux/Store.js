import { configureStore } from '@reduxjs/toolkit';import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './auth/AuthReducer';

const store = configureStore({
	reducer: {
        authReducer,
    }
});

export default store; 