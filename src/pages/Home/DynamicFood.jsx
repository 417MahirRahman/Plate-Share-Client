import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import { Link } from "react-router";

const DynamicFood = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dynamicFood")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading) {
    <Loader></Loader>;
  }

  return (
    <div className="pb-20 p-2">
      <h1 className="text-center font-bold text-white mt-10 mb-8 text-4xl">Our Most Served Food Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((food) => (
          <div
            key={food._id}
            className="card bg-base-100 w-full lg:w-11/12 lg:mx-auto shadow-lg hover:shadow-2xl"
          >
            <figure className="p-7">
              <img
                className="w-full h-[150px] lg:h-[250px] rounded-4xl"
                src={food.foodImage}
                alt=""
              />
            </figure>
            <div className="card-body px-10 mt-5">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                    <img src={food.donatorImage} alt="" />
                  </div>
                </div>
                <h1 className="font-bold text-xl">{food.donatorName}</h1>
              </div>
              <h2 className="card-title font-bold text-lg">{food.foodName}</h2>
              <h2 className="font-bold text-sm">Quantity: {food.quantity}</h2>
              <h2 className="font-bold text-sm">
                Expire Date: {food.expireDate}
              </h2>
              <h2 className="font-bold text-sm">
                Pickup Location: {food.pickupLocation}
              </h2>
              <div className="card-actions">
                <Link
                  to={`/availableFoods/${food._id}`}
                  className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10 mb-5">
        <Link
          to={"/availableFoods"}
          className="btn md:btn-xl bg-[#DC143C] text-white font-bold rounded-xl border-none"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default DynamicFood;
