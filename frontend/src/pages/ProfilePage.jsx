import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const {updateUserProfile,user}=useContext(UserContext)
  const [selectedImage, setSelectedImage] = useState("")

  const handleImageUpload=(e)=>{
     const file=e.target.files[0];
     if(!file)
     {
       toast.error("Image upload fail")
       return;
     }
     const reader=new FileReader();
     reader.readAsDataURL(file);

     reader.onloadend=async()=>{
      const image=reader.result;
       setSelectedImage(image)
       await updateUserProfile({profilePicture: image});
     }
  }
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-4">Edit Profile</h2>
      <div className="flex flex-col items-center w-full">
        <div  className="flex flex-col gap-2 items-center w-full p-6">
          <label htmlFor="profile" className="relative">
            <img
              src={selectedImage || user?.profilePicture  || "/avatar.png"} // Replace with actual profile image URL
              alt="Profile"
              className="w-28 h-28 rounded-full mb-4"
            />
            <div className="absolute bottom-5 right-3 bg-yellow-500 text-white w-6 h-6 flex items-center justify-center rounded-full">
              +
            </div>
            <input type="file" onChange={handleImageUpload} id="profile" className="hidden" />
          </label>
          <label htmlFor="username" className="text-md  w-full">Username</label>
          <p id="name" className="border border-gray-400 px-2 py-1 rounded outline-yellow-400 w-full" />
          <label htmlFor="email" className="text-md  w-full">email</label>
          <p id="email"  className="border border-gray-400 px-2 py-1 rounded outline-yellow-400 w-full" />
          <button className="px-4 py-2 bg-gray-950 text-white w-full rounded cursor-pointer hover:bg-gray-800">Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
