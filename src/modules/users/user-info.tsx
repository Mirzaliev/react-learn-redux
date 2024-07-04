import React from 'react';
import {useParams, useNavigate } from "react-router-dom";
import {Button, Card} from "antd";
import {useAppSelector} from "../../store/store";
import {userSlice} from "./users.slice";

const UserInfo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useAppSelector((state) => userSlice.selectors.getUserById(state, id))

    const goBack = () => {
        navigate('..', { relative: "path" })
    }

    console.log(user.name);
    return (
        <Card
            title={user.name}
            bordered={false}
            extra={ <Button onClick={goBack} type="link">Назад</Button>}>
            {user.website}
        </Card>
    );
};

export default UserInfo;
