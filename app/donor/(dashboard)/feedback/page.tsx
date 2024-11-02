"use client";
import React, { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    easeOfNavigation: 3,
    profileUpdate: 3,
    campRegistration: 3,
    design: 3,
    recommend: "maybe",
    feedback: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">BloodLine Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contact">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Rating Scales */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Ease of Navigation</label>
            <input
              type="range"
              name="easeOfNavigation"
              min="1"
              max="5"
              value={formData.easeOfNavigation}
              onChange={handleChange}
              className="w-full"
            />
            <span>{formData.easeOfNavigation}</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Profile Update Experience</label>
            <input
              type="range"
              name="profileUpdate"
              min="1"
              max="5"
              value={formData.profileUpdate}
              onChange={handleChange}
              className="w-full"
            />
            <span>{formData.profileUpdate}</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Camp Registration Experience</label>
            <input
              type="range"
              name="campRegistration"
              min="1"
              max="5"
              value={formData.campRegistration}
              onChange={handleChange}
              className="w-full"
            />
            <span>{formData.campRegistration}</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Website Design</label>
            <input
              type="range"
              name="design"
              min="1"
              max="5"
              value={formData.design}
              onChange={handleChange}
              className="w-full"
            />
            <span>{formData.design}</span>
          </div>

          {/* Recommend the Site */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Would you recommend this website?</label>
            <select
              name="recommend"
              value={formData.recommend}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="feedback">
              Any other feedback?
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
