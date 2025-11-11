import React from "react";
import { Link, useLoaderData } from "react-router";

const AvailableFoods = () => {
  const foods = useLoaderData();

  return (
    <div>
      <h1>ALL FOODS</h1>
      <div className="grid grid-cols-3 gap-5">
        {foods.map((food) => (
          <div key={food._id}>
            <div className="card bg-base-100 w-full shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{food.foodName}</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions">
                  <Link to={`/availableFoods/${food._id}`} className="btn btn-primary">View Details</Link>
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
