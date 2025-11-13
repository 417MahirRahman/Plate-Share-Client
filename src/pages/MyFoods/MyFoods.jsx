import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const MyFoods = () => {
  const { user, loading, setLoading } = use(AuthContext);
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:3000/myFood?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, [user.email, setLoading]);

  if (loading) {
    return <Loader></Loader>;
  }

  const handleUpdateBtn = (id, formData) => {
    fetch(`http://localhost:3000/availableFoods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedFood) => {
        console.log("Updated food:", updatedFood);
        setData((prevData) =>
          prevData.map((food) =>
            food._id === id ? { ...food, ...updatedFood } : food
          )
        );
        Swal.fire({
          title: "Updated!",
          text: "Food details have been updated successfully.",
          icon: "success",
        });
        document.getElementById(`modal_${id}`).close();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating.",
          icon: "error",
        });
      });
  };

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/availableFoods/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setData((prev) => prev.filter((food) => food._id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <h1>My Foods</h1>
      <div className="grid grid-cols-3 gap-5">
        {data.map((food) => (
          <div key={food._id}>
            <div className="card bg-base-100 w-full shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                      <img src={user.PhotoURL} />
                    </div>
                  </div>
                  <h1>{user.displayName}</h1>
                </div>
                <h2 className="card-title">{food.foodName}</h2>
                <h2>Quantity: {food.quantity}</h2>
                <h2>Expire Date: {food.expireDate}</h2>
                <h2>Pickup Location: {food.pickupLocation}</h2>
                <div className="card-actions gap-5">
                  <Link
                    to={`/availableFoods/${food._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById(`modal_${food._id}`).showModal()
                    }
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteBtn(food._id);
                    }}
                    className="btn"
                  >
                    Delete
                  </button>

                  {/* modal */}
                  {
                    <dialog id={`modal_${food._id}`} className="modal">
                      <form onSubmit={handleSubmit((formData) => handleUpdateBtn(food._id, formData))}>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                          <label className="label">Donator Name</label>
                          <input
                            type="text"
                            className="input border-2 border-black"
                            defaultValue={user.displayName}
                          />

                          <label className="label">Email</label>
                          <input
                            type="text"
                            className="input border-2 border-black"
                            defaultValue={user.email}
                          />

                          <label className="label">Food Name</label>
                          <input
                            {...register("foodName", {
                              required: "Food name is required",
                            })}
                            type="text"
                            className="input"
                            placeholder="Food-Name"
                            defaultValue={food.foodName}
                          />
                          {errors.foodname && (
                            <p className="text-red-500 text-sm">
                              {errors.foodname.message}
                            </p>
                          )}

                          <label className="label">Food Image</label>
                          <input
                            {...register("foodImage", {
                              required: "Image URL is required",
                            })}
                            type="text"
                            className="input"
                            placeholder="Image-URL"
                            defaultValue={food.foodImage}
                          />
                          {errors.foodImage && (
                            <p className="text-red-500 text-sm">
                              {errors.foodImage.message}
                            </p>
                          )}

                          <label className="label">Food Quantity</label>
                          <input
                            {...register("quantity", {
                              required: "Quantity is required",
                            })}
                            type="number"
                            className="input"
                            placeholder="Quantity"
                            defaultValue={food.quantity}
                          />
                          {errors.quantity && (
                            <p className="text-red-500 text-sm">
                              {errors.quantity.message}
                            </p>
                          )}

                          <label className="label">Food Status</label>
                          <input
                            type="text"
                            className="input"
                            defaultValue={"Available"}
                          />

                          <label className="label">Pickup Location</label>
                          <input
                            {...register("pickupLocation", {
                              required: "Pickup location is required",
                            })}
                            type="text"
                            className="input"
                            placeholder="#Road-9"
                            defaultValue={food.pickupLocation}
                          />
                          {errors.pickupLocation && (
                            <p className="text-red-500 text-sm">
                              {errors.pickupLocation.message}
                            </p>
                          )}

                          <label className="label">Expire Date</label>
                          <input
                            {...register("expireDate", {
                              required: "Expire date is required",
                            })}
                            type="date"
                            defaultValue={food.expireDate}
                          />
                          {errors.expireDate && (
                            <p className="text-red-500 text-sm">
                              {errors.expireDate.message}
                            </p>
                          )}

                          <label className="label">Additional Notes</label>
                          <textarea
                            {...register("additionalNote")}
                            className="textarea"
                            placeholder="Type here..."
                            defaultValue={food.additionalNote}
                          ></textarea>

                          <button className="btn">Update Info</button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              document
                                .getElementById(`modal_${food._id}`)
                                .close()
                            }
                          >
                            Close
                          </button>
                        </fieldset>
                      </form>
                    </dialog>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
