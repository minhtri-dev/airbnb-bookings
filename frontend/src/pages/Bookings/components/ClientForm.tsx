import React, { useState } from 'react'
import type { IClient } from 'interfaces/Client'

interface ClientFormProps {
  onSubmit: (client: IClient) => void
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
  const [client, setClient] = useState<IClient>({
    name: '',
    emailAddress: '',
    daytimePhoneNumber: '',
    mobileNumber: '',
    postalAddress: '',
    homeAddress: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(client)
      }}
      className="rounded bg-white p-6 shadow"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Your Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={client.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="emailAddress"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address:
        </label>
        <input
          type="email"
          name="emailAddress"
          id="emailAddress"
          value={client.emailAddress}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="daytimePhoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Daytime Phone Number:
        </label>
        <input
          type="text"
          name="daytimePhoneNumber"
          id="daytimePhoneNumber"
          value={client.daytimePhoneNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobileNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile Number:
        </label>
        <input
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          value={client.mobileNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="postalAddress"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Address:
        </label>
        <input
          type="text"
          name="postalAddress"
          id="postalAddress"
          value={client.postalAddress}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="homeAddress"
          className="block text-sm font-medium text-gray-700"
        >
          Residential Address:
        </label>
        <input
          type="text"
          name="homeAddress"
          id="homeAddress"
          value={client.homeAddress}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  )
}

export default ClientForm
