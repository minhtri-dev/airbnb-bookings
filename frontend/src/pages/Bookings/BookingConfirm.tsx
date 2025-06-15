const BookingsConfirm = () => {
  return (
    <div className="mx-auto my-10 max-w-2xl rounded bg-gray-100 p-6 text-center">
      <h2 className="mb-4 text-2xl font-bold">Booking Confirmed!</h2>
      <p className="mb-6">
        Thank you for your booking. Your booking details have been successfully
        recorded.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Return to Homepage
      </a>
    </div>
  )
}

export default BookingsConfirm
