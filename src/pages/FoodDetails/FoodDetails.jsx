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
    fetch(`http://localhost:3000/FoodRequest?foodID=${food._id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data: ", data);
        setData(data);
        setLoading(false);
      });
  }, [food._id, setLoading]);

  const addFoodMutation = useMutation({
    mutationFn: (formData) =>
      fetch("http://localhost:3000/FoodRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`
         },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),

    onSuccess: () => {
      toast.success("Request sent", { transition: Bounce });
      document.getElementById(`modal_${food._id}`).close();
      reset();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, foodStatus }) =>
      fetch(`http://localhost:3000/FoodRequest/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`
         },
        body: JSON.stringify({ foodStatus }),
      }).then((res) => res.json()),

    onSuccess: (response) => {
      if (response.updatedRequest) {
        setStatusMap((prev) => ({
          ...prev,
          [response.updatedRequest._id]: response.updatedRequest.foodStatus,
        }));
        setData((prev) =>
          prev.map((req) =>
            req._id === response.updatedRequest._id
              ? { ...req, foodStatus: response.updatedRequest.foodStatus }
              : req
          )
        );
        toast.success(`Status updated`);
      }
    },
  });

  if (data.length === 0 && !setLoading) {
    return <Loader />;
  }

  const handleSubmitBtn = (formData) => {
    const requestData = {
      Name: user.displayName,
      Email: user.email,
      ImageURL: user.photoURL,
      foodID: food._id,
      foodname: food.foodName,
      foodImage: food.foodImage,
      foodOwnerEmail: food.donatorEmail,
      ContactNumber: formData.ContactNumber,
    };

    addFoodMutation.mutate(requestData);
  };

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, foodStatus: "Donated" });
  };

  const handleReject = (id) => {
    updateStatusMutation.mutate({ id, foodStatus: "Rejected" });
  };

  const filteredRequests = data.filter((req) => req.foodID === food._id);
  const ownerEmail = filteredRequests.map((r) => r.foodOwnerEmail)[0];
  const isDisabled = user.email === food.donatorEmail;

  return (
    <div className="pb-20 p-2">
      <h1 className="text-center font-bold text-white mt-10 mb-8 text-4xl">
        FOOD DETAILS
      </h1>

      {/* Donor Info */}
      <div
        data-aos="flip-right"
        className="hero flex justify-start text-white bg-linear-to-r from-[#DC143C] to-white mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl"
      >
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
      <div
        data-aos="flip-left"
        className="hero flex justify-end text-white bg-linear-to-r from-white to-[#DC143C] mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl"
      >
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
            {!isDisabled && (
              <button
                className="btn bg-[#DC143C] text-white font-bold rounded-xl border-none"
                onClick={() =>
                  document.getElementById(`modal_${food._id}`).showModal()
                }
              >
                Request Food
              </button>
            )}
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
      {food.donatorEmail === user.email && (
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-10">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <h2 className="text-center bg-[#DC143C] text-white py-3 text-lg font-bold">
              Food Requests
            </h2>

            {filteredRequests.length > 0 && ownerEmail === user.email ? (
              <div className="divide-y divide-gray-200">
                {filteredRequests.map((request) => {
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
                        {currentStatus === "Pending" &&
                          ownerEmail === user.email && (
                            <>
                              <button
                                onClick={() => handleAccept(request._id)}
                                className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(request._id)}
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
              <p className="text-center py-5 text-gray-600">
                No requests found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
