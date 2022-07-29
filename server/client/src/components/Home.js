import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useGetAllUsersQuery, useDeleteUserMutation} from "../services/usersApi";

const Home = () => {
    const {data, error, isLoading} = useGetAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async(id) => {
        if(window.confirm("Are you sure")){
            await deleteUser(id);
            toast.success("User Deleted Successfully", {
                position: "top-center"
            });
        }      
    }

  return (
    <div className="home my-4">        
        <Container>
            <h1 className="mt-4">USERS</h1>
            <NavLink to="/add"><button className="addUserBtn">Add User</button></NavLink>
            {
                isLoading ? (
                    <p>Loading...</p>
                ) : error ? (<p>...Error Occured</p>) : (
                    <Row>
                        {
                            data?.map((elem) => {
                                return(
                                    <Col className="col-lg-3 col-md-6 col-sm-12 div_par" key={elem.id}>
                                        <div className="div_chi">
                                            <p>{elem.name}</p>
                                            <p>{elem.email}</p>
                                            <p>{elem.phone}</p>
                                            <div>
                                                <NavLink to={`/view/${elem.id}`}><button>V</button></NavLink>
                                                <NavLink to={`/edit/${elem.id}`}><button>E</button></NavLink>
                                                <button onClick={() => handleDelete(elem.id)}>D</button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }                
                    </Row>
                )
            }            
        </Container>
    </div>
  )
}

export default Home
