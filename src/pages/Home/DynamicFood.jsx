import React, { useEffect, useState } from "react";
import Loader from "../../utilities/Loader";
import { Link } from "react-router";

const DynamicFood = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://plate-share-server-lilac.vercel.app/dynamicFood")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-center font-bold text-[#DC143C] mt-10 mb-8 text-3xl md:text-4xl">
        Our Most Served Food Items
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {data.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <figure className="p-3">
              <img
                className="w-full h-[140px] object-cover rounded-md"
                src={food.foodImage}
                alt={food.foodName}
              />
            </figure>
            <div className="card-body px-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#DC143C]">
                    <img 
                      src={food.donatorImage} 
                      alt={food.donatorName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 text-sm">{food.donatorName}</h3>
              </div>
              <h2 className="font-bold text-gray-900 mb-2 text-base">{food.foodName}</h2>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex justify-between">
                  <span className="font-medium">Quantity:</span>
                  <span>{food.quantity}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Expire:</span>
                  <span>{food.expireDate}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{food.pickupLocation}</span>
                </p>
              </div>
              <div className="card-actions mt-3">
                <Link
                  to={`/availableFoods/${food._id}`}
                  className="w-full bg-[#DC143C] text-white font-medium py-2 rounded-md hover:bg-[#b81232] transition-colors duration-200 text-center text-sm"
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
          className="btn bg-[#DC143C] text-white font-bold rounded-lg hover:bg-[#b81232] px-8 py-3 shadow-md hover:shadow-lg"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default DynamicFood;
