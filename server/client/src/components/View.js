import React, {useEffect} from "react";
import {useGetUserQuery} from "../services/usersApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const View = () => {
    const {id} = useParams();
    const {data, error, isLoading} = useGetUserQuery(id);

    useEffect(() => {
        if(error){
            toast.error("Something went wrong", {
                position: "top-center"
            })
        }
    }, [error]);
    return(
        <div className="view">
            <div className="view_details">
                <h2>User Details</h2>
                <p><strong>_id:</strong> {data && data.id}</p>
                <p><strong>Name:</strong> {data && data.name}</p>
                <p><strong>Email:</strong> {data && data.email}</p>
                <p><strong>Phone:</strong> {data && data.phone}</p>
            </div>
            <NavLink to="/"><button className="addUserBtn">Back</button></NavLink>
        </div>
    )
}

export default View;