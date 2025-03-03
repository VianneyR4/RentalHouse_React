import { useEffect, useState } from 'react'
// import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import logoImg from '../assets/images/logo.png'
import billboardImg from '../assets/images/house2.jpg'
import groupImg from '../assets/images/group.png'
import residence1Img from '../assets/images/house1.jpg'
import residence2Img from '../assets/images/house2.jpg'
import residence3Img from '../assets/images/house3.jpg'
import residence4Img from '../assets/images/house4.jpg'
import residence5Img from '../assets/images/house1.jpg'
import residence6Img from '../assets/images/house2.jpg'
import brand1Img from '../assets/images/logo1.png'
import brand2Img from '../assets/images/logo2.png'
import brand3Img from '../assets/images/logo3.png'
import brand4Img from '../assets/images/logo4.png'
import brand6Img from '../assets/images/logo6.png'
import ic_search from '../assets/images/search.png'
import ic_price from '../assets/images/price.png'
import ic_time from '../assets/images/time.png'
import quoteImg from '../assets/images/quote.png';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import PropertyCard from '../components/property/PropertyCard';
import { Property, Testimonial } from '../types'
import Navbar from '../components/layout/Navbar'

import axios from 'axios'


export default function Home(userDetails: { user: unknown }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purpose, setPurpose] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);

  if (userDetails != null){
    console.log("Current User:", userDetails.user);
  }


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
            setPropertiesList([]);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setError("Something went wrong!");
            }
        }
    } catch (err) {
        setPropertiesList([]);
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
  

  const handleSearch = () => {
    console.log("Search Params:", { purpose, location, type })
  }

  useEffect(() => {
    handleAddProperty();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

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


  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Finding a rental in Kigali has never been this easy! The platform is simple to use, and I quickly found a great apartment within my budget.",
      name: "Jean Mugisha",
      role: "Business Owner, Kigali"
    },
    {
      id: 2,
      text: "I listed my property and received bookings within days. The system is smooth, and managing reservations has been stress-free!",
      name: "Aline Uwase",
      role: "Host, Kigali"
    },
    {
      id: 3,
      text: "Seamless booking experience! The platform is well-designed, and the prices are transparent. Highly recommended for anyone looking for a rental.",
      name: "David Nshimiyimana",
      role: "Traveler, Rwanda"
    }
  ];

  
  return (
    <div className="min-h-screen">
      <Navbar user={userDetails}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* Billboard Section */}
      <section className="pt-20 pb-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1 className="text-6xl font-bold pt-20 mb-5">
                Perfect Way To <br/>Buy And Sell A <br/>Home
              </h1>
              <p className="text-gray-600 mb-8">
                Find your dream home with our comprehensive property listings
                and expert guidance. Find more with us from our service
              </p>

              {/* Search Form */}
              <div className="form-container bg-white shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    className="form-select border"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="">Purpose</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Sell">Sell</option>
                  </select>

                  <select
                    className="form-select border"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Location</option>
                    <option value="Texas">Texas</option>
                    <option value="Miami">Miami</option>
                    <option value="Chicago">Chicago</option>
                    <option value="New York">New York</option>
                  </select>

                  <select
                    className="form-select border"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                  </select>

                  <button
                    onClick={handleSearch}
                    className="search-btn bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2">
              <br/>
              <img
                src={billboardImg}
                alt="Find your dream home"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-20 mt-8">Our Parteners</h2>
          <div className="brandContainer  mb-20 flex justify-center items-center space-x-8">
            <img src={brand1Img} alt="Brand 1" className="w-35" />
            <img src={brand2Img} alt="Brand 2" className="w-30" />
            <img src={brand3Img} alt="Brand 3" className="w-35" />
            <img src={brand4Img} alt="Brand 4" className="w-35" />
            <img src={brand6Img} alt="Brand 6" className="w-35" />
          </div>
        </div>
      </section>

      {/* Popular Residences */}
      <section id="residence" className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mt-20 mb-10">Popular Residence</h2>
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: '.residence-swiper-next',
              prevEl: '.residence-swiper-prev'
            }}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="residence-swiper"
          >
            {propertiesList.length > 0 ? (
                propertiesList.map((property) => (
                  <SwiperSlide key={property.id}>
                    <PropertyCard property={property} />
                  </SwiperSlide>
                )) 
              ): (
                <p className="text-gray-600">No properties found!.</p>
              )
            }
          </Swiper>
          <div className="flex justify-between mt-4 swipper-btn">
            <button className="swiper-btn residence-swiper-prev absolute top-1/2 -translate-y-1/2 left-10  bg-gray-300 p-2 rounded">❮</button>
            <button className="swiper-btn residence-swiper-next absolute top-1/2 -translate-y-1/2 right-10 bg-gray-300 p-2 rounded">❯</button>
          </div>

          <div className="text-center mt-10 mb-20">
            <Link to="/properties">
              <button className="login-btn bg-blue-600 text-white px-6 py-3 rounded-lg">View All Properties</button>
            </Link>
          </div>
        </div>
      </section>


      {/* About Us Section */}
      <section id="aboutUs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 mt-10 mb-10">
          <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <img
                src={ic_search}
                alt="Easy to Find"
                className="w-36 h-36 mx-auto rounded-full"
                loading="lazy"
              />
              <h4 className="text-xl font-medium mt-5">Find Rentals with Ease</h4>
              <p className="text-gray-600 mt-3">
                Browse a wide selection of homes, apartments, and short-term stays across Kigali.  
                Our platform makes it simple to find the perfect place that suits your needs.
              </p>
            </div>
            <div>
              <img
                src={ic_price}
                alt="Affordable Prices"
                className="w-36 h-36 mx-auto rounded-full"
                loading="lazy"
              />
              <h4 className="text-xl font-medium mt-5">Affordable & Transparent Pricing</h4>
              <p className="text-gray-600 mt-3">
                Get the best deals with no hidden fees. Whether you're looking for a budget-friendly  
                stay or a luxury experience, we offer options for every budget.
              </p>
            </div>
            <div>
              <img
                src={ic_time}
                alt="Quickly Process"
                className="w-36 h-36 mx-auto rounded-full"
                loading="lazy"
              />
              <h4 className="text-xl font-medium mt-5">Fast & Secure Booking</h4>
              <p className="text-gray-600 mt-3">
                Secure your stay in just a few clicks. Our quick and reliable booking process  
                ensures a hassle-free experience from reservation to check-in. we are the best choice
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonial" className="my-10">
        <div className="container mx-auto px-4 mt-20 mb-20">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center py-10">
                  <img src={quoteImg} alt="Quote" className="w-15 h-12 mb-4" />
                  <p className="text-gray-700 max-w-lg mx-auto italic">{testimonial.text}</p>
                  <div className="mt-6">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


       {/* Help Section */}
       <section
      id="help"
      className="py-10 bg-gradient-to-r from-[#1A242F] to-[#1A242F]">
        <div className="container mx-auto my-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Image Section */}
            <div className="md:w-1/2 flex">
              <img
                src={groupImg}
                alt="Group"
                className="w-full max-w-md md:max-w-lg"
                loading="lazy"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10 text-white">
              <h2 className="text-5xl font-semibold text-white capitalize">
                We help people to find homes
              </h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
              Easily find and book rentals across Kigali. Our platform connects you with trusted hosts, ensuring a smooth and secure experience.  
              Need assistance? Our support team is here to help with bookings, payments, and any inquiries.  
              Enjoy a hassle-free way to rent your ideal space today!
              </p>
              <a
                href="contact.html"
                className="login-btn mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-lg transition"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

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
  )
} 