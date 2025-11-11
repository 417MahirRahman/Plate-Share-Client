import React from "react";

const AddFood = () => {
  return (
    <div className="border-2 my-15 flex flex-col items-center p-7 space-y-5">
      <h1>ADD FOOD</h1>

      <form>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Food Name</label>
          <input
            name="foodname"
            type="text"
            className="input"
            placeholder="Food-Name"
            required
          />

          <label className="label">Food Image</label>
          <input
            name="foodImage"
            type="text"
            className="input"
            placeholder="Image-URL"
            required
          />

          <label className="label">Food Quantity</label>
          <input
            name="quantity"
            type="number"
            className="input"
            placeholder="Quantity"
            required
          />

          <label className="label">Pickup Location</label>
          <input
            name="pickupLocation"
            type="text"
            className="input"
            placeholder="#Road-9"
            required
          />

          <label className="input">
            <span className="label">Expire Date</span>
            <input type="date" required />
          </label>

          <label className="label">Additional Notes</label>
          <textarea className="textarea" placeholder="Type here..."></textarea>

          <button className="btn btn-neutral mt-4">Add</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddFood;
