import {AppState} from "../../store/store";
import {createSelector, createSlice} from "@reduxjs/toolkit";
import {User} from "../../api";

export type UserId = string

export type TUser = {
    id: UserId;
    name: string
    description: string
}

export const initialUserList: User[] = Array.from({ length: 999 }, (_, index) => ({
    id: `${index}`,
    name: `User ${index}`,
    description: `Description for User with id ${index}`,
    status: 'idle'
}))

type UserState = {
    entities: Record<UserId, User>
    ids: UserId[]
    selectedUserId: UserId | undefined
    status: 'idle' | 'pending' | 'success' | 'failed'
}

const initialUserState: UserState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
    status: 'idle'
}

export const userSlice = createSlice({
    name: 'users',
    initialState: initialUserState,
    selectors: {
        getUserById: (state, userId: UserId) => state.entities[userId],
        getSelectedUser: (state: UserState) => state.selectedUserId
            ? state.entities[state.selectedUserId]
            : undefined,
        getSortedUsers: createSelector(
            (state: UserState) => state.ids,
            (state: UserState) => state.entities,
            (_, sort: 'asc' | 'desc') => sort,
            (ids, entities, sort) => ids.map(id => entities[id])
                .sort((a,b) => {
                    if(sort === 'asc'){
                        return a.name.localeCompare(b.name)
                    } else {
                        return b.name.localeCompare(a.name)
                    }
                })
        ),
        fetchStatusIsPending: (state) => state.status === 'pending',
        fetchStatusIsIdle: (state) => state.status === 'idle'
    },
    reducers: {
        selected: (state, action) => {
            const { userId } = action.payload
            state.selectedUserId = userId
        },
        removeSelect: (state) => {
            state.selectedUserId = undefined
        },
        fetchUserPending: (state) => {
            state.status = 'pending'
        },
        fetchUserFailed: (state) => {
            state.status = 'failed'
        },
        fetchUserSuccess: (state, action) => {
            const { users } = action.payload
            state.status = 'success'
            state.entities = users.reduce((acc, user) => {
                    acc[user.id] = user
                    return acc
                }, {})
            state.ids = users.map(user => user.id)
            }
    }
})
