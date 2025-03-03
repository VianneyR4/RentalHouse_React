import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
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

const initialProperties: Property[] = [
  // {
  //   id: 1,
  //   title: 'Aliva Priva Jalvin',
  //   description: 'A beautiful property in Kigali.',
  //   beds: 2,
  //   baths: 2,
  //   size: '1203 Sqft.',
  //   pricePerNight: 50000,
  //   location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
  //   hostId: 'host1',
  //   images: [],
  //   purpose: 'Rent',
  //   type: 'Apartment',
  // },
  // Add more initial properties if needed
];


const PropertyManagement = (userDetails: { user: unknown }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


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
          // Update existing property
          const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}/api/v1/property/update/${property.id}`,
            newProperty,
            { withCredentials: true }
          );

          if (response.data) {
            onUpdateProperty(response.data); // Call the update handler
          } else {
            setError(response.data.error || "Failed to update property.");
          }
        } else {
          // Create new property
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/property/create/`,
            newProperty,
            { withCredentials: true }
          );

          if (response.data) {
            onAddProperty(response.data); // Call the add handler
          } else {
            setError(response.data.error || "Failed to create property.");
          }
        }

        onClose(); // Close the dialog
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

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property); // Set the selected property
    setIsAddPropertyOpen(true); // Open the dialog
  };

  const handleAddPropertyRole = () => {
    setSelectedProperty(null); // Clear the selected property
    setIsAddPropertyOpen(true); // Open the dialog for adding a new property
  };

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

  useEffect(() => {
    handleGetProperty();
  }, []);

  return (
    <div>
      <Navbar user={userDetails} />

      <div className="container pt-40 mx-auto px-4 py-10">
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
          property={selectedProperty} // Pass the selected property
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
                  <button onClick={() => handleDeleteProperty(property.id)} className="text-red-600 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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