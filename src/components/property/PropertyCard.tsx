import { Property } from '../../types';
import { Link } from 'react-router-dom';
import ic_bed from '../../assets/images/bed.png';
import ic_batch from '../../assets/images/bath.png';
import ic_square from '../../assets/images/square.png';
import residence5Img from '../../assets/images/house1.jpg'

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const images = property.images ?? [residence5Img];

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <Link to={`/property/${property.id}`} state={{ property }}>
        {images.length >= 1 ? (
          <img src={images[0]} alt={property.title} width={412} height={300} className="w-full" />
        ) : (
          <img src={residence5Img} alt="Default Image" width={412} height={300} className="w-full" />
        )}
      </Link>
      <div className="p-4">
        <Link to={`/property/${property.id}`} state={{ property }}>
          <h5 className="text-2xl font-semibold mb-2 hover:text-bleu-700">{property.title}</h5>
        </Link>
        <p className="text-gray-600 mb-2 text-sm">{property.location}</p>
        <p className="text-gray-600 mb-2 text-sm text-italic">
          Type: {property.type} to {property.purpose}
        </p>
        <Link to={`/property/${property.id}`} state={{ property }}>
          <h6 className="font-semibold mb-5 hover:text-bleu-700">{property.pricePerNight.toLocaleString()} RWF/night</h6>
        </Link>
        <div className="card-text">
          <ul className="flex gap-4 mt-2 text-sm mb-2 text-gray-500">
            <li className="residence-list">
              <img src={ic_bed} alt="bed" /> <span> {property.beds} bed</span>
            </li>
            <li className="residence-list">
              <img src={ic_batch} alt="bath" /> <span> {property.baths} bath</span>
            </li>
            <li className="residence-list">
              <img src={ic_square} alt="size" /> <span> {property.size} Sqft</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}