const BookingTable = ({ bookings, onEdit, onDelete }) => {
  if (!bookings || bookings.length === 0) {
    return <p>No bookings found. Add a booking to get started.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.customerName}</td>
              <td>{booking.vehicleType}</td>
              <td>{booking.serviceType}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.status}</td>
              <td>
                <button type="button" className="secondary" onClick={() => onEdit(booking)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(booking._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingTable
