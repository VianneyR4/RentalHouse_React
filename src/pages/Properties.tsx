import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Property } from '../types';
import PropertyCard from '../components/property/PropertyCard';
import residence1Img from '../assets/images/house1.jpg'
import residence2Img from '../assets/images/house2.jpg'
import residence3Img from '../assets/images/house3.jpg'
import residence4Img from '../assets/images/house4.jpg'
import residence5Img from '../assets/images/house1.jpg'
import residence6Img from '../assets/images/house2.jpg'
import logoImg from '../assets/images/logo.png'
import Navbar from '../components/layout/Navbar';
import axios from 'axios';


const propertiesListOLD: Property[] = [
    {
      id: 1,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 2,
      baths: 2,
      size: '1203 Sqft.',
      pricePerNight: 50000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host1',
      images: [residence1Img, residence2Img, residence3Img, residence4Img],
      purpose: 'Rent',
      type: 'Apartment'
    },
    {
      id: 2,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 2,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 50000,
      location: 'kk27 Gikondo Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence2Img, residence1Img, residence3Img, residence4Img],
      purpose: 'Buy',
      type: 'Apartment'
    },
    {
      id: 3,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 3,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 200000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence3Img, residence2Img, residence1Img, residence4Img],
      purpose: 'Rent',
      type: 'House'
    },
    {
      id: 4,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 5,
      baths: 2,
      size: '1203 Sqft.',
      pricePerNight: 85000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence4Img, residence2Img, residence3Img, residence1Img],
      purpose: 'Rent',
      type: 'Apartment'
    },
    {
      id: 5,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 1,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 60000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence5Img, residence2Img, residence3Img, residence4Img],
      purpose: 'Rent',
      type: 'Villa'
    },
    {
      id: 6,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 1,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 50000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence6Img, residence2Img, residence3Img, residence4Img],
      purpose: 'Buy',
      type: 'House'
    },
    {
      id: 7,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 4,
      baths: 2,
      size: '1203 Sqft.',
      pricePerNight: 70000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence1Img, residence2Img, residence3Img, residence4Img],
      purpose: 'Rent',
      type: 'Apartment'
    },
    {
      id: 8,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali.',
      beds: 2,
      baths: 2,
      size: '1203 Sqft.',
      pricePerNight: 90000,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence3Img, residence6Img, residence5Img, residence4Img],
      purpose: 'Buy',
      type: 'Apartment'
    },
    {
      id: 9,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali.',
      beds: 3,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 150,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence2Img, residence5Img, residence3Img, residence4Img],
      purpose: 'Rent',
      type: 'Villa'
    },
    {
      id: 10,
      title: 'Aliva Priva Jalvin',
      description: 'A beautiful property in Kigali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus id in dolore dignissimos cupiditate, assumenda, nesciunt debitis alias deleniti ut velit. Placeat necessitatibus labore perferendis perspiciatis? A repellat molestias similique voluptatum impedit obcaecati aliquid culpa sed ipsam optio! Voluptatum, minima! Dolorem odio dolor quasi fugiat earum officia dolores illo eum est eveniet labore eius blanditiis qui corporis quae, enim adipisci nisi itaque. Ratione distinctio ipsa perferendis doloremque, nesciunt praesentium blanditiis, maiores sed labore alias tempora autem explicabo, pariatur repellat corporis. Doloribus, tempore incidunt enim perspiciatis neque, consequuntur nemo et mollitia assumenda ducimus repellendus natus quae soluta libero quidem fugit?',
      beds: 4,
      baths: 1,
      size: '1203 Sqft.',
      pricePerNight: 150,
      location: 'kk1087 Kicukiro Kagarama, Kigali, Rwanda',
      hostId: 'host2',
      images: [residence5Img, residence2Img, residence3Img, residence4Img],
      purpose: 'Rent',
      type: 'House'
    }
  ];



export default function Properties(userDetails: { user: unknown }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState<number | ''>('');
  const [baths, setBaths] = useState<number | ''>('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [propertiesList, setPropertiesList] = useState(null);


  
  const handleAddProperty = async () => {
    setLoading(true);
    setError('');

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/properties/all/`
        );
        
        if (response.data) {
            setPropertiesList(response.data);
            console.log("propertiesList: ", propertiesList);
        } else {
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setError("Something went wrong!");
            }
        }
    } catch (err) {
        if (err.response) {
            setError(err.response.data.error || "Failed to create property.");
        } else if (err.request) {
            setError("Network error. Please check your connection.");
        } else {
            setError(err.message || "An unexpected error occurred.");
        }
        console.log("Create property error: ", err);
    } finally {
        setLoading(false);
    }
  }
  
  
  const filteredProperties = propertiesList ? propertiesList.filter(property => {
    return (
      (beds ? property.beds === beds : true) &&
      (baths ? property.baths === baths : true) &&(location ? 
        property.location.toLowerCase().includes(location.toLowerCase()) || 
        property.title.toLowerCase().includes(location.toLowerCase()) ||
        property.type.toLowerCase().includes(location.toLowerCase()) 
        : true
      ) &&
      (purpose ? property.purpose === purpose : true) &&
      (type ? property.type === type : true)
    );
  }) : [];

  const handleSearch = () => {
    // The filtering logic is already handled by the state updates
  };


  useEffect(() => {
    handleAddProperty();
  }, []);
    
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div>
      <Navbar user={userDetails} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* Filter Section */}
      <div className="container pt-20 mx-auto px-4 py-10">
      <h2 className="text-5xl font-bold mb-10 mt-10">Properties</h2>

          {/* Combined Filter Form */}
          <div className="bg-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <select
                      className="form-select border p-2 rounded"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                  >
                      <option value="">Purpose</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Sell">Sell</option>
                  </select>

                  <select
                      className="form-select border p-2 rounded"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                  >
                      <option value="">Type</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                  </select>

                  <select
                      className="form-select border p-2 rounded"
                      value={beds}
                      onChange={(e) => setBeds(Number(e.target.value) || '')}
                  >
                      <option value="">Beds</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                  </select>

                  <select
                      className="form-select border p-2 rounded"
                      value={baths}
                      onChange={(e) => setBaths(Number(e.target.value) || '')}
                  >
                      <option value="">Baths</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                  </select>

                  <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-select border p-2 rounded"
                      placeholder="Type to Search"
                  />

                  <button
                      onClick={handleSearch}
                      className="search-btn bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 col-span-1"
                  >
                      Filter & Search
                  </button>
              </div>
          </div>
      </div>

      {/* Properties List */}
      <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
                filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))
                ) : (
                    <p className="text-gray-600">No properties found!.</p>
                )
            }
          </div>
      </div>

      {/* Let's Start Section */}
      <section id="start" className="my-5 py-5">
          <div className="container mx-auto mt-20 mb-20">
              <div className="flex flex-wrap py-5">
                  <div className="w-full md:w-5/12 flex">
                      <h1 className="text-6xl capitalize leading-tight mb-3">
                          Let's simply begin with <br/>Renting.
                      </h1>
                  </div>
                  <div className="w-full md:w-7/12">
                      <p className="py-2 text-gray-700">
                          HouseRenting provides an easy and secure way to rent properties. Our platform simplifies the process, making it fast, efficient, and safe for both renters and landlords. Get started today to explore your rental options.
                      </p>

                      <a href="/contact"
                          className="login-btn mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-lg transition">
                          Get Started
                      </a>
                  </div>
              </div>
          </div>
      </section>

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
}