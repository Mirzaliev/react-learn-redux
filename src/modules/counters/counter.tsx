import React from 'react';
import {AppState, useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import { Typography, Button } from 'antd';
import {CounterId, decrementAction, incrementAction} from "./counters.slice";
import {bindActionCreators} from "@reduxjs/toolkit";

const { Text } = Typography;

const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId]

const Counter = ({ counterId }: { counterId: CounterId }) => {
    console.log('rendered ', counterId)
    const dispatch = useDispatch()
    const counter = useAppSelector((state) => selectCounter(state, counterId))

    const action = bindActionCreators({
        incrementAction,
        decrementAction
    }, dispatch)

    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <Text type="success">counter { counter?.counter }</Text>
            <Button type="primary" onClick={
                () => action.incrementAction({ counterId })}>
                +</Button >
            <Button type="primary" onClick={
                () => action.decrementAction({ counterId })}>
                -</Button >
        </div>
    );
};

export default Counter;
