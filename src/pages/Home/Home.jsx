import React, { use } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loader from '../../utilities/Loader';

const Home = () => {
    const {user, loading} = use(AuthContext)

    if(loading){
        return <Loader></Loader>
    }

    console.log(user)
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;