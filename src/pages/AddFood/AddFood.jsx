import React, { useContext } from "react";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addFoodMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("http://localhost:3000/availableFoods", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Food Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      reset();
    },
    onError: () => {
      toast.error("Something went wrong!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
    },
  });

  const handleAddBtn = (data) => {
    const formData = {
      donatorName: user.displayName,
      donatorEmail: user.email,
      foodName: data.foodname,
      foodImage: data.foodImage,
      quantity: data.quantity,
      pickupLocation: data.pickupLocation,
      expireDate: data.expireDate,
      additionalNote: data.additionalNote,
    };
    addFoodMutation.mutate(formData);
  };

  return (
    <div className="border-2 my-15 flex flex-col items-center p-7 space-y-5">
      <h1>ADD FOOD</h1>

      <div>
        <img
          src={user?.photoURL}
          alt="User-Image"
          className="w-20 h-20 rounded-full"
        />
      </div>

      <form onSubmit={handleSubmit(handleAddBtn)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Donator Name</label>
          <input
            type="text"
            className="input border-2 border-black"
            value={user.displayName}
            disabled
          />

          <label className="label">Email</label>
          <input
            type="text"
            className="input border-2 border-black"
            value={user.email}
            disabled
          />

          <label className="label">Food Name</label>
          <input
            {...register("foodname", { required: "Food name is required" })}
            type="text"
            className="input"
            placeholder="Food-Name"
          />
          {errors.foodname && (
            <p className="text-red-500 text-sm">{errors.foodname.message}</p>
          )}

          <label className="label">Food Image</label>
          <input
            {...register("foodImage", { required: "Image URL is required" })}
            type="text"
            className="input"
            placeholder="Image-URL"
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm">{errors.foodImage.message}</p>
          )}

          <label className="label">Food Quantity</label>
          <input
            {...register("quantity", { required: "Quantity is required" })}
            type="number"
            className="input"
            placeholder="Quantity"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}

          <label className="label">Food Status</label>
          <input
            type="text"
            className="input"
            defaultValue={"Available"}
            disabled
          />

          <label className="label">Pickup Location</label>
          <input
            {...register("pickupLocation", {
              required: "Pickup location is required",
            })}
            type="text"
            className="input"
            placeholder="#Road-9"
          />
          {errors.pickupLocation && (
            <p className="text-red-500 text-sm">
              {errors.pickupLocation.message}
            </p>
          )}

          <label className="label">Expire Date</label>
          <input
            {...register("expireDate", { required: "Expire date is required" })}
            type="date"
          />
          {errors.expireDate && (
            <p className="text-red-500 text-sm">{errors.expireDate.message}</p>
          )}

          <label className="label">Additional Notes</label>
          <textarea
            {...register("additionalNote")}
            className="textarea"
            placeholder="Type here..."
          ></textarea>

          <button className="btn btn-neutral mt-4" type="submit">
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddFood;
