import React, { useState } from 'react';

const CloudinaryUploadWidget = ({getUrl}) => {
  const [imageUrl, setImageUrl] = useState('');
  

  const handleUpload = () => {
   
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'djh1fz2zr', // Replace with your Cloudinary cloud name
        uploadPreset: 'Entertainment_Portal_Profile_Image', // Replace with your upload preset
        resourceType: 'auto',
        clientAllowedFormats: ['image', 'video', 'pdf'],
       
      },

      (error, result) => {
        console.log(error)
        if (!error && result && result.event === 'success') {
         
          setImageUrl(result.info.secure_url);
          getUrl(result.info.secure_url)
        }
      }
    );

    widget.open(); // Open the upload widget
   
  };

  return (
    <div className="flex flex-col w-full h-40 mt-5 items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>

      <button type='button'
        onClick={handleUpload}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload Video
      </button>

      
    </div>
  );
};

export default CloudinaryUploadWidget;
