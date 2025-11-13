import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { food } = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addFoodMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("http://localhost:3000/FoodRequest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Request Sent Successfully", {
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
      document.getElementById(`modal_${food._id}`).close();
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

  const handleSubmitBtn = () => {
    const formData = {
      Name: user.displayName,
      Email: user.email,
      ImageURL: user.photoURL,
      foodID:food._id,
      foodStatus:"Available",
    };
    addFoodMutation.mutate(formData);
  };

  return (
    <div>
      <h1>FOOD Details</h1>
      {/* Donator-Info */}
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>

      {/* Food-Info */}
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{food.foodName}</h1>
            <h1 className="text-xl font-bold">Quantity: {food.quantity}</h1>
            <h1 className="text-xl font-bold">
              Expire Date: {food.expireDate}
            </h1>
            <h1 className="text-xl font-bold">
              Pickup Location: {food.pickupLocation}
            </h1>
            <p className="py-6">{food.additionalNote}</p>
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`modal_${food._id}`).showModal()
              }
            >
              Request Food
            </button>
            {/* modal */}
            {
              <dialog id={`modal_${food._id}`} className="modal">
                <form onSubmit={handleSubmit(handleSubmitBtn)}>
                  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <label className="label">Location</label>
                    <input
                      {...register("Location", {
                        required: "location is required",
                      })}
                      type="text"
                      className="input"
                      placeholder="#Road-9"
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-sm">
                        {errors.Location.message}
                      </p>
                    )}

                    <label className="label">Why Need Food?</label>
                    <textarea
                      {...register("WhyNeedFood")}
                      className="textarea"
                      placeholder="Type here..."
                    ></textarea>

                    <label className="label">Contact Number</label>
                    <input
                      {...register("ContactNumber", {
                        required: "Contact Number is required",
                      })}
                      type="number"
                      className="input"
                      placeholder="01****"
                      defaultValue={food.quantity}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}

                    <button className="btn">Submit Request</button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        document.getElementById(`modal_${food._id}`).close()
                      }
                    >
                      Close
                    </button>
                  </fieldset>
                </form>
              </dialog>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
