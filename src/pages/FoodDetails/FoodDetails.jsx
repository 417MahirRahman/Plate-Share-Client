import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../utilities/Loader";

const FoodDetails = () => {
  const { user, setLoading } = useContext(AuthContext);
  const { food } = useLoaderData();
  const [data, setData] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:3000/FoodRequest?email=${food.donatorEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data: ", data);
        setData(data);
        setLoading(false);
      });
  }, [food.donatorEmail, setLoading]);

  const addFoodMutation = useMutation({
    mutationFn: (formData) =>
      fetch("http://localhost:3000/FoodRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),

    onSuccess: () => {
      toast.success("Request Sent Successfully", { transition: Bounce });
      document.getElementById(`modal_${food._id}`).close();
      reset();
    },
    onError: () => toast.error("Something went wrong!", { transition: Bounce }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, formData }) =>
      fetch(`http://localhost:3000/FoodRequest?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),

    onSuccess: (response, variables) => {
      const { id } = variables;
      if (response.updatedRequest) {
        setStatusMap((prev) => ({
          ...prev,
          [id]: response.updatedRequest.foodStatus,
        }));
        toast.success(
          `Status updated to ${response.updatedRequest.foodStatus}`
        );
      } else {
        toast.error(response.message || "Update failed");
      }
    },
  });

  if (data.length === 0 && !setLoading) {
    return <Loader />;
  }

  const handleSubmitBtn = () => {
    const requestData = {
      Name: user.displayName,
      Email: user.email,
      ImageURL: user.photoURL,
      foodID: food._id,
      foodname: food.foodName,
      foodStatus: "Pending",
      foodOwnerEmail: food.donatorEmail,
    };
    addFoodMutation.mutate(requestData);
  };

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, formData: { foodStatus: "Donated" } });
  };

  const handleReject = (id) => {
    updateStatusMutation.mutate({ id, formData: { foodStatus: "Rejected" } });
  };

  const DATA = data.find((item) => item.foodID === food._id);
  console.log(DATA);

  return (
    <div className="pb-20 p-2">
      <h1 className="text-center font-bold text-white mt-10 mb-8 text-4xl">
        FOOD DETAILS
      </h1>

      {/* Donor Info */}
      <div data-aos="flip-right" className="hero flex justify-start text-white bg-linear-to-r from-[#DC143C] to-white mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img
            src={food.donatorImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-2xl font-bold">{food.donatorName}</h1>
            <h1 className="text-lg font-semibold">{food.donatorEmail}</h1>
          </div>
        </div>
      </div>

      {/* Food Info */}
      <div data-aos="flip-left" className="hero flex justify-end text-white bg-linear-to-r from-white to-[#DC143C] mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src={food.foodImage}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl font-bold">{food.foodName}</h1>
            <p className="font-semibold mt-2">Quantity: {food.quantity}</p>
            <p className="font-semibold">Expire Date: {food.expireDate}</p>
            <p className="font-semibold">
              Pickup Location: {food.pickupLocation}
            </p>
            <p className="py-4">{food.additionalNote}</p>
            <button
              className="btn bg-[#DC143C] text-white font-bold rounded-xl border-none"
              onClick={() =>
                document.getElementById(`modal_${food._id}`).showModal()
              }
            >
              Request Food
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id={`modal_${food._id}`} className="modal">
        <form
          onSubmit={handleSubmit(handleSubmitBtn)}
          className="modal-box bg-white text-black"
        >
          <h3 className="font-bold text-lg mb-4 text-center">Request Food</h3>

          <label className="label">Location</label>
          <input
            {...register("Location", { required: "Location is required" })}
            type="text"
            className="input input-bordered w-full"
            placeholder="#Road-9"
          />
          {errors.Location && (
            <p className="text-red-500">{errors.Location.message}</p>
          )}

          <label className="label mt-3">Why Need Food?</label>
          <textarea
            {...register("WhyNeedFood")}
            className="textarea textarea-bordered w-full"
          ></textarea>

          <label className="label mt-3">Contact Number</label>
          <input
            {...register("ContactNumber", {
              required: "Contact Number is required",
            })}
            type="number"
            className="input input-bordered w-full"
            placeholder="01****"
          />
          {errors.ContactNumber && (
            <p className="text-red-500">{errors.ContactNumber.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn bg-[#DC143C] text-white">Submit</button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                document.getElementById(`modal_${food._id}`).close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* Food Requests Table */}
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-10">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <h2 className="text-center bg-[#DC143C] text-white py-3 text-lg font-bold">
            Food Requests
          </h2>

          {DATA?.foodID === food._id ? (
            <div className="divide-y divide-gray-200">
              {data.map((request) => {
                const currentStatus =
                  statusMap[request._id] || request.foodStatus;
                return (
                  <div
                    key={request._id}
                    className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-1 md:gap-3 text-left">
                      <div>
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={request.ImageURL}
                          alt="Profile"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          <h1>{request.Name}</h1>
                        </div>
                        <div className="font-semibold text-gray-800">
                          <h1>Requested Food: {food.foodName}</h1>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 sm:mt-0">
                      {currentStatus === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAccept(request.foodID)}
                            className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request.foodID)}
                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {currentStatus === "Donated" && (
                        <span className="px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">
                          Accepted
                        </span>
                      )}
                      {currentStatus === "Rejected" && (
                        <span className="px-3 py-1 rounded bg-red-100 text-red-800 font-semibold text-sm">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center py-5 text-gray-600">No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
