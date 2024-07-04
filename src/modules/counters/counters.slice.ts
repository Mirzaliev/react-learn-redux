import {createAction, createReducer} from "@reduxjs/toolkit";

type CounterState = {
    counter: number
}
export type CounterId = string

export type CountersState = Record<CounterId, CounterState | undefined>


export const incrementAction = createAction<{
    counterId: CounterId
}>('counters/increment')

export const decrementAction = createAction<{
    counterId: CounterId
}>('counters/decrement')


const initialCounterState: CounterState = { counter: 0 }

const initialCountersState: CountersState = {}

export const counterReduces = createReducer(initialCountersState, (builder) => {
    builder.addCase(incrementAction, (state, action) => {
        const { counterId } = action.payload
            const currentCounter = state[counterId] ?? initialCounterState

            return {
                ...state,
                [counterId]: {
                    counter: currentCounter.counter + 1
                }
            }
    })
    builder.addCase(decrementAction, (state, action) => {
            const { counterId } = action.payload
            const currentCounter = state[counterId] ?? initialCounterState
            return {
                ...state,
                [counterId]: {
                    ...currentCounter,
                    counter: currentCounter.counter - 1
                }
            }
        }
    )
})

