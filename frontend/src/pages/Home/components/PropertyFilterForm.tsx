import React from 'react'

interface FiltersFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

// Updated property types based on the provided labels
const propertyTypes = [
  { value: '', label: 'Any' },
  { value: 'Aparthotel', label: 'Aparthotel' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Barn', label: 'Barn' },
  { value: 'Bed and breakfast', label: 'Bed and breakfast' },
  { value: 'Boat', label: 'Boat' },
  { value: 'Boutique hotel', label: 'Boutique hotel' },
  { value: 'Bungalow', label: 'Bungalow' },
  { value: 'Cabin', label: 'Cabin' },
  { value: 'Camper/RV', label: 'Camper/RV' },
  { value: 'Campsite', label: 'Campsite' },
]

const FiltersForm: React.FC<FiltersFormProps> = ({ onSubmit }) => {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      onSubmit={onSubmit}
    >
      <div>
        <label
          htmlFor="location"
          className="block text-gray-700 font-medium mb-2"
        >
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter location"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div>
        <label
          htmlFor="propertyType"
          className="block text-gray-700 font-medium mb-2"
        >
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="bedrooms"
          className="block text-gray-700 font-medium mb-2"
        >
          Number of Bedrooms
        </label>
        <select
          id="bedrooms"
          name="bedrooms"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Any</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
      </div>
      <div className="md:col-span-3 text-right">
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default FiltersForm