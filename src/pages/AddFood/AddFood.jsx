import React, { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [formDataToSend, setFormDataToSend] = useState(null);

  useEffect(() => {
    if (!formDataToSend) return;

    const addFood = () => {
      fetch("https://plate-share-server-lilac.vercel.app/availableFoods", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formDataToSend),
      })
        .then((res) => res.json())
        .then(() => {
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
          setFormDataToSend(null);
        })
        .catch(() => {
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
        });
    };

    addFood();
  }, [formDataToSend, reset]);

  const handleAddBtn = (data) => {
    const formData = {
      donatorName: user.displayName,
      donatorEmail: user.email,
      donatorImage: user.photoURL,
      foodName: data.foodname,
      foodImage: data.foodImage,
      quantity: data.quantity,
      pickupLocation: data.pickupLocation,
      expireDate: data.expireDate,
      additionalNote: data.additionalNote,
    };
    setFormDataToSend(formData);
  };

  return (
    <div className="p-10 mb-10 flex flex-col items-center  space-y-5">
      <h1 className="text-center font-bold text-white mb-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ADD FOOD
      </h1>

      <form onSubmit={handleSubmit(handleAddBtn)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border-2 shadow-2xl p-4">
          <label className="label font-bold">Donator Name</label>
          <input
            type="text"
            className="input border-2 border-black"
            value={user.displayName}
            disabled
          />

          <label className="label font-bold">Email</label>
          <input
            type="text"
            className="input border-2 border-black"
            value={user.email}
            disabled
          />

          <label className="label font-bold">Donator Image URL</label>
          <input
            type="text"
            className="input border-2 border-black"
            value={user.photoURL}
            disabled
          />

          <label className="label font-bold">Food Name</label>
          <input
            {...register("foodname", { required: "Food name is required" })}
            type="text"
            className="input"
            placeholder="Food-Name"
          />
          {errors.foodname && (
            <p className="text-red-500 text-sm">{errors.foodname.message}</p>
          )}

          <label className="label font-bold">Food Image</label>
          <input
            {...register("foodImage", { required: "Image URL is required" })}
            type="text"
            className="input"
            placeholder="Image-URL"
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm">{errors.foodImage.message}</p>
          )}

          <label className="label font-bold">Food Quantity</label>
          <input
            {...register("quantity", { required: "Quantity is required" })}
            type="number"
            className="input"
            placeholder="Quantity"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}

          <label className="label font-bold">Food Status</label>
          <input
            type="text"
            className="input border-2 border-black"
            defaultValue={"Available"}
            disabled
          />

          <label className="label font-bold">Pickup Location</label>
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

          <label className="label font-bold">Expire Date</label>
          <input
            {...register("expireDate", { required: "Expire date is required" })}
            type="date"
          />
          {errors.expireDate && (
            <p className="text-red-500 text-sm">{errors.expireDate.message}</p>
          )}

          <label className="label font-bold">Additional Notes</label>
          <textarea
            {...register("additionalNote")}
            className="textarea"
            placeholder="Type here..."
          ></textarea>

          <button
            className="btn bg-[#DC143C] text-white font-bold rounded-xl"
            type="submit"
          >
            ADD
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddFood;
