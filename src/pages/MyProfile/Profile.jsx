import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const Profile = () => {
  const { auth, user } = useContext(AuthContext);
  const person = auth.currentUser;

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async () => {
    if (!person) return;
    
    await updateProfile(person, {
      displayName: newName,
      photoURL: newPhoto,
    })
      .then(() => {
        toast.success("Profile Updated Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        toast.warn("Invalid Image URL", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#DC143C] to-[#F7CAC9] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center font-bold text-3xl md:text-4xl mb-12 text-white">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                <img 
                  src={user?.photoURL || "https://placehold.co/300x300/F7CAC9/DC143C?text=Profile"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#DC143C] mb-2">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-600 text-lg mb-6">{user?.email}</p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#DC143C] hover:bg-[#B81030] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md">
              <h2 className="text-xl md:text-2xl font-bold text-center text-[#DC143C] mb-6">
                Update Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name:
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL:
                  </label>
                  <input
                    type="text"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-[#DC143C] hover:bg-[#B81030] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
