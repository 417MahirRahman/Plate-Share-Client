import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";

const MyFoodReq = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  //console.log(user);
  console.log(data);

  useEffect(() => {
    fetch(`http://localhost:3000/FoodRequest?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [user.email, setLoading]);

  const handleCancleBtn = () => {};

  if (loading) return <Loader></Loader>;

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <h2 className="text-center bg-[#DC143C] text-white py-3 text-lg font-bold">
          Food Requests
        </h2>
        {data.length === 0 ? (
          <p className="font-bold text-center p-4">No Request Found</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {data.map((request) => {
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
                        <h1>{request.Email}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <>
                      <button
                        onClick={() => handleCancleBtn()}
                        className="btn bg-[#DC143C] text-white rounded-xl font-bold"
                      >
                        Cancle Request
                      </button>
                    </>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodReq;
