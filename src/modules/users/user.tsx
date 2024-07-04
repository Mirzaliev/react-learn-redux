import React, {useEffect, useState} from 'react';
import {List, Spin, Switch} from "antd";
import {useAppDispatch, useAppSelector, useAppStore} from "../../store/store";

import { userSlice} from "./users.slice";
import {fetchUsers} from "./model/fetch-users";
import {Link} from "react-router-dom";

const User = () => {
    const [sort, setSort] = useState<'asc' | 'desc'>('asc')
    const dispatch = useAppDispatch()
    const appStore = useAppStore()
    const users = useAppSelector(state => userSlice.selectors.getSortedUsers(state, sort))
    const isPending = useAppSelector(userSlice.selectors.fetchStatusIsPending)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [appStore, dispatch])


    const onSort = (checked: boolean) => {
        if(checked){
            setSort('asc')
        }else {
            setSort('desc')
        }
    };

    if(isPending) {
        return <Spin size="large" />
    }

    return (
        <>
            <List
                header={<div>
                    Пользователи
                    <Switch onChange={onSort}/>
            </div>}
                bordered
                dataSource={users}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Link to={`/users/${item.id}`}>{item.name}</Link>
                    </List.Item>
                )}
            />
        </>
    );
};

export default User;
