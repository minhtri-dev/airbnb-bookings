interface PropertyCardProps {
  id: string
  name: string
  description: string
  rating: number
  price: number
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  description,
  rating,
  price,
}) => {
  return (
    <div className="rounded bg-white p-4 shadow">
      <a
        href={`/booking/${id}`}
        className="text-xl font-bold text-blue-600 hover:underline"
      >
        {name}
      </a>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 flex items-center">
        <span className="mr-4 text-lg font-medium text-gray-900">
          ${price} / day
        </span>
        <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-800">
          {rating} Rating
        </span>
      </div>
    </div>
  )
}

export default PropertyCard
