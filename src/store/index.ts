import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"
import buttonReducer from "./buttonSlice"

export const store  = configureStore({
    reducer:{
        counter:counterReducer,
        button: buttonReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;