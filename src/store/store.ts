import {configureStore, createSelector, ThunkAction, UnknownAction} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";
import  {userSlice} from "../modules/users/users.slice";
import {counterReduces} from "../modules/counters/counters.slice";
import {api} from "../api";


const extraArg = {
    api
}

export const store = configureStore({
    reducer: {
        counters: counterReduces,
        [userSlice.name]: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument: extraArg } })
})

//store.dispatch(userSlice.actions.stored({ users: initialUserList }))

export type AppState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArg, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
