interface PropertyCardProps {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ id, name, description, rating, price }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <a href={`/booking/${id}`} className="text-xl font-bold text-blue-600 hover:underline">
        {name}
      </a>
      <p className="text-gray-700 mt-2">
        {description}
      </p>
      <div className="flex items-center mt-4">
        <span className="text-lg font-medium text-gray-900 mr-4">
          ${price} / day
        </span>
        <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
          {rating} Rating
        </span>
      </div>
    </div>
  );
};

export default PropertyCard;