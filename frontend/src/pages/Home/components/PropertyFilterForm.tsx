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
    <form className="grid grid-cols-1 gap-4 md:grid-cols-3" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="location"
          className="mb-2 block font-medium text-gray-700"
        >
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter location"
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-300 focus:ring focus:outline-none"
          required
        />
      </div>
      <div>
        <label
          htmlFor="propertyType"
          className="mb-2 block font-medium text-gray-700"
        >
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-300 focus:ring focus:outline-none"
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
          className="mb-2 block font-medium text-gray-700"
        >
          Number of Bedrooms
        </label>
        <select
          id="bedrooms"
          name="bedrooms"
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-300 focus:ring focus:outline-none"
        >
          <option value="">Any</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
      </div>
      <div className="text-right md:col-span-3">
        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:ring focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default FiltersForm
