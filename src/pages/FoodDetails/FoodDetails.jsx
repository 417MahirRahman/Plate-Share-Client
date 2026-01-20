import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import Loader from "../../utilities/Loader";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
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
      try {
        const res = await fetch(
          `https://plate-share-server-lilac.vercel.app/availableFoods/${id}`
        );

        if (!res.ok) {
          navigate("/detailsNotFound");
          return;
        }

        const result = await res.json();
        setFoodDetails(result.food);
      } catch (error) {
        navigate("/detailsNotFound");
      } finally {
        setLoading(false);
      }
    };

    loadFoodDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (!foodDetails?._id) return;

    const loadRequests = async () => {
      const res = await fetch(
        `https://plate-share-server-lilac.vercel.app/FoodRequest?foodID=${foodDetails._id}`
      );
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    };

    loadRequests();
  }, [foodDetails]);

  const updateStatus = async (requestId, status) => {
    if (!user) return;

    const res = await fetch(
      `https://plate-share-server-lilac.vercel.app/FoodRequest/${requestId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodStatus: status }),
      }
    );

    const result = await res.json();

    if (result?.updatedRequest) {
      setStatusMap((prev) => ({
        ...prev,
        [requestId]: status,
      }));

      setData((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, foodStatus: status } : req
        )
      );

      toast.success("Status updated!");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!foodDetails) {
    return null;
  }

  const handleSubmitBtn = async (formData) => {
    if (!user) {
      toast.error("You must be logged in to request food");
      navigate("/login", { state: { from: `/food/${id}` } });
      return;
    }

    const requestData = {
      Name: user.displayName,
      Email: user.email,
      ImageURL: user.photoURL,
      foodID: foodDetails._id,
      foodname: foodDetails.foodName,
      foodImage: foodDetails.foodImage,
      foodOwnerEmail: foodDetails.donatorEmail,
      ContactNumber: formData.ContactNumber,
      foodStatus: "Pending",
    };

    const res = await fetch(
      "https://plate-share-server-lilac.vercel.app/FoodRequest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );

    const result = await res.json();

    if (result?.success) {
      toast.success("Request sent", { transition: Bounce });
      document.getElementById(`modal_${foodDetails._id}`)?.close();
      reset();
      setData((prev) => [...prev, result.request]);
    } else {
      toast.error("Failed to send request");
    }
  };

  const filteredRequests = data.filter(
    (req) => req.foodID === foodDetails._id
  );

  const isOwner = user?.email === foodDetails.donatorEmail;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <h1 className="text-center font-bold text-[#DC143C] mt-10 mb-8 text-4xl">
        FOOD DETAILS
      </h1>

      <div className="bg-linear-to-r from-[#DC143C] to-[#F7CAC9] p-6 rounded-xl mb-8">
        <div className="flex items-center gap-6">
          <img
            src={foodDetails.donatorImage}
            className="w-24 h-24 rounded-full"
            alt={foodDetails.donatorName}
          />
          <div className="text-white">
            <h1 className="text-2xl font-bold">
              {foodDetails.donatorName}
            </h1>
            <p>{foodDetails.donatorEmail}</p>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-[#F7CAC9] to-[#DC143C] p-6 rounded-xl mb-8">
        <div className="flex gap-6 items-center">
          <img
            src={foodDetails.foodImage}
            className="w-32 h-32 rounded-lg"
            alt={foodDetails.foodName}
          />
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">
              {foodDetails.foodName}
            </h2>
            <p>Quantity: {foodDetails.quantity}</p>
            <p>Expire Date: {foodDetails.expireDate}</p>
            <p>Pickup Location: {foodDetails.pickupLocation}</p>

            {!isOwner && (
              <button
                onClick={() => {
                  if (!user) {
                    toast.info("Please login to request food");
                    navigate("/login", {
                      state: { from: `/food/${id}` },
                    });
                  } else {
                    document
                      .getElementById(`modal_${foodDetails._id}`)
                      .showModal();
                  }
                }}
                className="mt-4 bg-white text-[#DC143C] font-bold py-2 px-6 rounded-lg"
              >
                Request Food
              </button>
            )}
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="bg-white rounded-xl shadow">
          <h2 className="bg-[#DC143C] text-white text-center py-3 font-bold">
            Food Requests
          </h2>

          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => {
              const currentStatus =
                statusMap[req._id] || req.foodStatus;

              return (
                <div
                  key={req._id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={req.ImageURL}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <span>{req.Name}</span>
                  </div>

                  <div className="flex gap-2">
                    {currentStatus === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(req._id, "Donated")
                          }
                          className="btn btn-sm bg-green-500 text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(req._id, "Rejected")
                          }
                          className="btn btn-sm bg-red-500 text-white"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="font-semibold">
                        {currentStatus}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-5">No Requests Found</p>
          )}
        </div>
      )}

      <dialog id={`modal_${foodDetails._id}`} className="modal">
        <form
          onSubmit={handleSubmit(handleSubmitBtn)}
          className="modal-box"
        >
          <h3 className="font-bold text-lg mb-4 text-center">
            Request Food
          </h3>

          <label className="label">Contact Number</label>
          <input
            {...register("ContactNumber", {
              required: "Contact Number is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.ContactNumber && (
            <p className="text-red-500 text-sm">
              {errors.ContactNumber.message}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn bg-[#DC143C] text-white">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                document
                  .getElementById(`modal_${foodDetails._id}`)
                  .close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default FoodDetails;
