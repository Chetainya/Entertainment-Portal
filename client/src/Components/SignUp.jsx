import React, { useState } from 'react';
import axios from 'axios'
import { useSelector , useDispatch } from 'react-redux';
import {login} from '../Store/authSlice'
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import CustomLink from './CustomLink';





const Signup = () => {
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    profilePicture: null,
  });
  const navigate = useNavigate();
  
  console.log(state)

  const [errors, setErrors] = useState({});
  const [isUploading , setIsUploading] = useState(false);

  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {


    const data = new FormData();
    
    data.append("file" , e.target.files[0]);
    data.append("upload_preset" , "Entertainment_Portal_Profile_Image");
    data.append("cloud_name" , "djh1fz2zr");
    setIsUploading(true);
    const response = await axios.post('https://api.cloudinary.com/v1_1/djh1fz2zr/image/upload' , data );
    console.log(response)
    setIsUploading(false);
    setFormData({
      ...formData,
      profilePicture: response.data.secure_url,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit the form data
      try{
        const response = await axios.post("http://localhost:3000/user/register" , formData , {withCredentials : true}); 
        //navigate to home page after successfull signup
        if(response.data.email){
          dispatch(login(response.data));
          navigate('/')
          
        }
      }catch(err){
        console.log(err);
        if(err.response.data.errors[0].msg = 'User already exists'){
            setErrors({
                ...validationErrors , 
                exists : "User already exists"
            })
        }
      }
      
      
      
    }
  };

  return (
    <div className="flex justify-center  h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg   w-full max-w-md m-4 mb-0"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full p-2 border rounded border-gray-300"
          />
          {isUploading && <p>Uploading...</p>}
        </div>

        {/* <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button> */}
        <Button disabled={isUploading} title="Sign Up" />
        {errors.exists && (
            <p className="text-red-500 text-xs mt-1">{errors.exists}</p>
          )}
      <p className='mt-4'>Already a User : <CustomLink NavigateTo="/login" title="Log In" />  </p>
      </form>
    </div>
  );
};

export default Signup;
