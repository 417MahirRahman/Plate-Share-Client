import React from 'react';
import { Outlet } from 'react-router';

const AllFood = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AllFood;