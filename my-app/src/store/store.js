import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth.slice';
import { usersReducer } from './slices/users.slice';
import { weatherReducer } from './slices/weather.slice';

export * from './slices/auth.slice';
export * from './slices/users.slice';
export * from './slices/weather.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        weather: weatherReducer,
    },
});