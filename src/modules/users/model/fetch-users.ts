import {userSlice} from "../users.slice";
import { AppThunk} from "../../../store/store";

export const fetchUsers = ():AppThunk => (dispatch, getState, { api }) => {
    const isIdle = userSlice.selectors.fetchStatusIsIdle(getState())
    if(!isIdle){
        return
    }
    dispatch(userSlice.actions.fetchUserPending())
    api.getUser()
        .then(users => dispatch(userSlice.actions.fetchUserSuccess({ users })))
        .catch(() => dispatch(userSlice.actions.fetchUserFailed()))
}
