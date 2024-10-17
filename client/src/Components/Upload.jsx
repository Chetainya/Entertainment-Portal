import React, { useState } from "react";
import axios from "axios";
import CloudinaryUploadWidget from './UploadWidget'
import { useNavigate } from "react-router-dom";

const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail , setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  function getUrl(url){
    setUploading(true);
    setVideoFile(url);
    setUploading(false);
  }

  const handleFileChange = async (e) => {


    const data = new FormData();
    
    data.append("file" , e.target.files[0]);
    data.append("upload_preset" , "Entertainment_Portal_Profile_Image");
    data.append("cloud_name" , "djh1fz2zr");
    setUploading(true);
    const response = await axios.post('https://api.cloudinary.com/v1_1/djh1fz2zr/image/upload'  , data );
    console.log(response)
    setUploading(false);
    setThumbnail(response.data.secure_url);
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !videoFile) {
      alert("Please fill out all fields and select a video to upload.");
      return;
    }

    setUploading(true);

    // Create form data for the video upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", videoFile);
    formData.append("thumbnail" , thumbnail)
    formData.append("series" , null);

    try {
     console.log(formData)
      // Send the video data to the backend
      const response = await axios.post("http://localhost:3000/upload/video", {
        title : title,
        description : description,
        url : videoFile,
        thumbnail : thumbnail,
        series : "null"
      } , {
        withCredentials : true
      });

      if(response.data.url){
        console.log(response.data.url);
        //navigate to admin dashboard
        navigate(`/video/${response.data._id}/analytics` , {
          state : response.data
        })

      }else{
        console.log(response)
      }

      
      setUploading(false);
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploading(false);
      alert("Error uploading video");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload a Video</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            Select a Video
          </label>
          <button type="button" disabled={videoFile} required  className={`w-full bg-blue-500 text-white py-2 rounded-lg ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`} onClick={() => setUploading(true)}>{!videoFile ? "Upload" : "Uploaded"}</button>
          {uploading && <CloudinaryUploadWidget getUrl={getUrl} />}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={uploading}
        >
            Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;

{
  /* <button onClick={() => setIsUploading(true)}>Upload</button>
{isUploading && <CloudinaryUploadWidget getUrl={getUrl} />} */
}
