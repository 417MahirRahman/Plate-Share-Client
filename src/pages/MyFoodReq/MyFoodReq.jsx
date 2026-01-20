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
    fetch(`https://plate-share-server-lilac.vercel.app/myFoodRequests?email=${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        setData(Array.isArray(result) ? result : result.requests || []);
        console.log(result);
        setLoading(false);
      });
  }, [user.email]);

  const handleCancelBtn = async (id) => {
    const res = await fetch(`https://plate-share-server-lilac.vercel.app/FoodRequest/${id}`, {
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-center text-[#DC143C] font-bold text-3xl md:text-4xl mb-8">
        My Food Requests
      </h2>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {data.length === 0 ? (
          <p className="font-bold text-center p-8 text-gray-700 text-lg">
            No Requests Found
          </p>
        ) : (
          <div className="divide-y divide-gray-200">
            {data.map((request) => (
              <div
                key={request._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4"
              >
                <div className="flex items-center gap-3 text-left">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#DC143C]"
                    src={request.foodImage}
                    alt={request.foodname}
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-base">
                      {request.foodname}
                    </div>
                    <div className="text-sm text-gray-600">
                      Requested by: {request.Name}
                    </div>
                  </div>
                </div>

                <div className="flex mt-2 sm:mt-0">
                  {request.foodStatus === "Donated" && (
                    <span className="px-3 py-1.5 rounded bg-green-100 text-green-800 font-semibold text-sm">
                      Accepted
                    </span>
                  )}
                  {request.foodStatus === "Rejected" && (
                    <span className="px-3 py-1.5 rounded bg-red-100 text-red-800 font-semibold text-sm">
                      Rejected
                    </span>
                  )}
                  {request.foodStatus === "Pending" && (
                    <button
                      onClick={() => handleCancelBtn(request._id)}
                      className="bg-[#DC143C] text-white font-medium px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm"
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
