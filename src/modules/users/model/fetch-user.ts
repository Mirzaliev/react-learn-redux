import {AppThunk} from "../../../store/store";
import {userSlice} from "../users.slice";

export const fetchUser = ():AppThunk => (dispatch, getState, { api }) => {
    const isIdle = userSlice.selectors.fetchStatusIsIdle(getState())
    if(!isIdle){
        return
    }
    dispatch(userSlice.actions.fetchUserPending())
    api.getUser()
        .then(users => dispatch(userSlice.actions.fetchUserSuccess({ users })))
        .catch(() => dispatch(userSlice.actions.fetchUserFailed()))
}

