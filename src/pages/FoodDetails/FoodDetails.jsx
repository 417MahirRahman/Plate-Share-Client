import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import Loader from "../../utilities/Loader";

const FoodDetails = () => {
  const { id } = useParams();
  const { user, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [foodDetails, setFoodDetails] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadFoodDetails = async () => {
      const res = await fetch(`https://plate-share-server-lilac.vercel.app/availableFoods/${id}`);
      if (!res.ok) {
        navigate("/detailsNotFound");
        return;
      }
      const result = await res.json();
      setFoodDetails(result.food);
      setLoading(false);
      console.log("food:", result.food);
    };

    loadFoodDetails();
  }, [id, setLoading, navigate]);

  useEffect(() => {
    if (!foodDetails) return;
    const loadRequests = async () => {
      const res = await fetch(
        `https://plate-share-server-lilac.vercel.app/FoodRequest?foodID=${foodDetails._id}`
      );
      const result = await res.json();
      setData(result);
      setLoading(false);
    };
    loadRequests();
  }, [foodDetails, setLoading]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`https://plate-share-server-lilac.vercel.app/FoodRequest/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodStatus: status }),
    });

    const result = await res.json();

    if (result.updatedRequest) {
      setStatusMap((prev) => ({
        ...prev,
        [result.updatedRequest._id]: result.updatedRequest.foodStatus,
      }));

      setData((prev) =>
        prev.map((req) =>
          req._id === result.updatedRequest._id
            ? { ...req, foodStatus: result.updatedRequest.foodStatus }
            : req
        )
      );

      toast.success("Status updated!");
    }
  };

  if (!foodDetails || !Array.isArray(data)) {
    return <Loader />;
  }

  const handleSubmitBtn = async (formData) => {
    const requestData = {
      Name: user.displayName,
      Email: user.email,
      ImageURL: user.photoURL,
      foodID: foodDetails._id,
      foodname: foodDetails.foodName,
      foodImage: foodDetails.foodImage,
      foodOwnerEmail: foodDetails.donatorEmail,
      ContactNumber: formData.ContactNumber,
    };

    const res = await fetch("https://plate-share-server-lilac.vercel.app/FoodRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await res.json();

    if (result.success) {
      toast.success("Request sent", { transition: Bounce });
      if (foodDetails?._id) {
        document.getElementById(`modal_${foodDetails._id}`).close();
      }
      reset();

      setData((prev) => [...prev, result.request]);
    } else {
      toast.error("Failed to send request");
    }
  };

  const handleAccept = (id) => updateStatus(id, "Donated");
  const handleReject = (id) => updateStatus(id, "Rejected");

  const filteredRequests =
    Array.isArray(data) && foodDetails
      ? data.filter((req) => req?.foodID === foodDetails._id)
      : [];
  const ownerEmail = filteredRequests.map((r) => r.foodOwnerEmail)[0];
  const isDisabled = user.email === foodDetails.donatorEmail;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h1 className="text-center font-bold text-[#DC143C] mt-10 mb-8 text-3xl md:text-4xl">
        FOOD DETAILS
      </h1>

      {/* Donor Info */}
      <div className="bg-linear-to-r from-[#DC143C] to-[#F7CAC9] p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={foodDetails.donatorImage}
            className="w-24 h-24 rounded-full shadow-lg object-cover"
            alt={foodDetails.donatorName}
          />
          <div className="text-white text-center md:text-left">
            <h1 className="text-2xl font-bold">{foodDetails.donatorName}</h1>
            <h2 className="text-lg font-medium">{foodDetails.donatorEmail}</h2>
          </div>
        </div>
      </div>

      {/* Food Info */}
      <div className="bg-linear-to-r from-[#F7CAC9] to-[#DC143C] p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row-reverse items-center gap-6">
          <img
            src={foodDetails.foodImage}
            className="w-32 h-32 rounded-lg shadow-lg object-cover"
            alt={foodDetails.foodName}
          />
          <div className="text-white text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{foodDetails.foodName}</h1>
            <div className="space-y-2 text-sm md:text-base">
              <p><span className="font-semibold">Quantity:</span> {foodDetails.quantity}</p>
              <p><span className="font-semibold">Expire Date:</span> {foodDetails.expireDate}</p>
              <p><span className="font-semibold">Pickup Location:</span> {foodDetails.pickupLocation}</p>
              <p className="mt-2">{foodDetails.additionalNote}</p>
            </div>
            {!isDisabled && (
              <button
                className="mt-4 bg-white text-[#DC143C] font-bold py-2 px-6 rounded-lg hover:bg-[#DC143C] hover:text-white hover:cursor-pointer transition-colors"
                onClick={() =>
                  document.getElementById(`modal_${foodDetails._id}`).showModal()
                }
              >
                Request Food
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id={`modal_${foodDetails?._id}`} className="modal">
        <form
          onSubmit={handleSubmit(handleSubmitBtn)}
          className="modal-box bg-white text-gray-800"
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
            <p className="text-red-500 text-sm">{errors.Location.message}</p>
          )}

          <label className="label mt-3">Why Need Food?</label>
          <textarea
            {...register("WhyNeedFood")}
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>

          <label className="label mt-3">Contact Number</label>
          <input
            {...register("ContactNumber", {
              required: "Contact Number is required",
            })}
            type="text"
            className="input input-bordered w-full"
            placeholder="01****"
          />
          {errors.ContactNumber && (
            <p className="text-red-500 text-sm">{errors.ContactNumber.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn bg-[#DC143C] text-white">Submit</button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                document.getElementById(`modal_${foodDetails._id}`).close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* Food Requests Table */}
      {foodDetails.donatorEmail === user.email && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
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
                    className="flex flex-col sm:flex-row items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#DC143C]"
                        src={request.ImageURL}
                        alt="Profile"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">
                          {request.Name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Requested: {foodDetails.foodName}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
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
              No Requests Found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
