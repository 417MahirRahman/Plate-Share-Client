import React from "react";
import { useLoaderData } from "react-router";

const FoodDetails = () => {
  const { food } = useLoaderData();

  return (
    <div>
      <h1>FOOD Details</h1>

      <div>
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
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
