import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";

const AvailableFoods = () => {
  const { user, loading } = use(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/availableFoods")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-center">ALL FOODS</h1>
      <div className="grid grid-cols-3 gap-5">
        {data.map((food) => (
          <div key={food._id}>
            <div className="card bg-base-100 w-full shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2"></div>
                  </div>
                  <h1>{user.displayName}</h1>
                </div>
                <h2 className="card-title">{food.foodName}</h2>
                <h2>Quantity: {food.quantity}</h2>
                <h2>Expire Date: {food.expireDate}</h2>
                <h2>Pickup Location: {food.pickupLocation}</h2>
                <div className="card-actions">
                  <Link
                    to={`/availableFoods/${food._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
