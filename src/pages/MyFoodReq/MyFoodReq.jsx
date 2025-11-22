import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import { toast, Bounce } from "react-toastify";

const MyFoodReq = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/myFoodRequests?email=${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        setData(Array.isArray(result) ? result : result.requests || []);
        console.log(result);
        setLoading(false);
      });
  }, [user.email]);

  const handleCancelBtn = async (id) => {
    const res = await fetch(`http://localhost:3000/FoodRequest/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    });
    const result = await res.json();

    if (result.success) {
      setData((prev) => prev.filter((req) => req._id !== id));
      toast.success("Request cancelled successfully", { transition: Bounce });
    } else {
      toast.error("Failed to cancel request", { transition: Bounce });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full md:w-4/5 lg:w-3/4 mx-auto mt-10 px-2 md:px-0 py-5">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <h2 className="text-center bg-[#DC143C] text-white py-3 text-lg md:text-xl font-bold">
          My Food Requests
        </h2>

        {data.length === 0 ? (
          <p className="font-bold text-center p-6 text-gray-700">
            No Requests Found
          </p>
        ) : (
          <div className="divide-y divide-gray-200">
            {data.map((request) => (
              <div
                key={request._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 transition gap-4"
              >
                <div className="flex items-center gap-3 text-left">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={request.foodImage}
                    alt="Profile"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {request.foodname}
                    </div>
                  </div>
                </div>

                <div className="flex mt-2 sm:mt-0">
                  {request.foodStatus === "Donated" && (
                    <span className="px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">
                      Accepted
                    </span>
                  )}
                  {request.foodStatus === "Rejected" && (
                    <span className="px-3 py-1 rounded bg-red-100 text-red-800 font-semibold text-sm">
                      Rejected
                    </span>
                  )}
                  {request.foodStatus === "Pending" && (
                    <button
                      onClick={() => handleCancelBtn(request._id)}
                      className="btn bg-[#DC143C] text-white rounded-xl font-bold px-4 py-2 text-sm sm:text-base hover:bg-red-600"
                    >
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodReq;
