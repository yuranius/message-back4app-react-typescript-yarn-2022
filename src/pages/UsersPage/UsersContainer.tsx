import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {

    AsyncGetAllUsersAction,
} from "../../store/usersReducer";

import {stateUsersType,} from "../../types/stateTypes";


export const UsersContainer: React.FC = () => {

    const dispatch = useDispatch()
    let {pageNumber, pageSize} = useSelector((state: stateUsersType) => state.users)

    useEffect( () => {
        dispatch(AsyncGetAllUsersAction())
    },[])




    return <div>fdfdg</div>

};
