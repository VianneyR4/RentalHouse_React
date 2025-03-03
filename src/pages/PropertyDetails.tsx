import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Property, Booking } from '../types';
import Navbar from '../components/layout/Navbar';
import residence5Img from '../assets/images/house1.jpg'
import axios from 'axios';

const PropertyDetails = (userDetails: { user: unknown }) => {
  const { state } = useLocation();
  const property = state?.property as Property;

  const images = property?.images ?? [residence5Img];

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [user, setUser] = useState(userDetails.user || null);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state

  if (!property) {
    return <div className="text-center py-10">Property not found.</div>;
  }

  const handleBookingSubmit = async () => {
    if (!checkIn || !checkOut) {
      setBookingError('Please select both check-in and check-out dates.');
      return;
    }
  
    if (checkIn >= checkOut) {
      setBookingError('Check-out date must be after check-in date.');
      return;
    }
  
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (!token) {
      setBookingError('You must be logged in to book a property.');
      return;
    }
  
    setIsSubmitting(true);
    setBookingError(null);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/booking/create/`,
        {
          propertyId: property.id,
          checkIn: checkIn.toISOString(), // Ensure this is an ISO string
          checkOut: checkOut.toISOString(), // Ensure this is an ISO string
          hostId: property.hostId,
        },
        {
          withCredentials: true
        }
      );
  
      if (response.status === 201) {
        alert('Booking created successfully!');
        console.log('Booking created:', response.data);
      } else {
        setBookingError('Failed to create booking. Please try again.');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      if (err.response) {
        setBookingError(err.response.data.error || 'Failed to create booking.');
      } else if (err.request) {
        setBookingError('Network error. Please check your connection.');
      } else {
        setBookingError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar user={userDetails} />

      {/* Property Details Section */}
      <div className="container mx-auto px-4 pt-24 pb-10">
        {/* Property Title and Location */}
        <div className="mb-8 myForm">
          <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600">{property.location}</p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="col-span-2">
            {/* Property Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Left Column: Description and Amenities */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 mb-8">{property.description}</p>

              <h2 className="text-2xl font-bold mb-4">Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-600 mb-2 text-sm text-italic">
                  Type: {property.type} to {property.purpose}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking and Details */}
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Price per night:</span>
                <span className="font-bold">RWF {property.pricePerNight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-bold">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Purpose:</span>
                <span className="font-bold">To {property.purpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beds:</span>
                <span className="font-bold">{property.beds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Baths:</span>
                <span className="font-bold">{property.baths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-bold">{property.size} Sqft</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Book Now</h3>
              <div className="">
                <label className="block text-gray-600 mb-2">Check-In Date</label>
                <div className="input-text w-full mb-5">
                  <DatePicker
                    selected={checkIn}
                    onChange={(date: Date) => setCheckIn(date)}
                    minDate={new Date()}
                    className="input-text-in w-full border p-2"
                    placeholderText="Select check-in date"
                  />
                </div>
                <label className="block text-gray-600 mb-2">Check-Out Date</label>
                <div className="input-text w-full mb-5">
                  <DatePicker
                    selected={checkOut}
                    onChange={(date: Date) => setCheckOut(date)}
                    minDate={checkIn || new Date()}
                    className="input-text-in w-full border p-2"
                    placeholderText="Select check-out date"
                  />
                </div>
                {bookingError && (
                  <p className="text-red-500 text-sm">{bookingError}</p>
                )}
                <button
                  onClick={handleBookingSubmit}
                  disabled={isSubmitting}
                  className="login-btn w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
            <h3 className='text-xl text-white'>LALA Test</h3>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect home.
              </p>
            </div>
            {['Project', 'Company', 'Movement', 'Help'].map((section) => (
              <div key={section}>
                <h5 className="font-semibold mb-4 text-gray-100">{section}</h5>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-gray-400 hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LaLa Test, Inc. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white mx-2">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white mx-2">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetails;