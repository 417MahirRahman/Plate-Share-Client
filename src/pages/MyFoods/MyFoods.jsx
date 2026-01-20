import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    fetch(`https://plate-share-server-lilac.vercel.app/myFood?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [user.email, setLoading]);

  if (loading) return <Loader />;

  const openModal = (food) => {
    setSelectedFood(food);
    setValue("foodName", food.foodName);
    setValue("foodImage", food.foodImage);
    setValue("quantity", food.quantity);
    setValue("pickupLocation", food.pickupLocation);
    setValue("expireDate", food.expireDate);
    setValue("additionalNote", food.additionalNote);

    document.getElementById(`modal_${food._id}`).showModal();
  };

  const handleUpdateBtn = (id, formData) => {
    fetch(`https://plate-share-server-lilac.vercel.app/availableFoods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedFood) => {
        setData((prevData) =>
          prevData.map((food) =>
            food._id === id ? { ...food, ...updatedFood } : food
          )
        );

        Swal.fire({
          title: "Updated!",
          text: "Food details updated successfully.",
          icon: "success",
        });
        document.getElementById(`modal_${id}`).close();
        reset();
        setSelectedFood(null);
      });
  };

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-lilac.vercel.app/availableFoods/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            setData((prev) => prev.filter((food) => food._id !== id));
            Swal.fire("Deleted!", "Food has been removed.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-center font-bold text-[#DC143C] my-8 text-3xl md:text-4xl">
        My Foods
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {data.map((food) => (
          <div key={food._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <figure className="p-3">
              <img
                src={food.foodImage}
                className="w-full h-[140px] object-cover rounded-md"
                alt={food.foodName}
              />
            </figure>
            <div className="card-body px-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#DC143C]">
                    <img 
                      src={food.donatorImage} 
                      alt={food.donatorName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 text-sm">{food.donatorName}</h3>
              </div>
              <h2 className="font-bold text-gray-900 mb-2 text-base">{food.foodName}</h2>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex justify-between">
                  <span className="font-medium">Quantity:</span>
                  <span>{food.quantity}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Expire:</span>
                  <span>{food.expireDate}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{food.pickupLocation}</span>
                </p>
              </div>
              <div className="card-actions mt-3 flex flex-col sm:flex-row gap-2">
                <Link
                  to={`/availableFoods/${food._id}`}
                  className="w-full bg-[#DC143C] text-white font-medium py-2 rounded-md hover:bg-[#b81232] transition-colors duration-200 text-center text-sm"
                >
                  View Details
                </Link>
                <button
                  className="w-full bg-[#DC143C] text-white font-medium py-2 rounded-md hover:bg-[#b81232] transition-colors duration-200 text-center text-sm"
                  onClick={() => openModal(food)}
                >
                  Update
                </button>
                <button
                  className="w-full bg-[#DC143C] text-white font-medium py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-center text-sm"
                  onClick={() => handleDeleteBtn(food._id)}
                >
                  Delete
                </button>
              </div>

              {/* Modal */}
              {selectedFood && selectedFood._id === food._id && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
                  onClick={() => setSelectedFood(null)}
                >
                  <div
                    className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                      Update Food
                    </h3>

                    <form
                      onSubmit={handleSubmit((formData) =>
                        handleUpdateBtn(selectedFood._id, formData)
                      )}
                      className="space-y-3"
                    >
                      <input
                        readOnly
                        value={user.displayName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />

                      <input
                        readOnly
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />

                      <input
                        {...register("foodName", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                        placeholder="Food Name"
                      />

                      <input
                        {...register("foodImage", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                        placeholder="Food Image URL"
                      />

                      <input
                        {...register("quantity", { required: true })}
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                        placeholder="Quantity"
                      />

                      <input
                        {...register("pickupLocation", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                        placeholder="Pickup Location"
                      />

                      <input
                        {...register("expireDate", { required: true })}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                      />

                      <textarea
                        {...register("additionalNote")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent"
                        placeholder="Additional Notes"
                        rows="3"
                      />

                      <div className="flex justify-between pt-3 gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-[#DC143C] text-white py-2 rounded-lg hover:bg-[#b81232] transition-colors"
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                          onClick={() => {
                            setSelectedFood(null);
                            reset();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
