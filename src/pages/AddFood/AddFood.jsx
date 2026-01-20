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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-center font-bold text-[#DC143C] mb-8 text-3xl md:text-4xl">
        ADD FOOD
      </h1>

      <form onSubmit={handleSubmit(handleAddBtn)} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
        <div className="space-y-6">
          {/* Donator Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Donator Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                value={user.displayName}
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                value={user.email}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Donator Image URL</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
              value={user.photoURL}
              disabled
            />
          </div>

          {/* Food Details Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name *</label>
            <input
              {...register("foodname", { required: "Food name is required" })}
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
            />
            {errors.foodname && (
              <p className="text-red-500 text-sm mt-1">{errors.foodname.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Food Image URL *</label>
            <input
              {...register("foodImage", { required: "Image URL is required" })}
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
            />
            {errors.foodImage && (
              <p className="text-red-500 text-sm mt-1">{errors.foodImage.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Food Quantity *</label>
              <input
                {...register("quantity", { required: "Quantity is required" })}
                type="number"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Food Status</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
                defaultValue={"Available"}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location *</label>
            <input
              {...register("pickupLocation", {
                required: "Pickup location is required",
              })}
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
            />
            {errors.pickupLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pickupLocation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Expire Date *</label>
            <input
              {...register("expireDate", { required: "Expire date is required" })}
              type="date"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
            />
            {errors.expireDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expireDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
            <textarea
              {...register("additionalNote")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
              placeholder="Type here..."
              rows="3"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              className="w-full bg-[#DC143C] text-white font-bold py-3 rounded-lg hover:bg-[#b81232] transition-colors duration-200 shadow-md"
              type="submit"
            >
              ADD FOOD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
