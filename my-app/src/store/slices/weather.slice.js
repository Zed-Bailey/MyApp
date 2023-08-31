import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'helpers';

// create slice

const name = 'weather';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const weatherActions = { ...slice.actions, ...extraActions };
export const weatherReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        weather: []
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/weatherforecast`;

    return {
        getForecast: getForecast()
    };    

    function getForecast() {
        return createAsyncThunk(
            `${name}/weatherforecast`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getForecast()
    };

    function getForecast() {
        var { pending, fulfilled, rejected } = extraActions.getForecast;
        return {
            [pending]: (state) => {
                state.weather = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.weather = action.payload;
            },
            [rejected]: (state, action) => {
                state.weather = { error: action.error };
            }
        };
    }
}
