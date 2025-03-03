import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Property, Booking } from '../types'; // Ensure Booking type is defined
import Navbar from '../components/layout/Navbar';
import logoImg from '../assets/images/logo.png';
import axios from 'axios';

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="dialog-add-property bg-white p-6 rounded-lg w-80">
        {children}
      </div>
    </div>
  );
};

const PropertyManagement = (userDetails: { user: unknown }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]); // State for bookings
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'properties' | 'bookings'>('properties'); // State for active tab

  // Fetch properties
  const handleGetProperty = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/properties/all/`
      );

      if (response.data) {
        setProperties(response.data);
      } else {
        setError(response.data.error || "Something went wrong!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to fetch properties.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings
  const handleGetBookings = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/booking/mine/`,
        {withCredentials: true}
      );

      if (response.data) {
        console.log("Booking Data: ", response.data);
        setBookings(response.data);
      } else {
        setError(response.data.error || "Something went wrong!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to fetch bookings.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/booking/confirm/${bookingId}`,
        {},
        { withCredentials: true }
      );
  
      if (response.data) {
        // Update the booking status in the state
        setBookings(bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
        ));
      } else {
        setError(response.data.error || "Failed to confirm booking.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to confirm booking.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelBooking = async (bookingId) => {
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/booking/cancel/${bookingId}`,
        {},
        { withCredentials: true }
      );
  
      if (response.data) {
        // Update the booking status in the state
        setBookings(bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'canceled' } : booking
        ));
      } else {
        setError(response.data.error || "Failed to cancel booking.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to cancel booking.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId: number) => {
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/property/delete/${propertyId}`,
        { withCredentials: true }
      );
  
      if (response.data) {
        setProperties(properties.filter(property => property.id !== propertyId));
      } else {
        setError(response.data.error || "Failed to delete property.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to delete property.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'properties') {
      handleGetProperty();
    } else {
      handleGetBookings();
    }
  }, [activeTab]);

  const AddPropertyDialog = ({ open, onClose, onAddProperty, onUpdateProperty, property }) => {
    const [newProperty, setNewProperty] = useState<Partial<Property>>(property || {});

    // Update the form fields when the `property` prop changes
    useEffect(() => {
      if (property) {
        setNewProperty(property);
      } else {
        setNewProperty({}); // Reset the form for adding a new property
      }
    }, [property]);

    const handleSubmit = async () => {
      setLoading(true);
      setError('');

      try {
        if (property) {
          const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}/api/v1/property/update/${property.id}`,
            newProperty,
            { withCredentials: true }
          );

          if (response.data) {
            onUpdateProperty(response.data); 
          } else {
            setError(response.data.error || "Failed to update property.");
          }
        } else {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/property/create/`,
            newProperty,
            { withCredentials: true }
          );

          if (response.data) {
            onAddProperty(response.data); 
          } else {
            setError(response.data.error || "Failed to create property.");
          }
        }

        onClose();
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || "Failed to process request.");
        } else if (err.request) {
          setError("Network error. Please check your connection.");
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{property ? 'Edit Property' : 'Add New Property'}</h2>
          <button onClick={onClose} className="text-gray-600">&times;</button>
        </div>
        <form className="mt-4 myForm">
          <label className="block mb-0 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={newProperty.title || ''}
            onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <div className='flex gap-10'>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Beds</label>
              <input
                type="number"
                placeholder="Beds"
                value={newProperty.beds || ''}
                onChange={(e) => setNewProperty({ ...newProperty, beds: Number(e.target.value) })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Baths</label>
              <input
                type="number"
                placeholder="Baths"
                value={newProperty.baths || ''}
                onChange={(e) => setNewProperty({ ...newProperty, baths: Number(e.target.value) })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Size</label>
              <input
                type="text"
                placeholder="Size (e.g., 1200 Sqft)"
                value={newProperty.size || ''}
                onChange={(e) => setNewProperty({ ...newProperty, size: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Price Per Night</label>
              <input
                type="number"
                placeholder="Price Per Night"
                value={newProperty.pricePerNight || ''}
                onChange={(e) => setNewProperty({ ...newProperty, pricePerNight: Number(e.target.value) })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Purpose</label>
              <select
                value={newProperty.purpose || ''}
                onChange={(e) => setNewProperty({ ...newProperty, purpose: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Purpose</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div className='w-full'>
              <label className="block mt-2 mb-0 text-gray-700">Type</label>
              <select
                value={newProperty.type || ''}
                onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
          <label className="block mt-2 mb-0 text-gray-700">Location</label>
          <input
            type="text"
            placeholder="Location"
            value={newProperty.location || ''}
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <label className="block mt-2 mb-0 text-gray-700">Description</label>
          <textarea
            placeholder="Description"
            value={newProperty.description || ''}
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            className="login-btn w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (property ? 'Updating...' : 'Adding...') : (property ? 'Update Property' : 'Add Property')}
          </button>
        </form>
      </Dialog>
    );
  };


  const handleAddProperty = (newProperty: Property) => {
    setProperties([...properties, newProperty]);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(properties.map(property =>
      property.id === updatedProperty.id ? updatedProperty : property
    ));
  };

  // const handleDeleteProperty = (id: number) => {
  //   setProperties(properties.filter(property => property.id !== id));
  // };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsAddPropertyOpen(true);
  };

  const handleAddPropertyRole = () => {
    setSelectedProperty(null);
    setIsAddPropertyOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const calculateDays = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDifference = endDate - startDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <div>
      <Navbar user={userDetails} />

      <div className="container pt-40 mx-auto px-4 py-10">
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setActiveTab('properties')}
            className={`login-btn px-6 py-2 rounded transition-all ${
              activeTab === 'properties'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Property Management
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`login-btn px-6 py-2 rounded transition-all ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Booking Management
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'properties' ? (
          <>
            <h2 className="text-5xl font-bold mb-10">Property Management</h2>
            <button
              onClick={handleAddPropertyRole}
              className="login-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              Add New Property
            </button>

            <AddPropertyDialog
              open={isAddPropertyOpen}
              onClose={() => setIsAddPropertyOpen(false)}
              onAddProperty={handleAddProperty}
              onUpdateProperty={handleUpdateProperty}
              property={selectedProperty}
            />

            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-3 py-1 table-th">ID</th>
                  <th className="border px-3 py-1 table-th">Title</th>
                  <th className="border px-3 py-1 table-th">Description</th>
                  <th className="border px-3 py-1 table-th">Beds</th>
                  <th className="border px-3 py-1 table-th">Baths</th>
                  <th className="border px-3 py-1 table-th">Size</th>
                  <th className="border px-3 py-1 table-th">Price Per Night</th>
                  <th className="border px-3 py-1 table-th">Location</th>
                  <th className="border px-3 py-1 table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td className="border px-3 py-1 table-td">{property.id}</td>
                    <td className="border px-3 py-1 table-td">
                      {property.title.length > 15
                        ? `${property.title.slice(0, 15)}...`
                        : property.title
                      }
                    </td>
                    <td className="border px-3 py-1 table-td">
                      {property.description.length > 50
                        ? `${property.description.slice(0, 50)}...`
                        : property.description
                      }
                    </td>
                    <td className="border px-3 py-1 table-td">{property.beds}</td>
                    <td className="border px-3 py-1 table-td">{property.baths}</td>
                    <td className="border px-3 py-1 table-td">{property.size}</td>
                    <td className="border px-3 py-1 table-td">{property.pricePerNight.toLocaleString()} RWF</td>
                    <td className="border px-3 py-1 table-td">
                      {property.location.length > 15
                        ? `${property.location.slice(0, 15)}...`
                        : property.location
                      }
                    </td>
                    <td className="border px-3 py-1 table-td flex">
                      <button onClick={() => handleEditProperty(property)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDeleteProperty(property.id)} disabled={loading} className="text-red-600 hover:underline ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="text-5xl font-bold mb-10">Booking Management</h2>
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                  <th className="border px-3 py-1 table-th">ID</th>
                  <th className="border px-3 py-1 table-th">Renter</th>
                  <th className="border px-3 py-1 table-th">Property</th>
                  <th className="border px-3 py-1 table-th">Location</th>
                  <th className="border px-3 py-1 table-th">Price Per Night</th>
                  <th className="border px-3 py-1 table-th">Check-In</th>
                  <th className="border px-3 py-1 table-th">Check-Out</th>
                  <th className="border px-3 py-1 table-th">Days In</th>
                  <th className="border px-3 py-1 table-th">Total Amount</th>
                  <th className="border px-3 py-1 table-th">Status</th>
                  <th className="border px-3 py-1 table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td className="border px-3 py-1 table-td">{booking.id}</td>
                    <td className="border px-3 py-1 table-td">
                      {booking.Renter.name.length > 10
                        ? `${booking.Renter.name.slice(0, 10)}...`
                        : booking.Renter.name
                      }
                    </td>
                    <td className="border px-3 py-1 table-td">
                      {booking.property.title.length > 15
                        ? `${booking.property.title.slice(0, 15)}...`
                        : booking.property.title
                      }
                    </td>
                    <td className="border px-3 py-1 table-td">
                      {booking.property.location.length > 15
                        ? `${booking.property.location.slice(0, 15)}...`
                        : booking.property.location
                      }
                    </td>
                    <td className="border px-3 py-1 table-td">{booking.property.pricePerNight.toLocaleString()} RWF</td>
                    <td className="border px-3 py-1 table-td">{formatDate(booking.checkIn)}</td>
                    <td className="border px-3 py-1 table-td">{formatDate(booking.checkOut)}</td>
                    <td className="border px-3 py-1 table-td">{calculateDays(booking.checkIn, booking.checkOut)}</td>
                    <td className="border px-3 py-1 table-td">
                      {(booking.property.pricePerNight * calculateDays(booking.checkIn, booking.checkOut)).toLocaleString()} RWF
                    </td>
                    <td className="border px-3 py-1 table-td">
                      {booking.status === "confirmed" ?(  
                          <span className="text-green-600">{booking.status}</span>
                        ) : booking.status === "canceled" ? (
                          <span className="text-red-600">{booking.status}</span>
                        ) : (
                          <span>{booking.status}</span>
                        )
                      }
                    </td>
                    <td className="border flex px-3 py-1 table-td">
                      {booking.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleConfirmBooking(booking.id)}
                              className="text-green-600 hover:underline mr-2"
                              disabled={loading}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:underline"
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <span>Completed</span>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      
      {/* Footer */}
      <footer className="bg-gray-900 mt-40 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
            <h3 className='text-xl text-white'>LALA Test</h3>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect home.
              </p>
            </div>
            {/* Footer Links */}
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

export default PropertyManagement;