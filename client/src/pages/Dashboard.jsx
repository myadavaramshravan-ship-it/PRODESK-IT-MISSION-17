import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking
} from "../services/bookingService"
import BookingForm from "../components/BookingForm"
import BookingTable from "../components/BookingTable"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const loadBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getBookings()
      setBookings(response.bookings || [])
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load bookings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const handleSave = async (bookingData) => {
    setError(null)
    try {
      if (selectedBooking) {
        await updateBooking(selectedBooking._id, bookingData)
        setMessage("Booking updated successfully")
      } else {
        await createBooking(bookingData)
        setMessage("Booking created successfully")
      }
      setSelectedBooking(null)
      await loadBookings()
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save booking")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) {
      return
    }
    setError(null)
    try {
      await deleteBooking(id)
      setMessage("Booking deleted successfully")
      await loadBookings()
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete booking")
    }
  }

  const handleEdit = (booking) => {
    setSelectedBooking(booking)
    setMessage(null)
    setError(null)
  }

  const handleCancelEdit = () => {
    setSelectedBooking(null)
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name || "User"}</h1>
          <p>Manage vehicle bookings and monitor statuses from one dashboard.</p>
        </div>
      </div>

      {message ? <div className="alert success">{message}</div> : null}
      {error ? <div className="alert error">{error}</div> : null}

      <div className="dashboard-grid">
        <div className="dashboard-panel dashboard-panel-form">
          <h2>{selectedBooking ? "Edit Booking" : "New Booking"}</h2>
          <BookingForm
            initialData={selectedBooking}
            onSubmit={handleSave}
            onCancel={selectedBooking ? handleCancelEdit : undefined}
            submitText={selectedBooking ? "Update Booking" : "Create Booking"}
          />
        </div>

        <div className="dashboard-panel dashboard-panel-table">
          <div className="dashboard-panel-header">
            <div>
              <h2>Bookings</h2>
              <p className="panel-subtitle">Recent customer bookings and current status tracking.</p>
            </div>
            {loading ? <span>Loading...</span> : null}
          </div>
          <BookingTable bookings={bookings} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
