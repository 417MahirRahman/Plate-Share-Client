import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const MyFoods = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
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
    <div className="mb-20">
      <h1 className="text-center font-bold text-red-500 my-10 text-5xl">
        My Foods
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((food) => (
          <div key={food._id}>
            <div className="card bg-base-100 w-full lg:w-11/12 lg:mx-auto shadow-lg hover:shadow-2xl">
              <figure className="p-7">
                <img
                  src={food.foodImage}
                  className="w-full h-[150px] lg:h-[250px] rounded-4xl"
                  alt=""
                />
              </figure>

              <div className="card-body px-10 mt-5">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                      <img src={food.donatorImage} alt="" />
                    </div>
                  </div>
                  <h1 className="font-bold text-xl">{food.donatorName}</h1>
                </div>
                <h2 className="card-title font-bold text-lg">
                  {food.foodName}
                </h2>
                <h2 className="font-bold text-sm">Quantity: {food.quantity}</h2>
                <h2 className="font-bold text-sm">
                  Expire Date: {food.expireDate}
                </h2>
                <h2 className="font-bold text-sm">
                  Pickup Location: {food.pickupLocation}
                </h2>

                <div className="card-actions gap-5 mt-4">
                  <Link
                    to={`/availableFoods/${food._id}`}
                    className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                  >
                    View Details
                  </Link>

                  <button
                    className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                    onClick={() => openModal(food)}
                  >
                    Update
                  </button>

                  <button
                    className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                    onClick={() => handleDeleteBtn(food._id)}
                  >
                    Delete
                  </button>
                </div>

                {/* Modal */}
                {selectedFood && (
                  <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={() => setSelectedFood(null)}
                  >
                    <div
                      className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="text-2xl font-bold mb-4 text-center">
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
                          className="input input-bordered w-full"
                        />

                        <input
                          readOnly
                          value={user.email}
                          className="input input-bordered w-full"
                        />

                        <input
                          {...register("foodName", { required: true })}
                          className="input input-bordered w-full"
                          placeholder="Food Name"
                        />

                        <input
                          {...register("foodImage", { required: true })}
                          className="input input-bordered w-full"
                          placeholder="Food Image URL"
                        />

                        <input
                          {...register("quantity", { required: true })}
                          className="input input-bordered w-full"
                          type="number"
                          placeholder="Quantity"
                        />

                        <input
                          {...register("pickupLocation", { required: true })}
                          className="input input-bordered w-full"
                          placeholder="Pickup Location"
                        />

                        <input
                          {...register("expireDate", { required: true })}
                          type="date"
                          className="input input-bordered w-full"
                        />

                        <textarea
                          {...register("additionalNote")}
                          className="textarea textarea-bordered w-full"
                          placeholder="Additional Notes"
                        />

                        <div className="flex justify-between pt-3">
                          <button
                            type="submit"
                            className="btn bg-[#DC143C] text-white w-1/2 mr-2"
                          >
                            Update
                          </button>

                          <button
                            type="button"
                            className="btn w-1/2"
                            onClick={() => {
                              setSelectedFood(null);
                              window.location.reload();
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
