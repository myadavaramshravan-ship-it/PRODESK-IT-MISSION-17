import { useEffect, useState } from "react"

const initialForm = {
  customerName: "",
  vehicleType: "Car",
  serviceType: "Oil Change",
  bookingDate: "",
  status: "Pending"
}

const BookingForm = ({ initialData, onSubmit, onCancel, submitText }) => {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (initialData) {
      setForm({
        customerName: initialData.customerName,
        vehicleType: initialData.vehicleType,
        serviceType: initialData.serviceType,
        bookingDate: new Date(initialData.bookingDate).toISOString().slice(0, 10),
        status: initialData.status || "Pending"
      })
    } else {
      setForm(initialForm)
    }
  }, [initialData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...form,
      bookingDate: new Date(form.bookingDate).toISOString()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="customerName">Customer Name</label>
        <input
          id="customerName"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="vehicleType">Vehicle Type</label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          required
        >
          <option>Car</option>
          <option>Bike</option>
          <option>SUV</option>
          <option>Truck</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="serviceType">Service Type</label>
        <select
          id="serviceType"
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          required
        >
          <option>Oil Change</option>
          <option>General Service</option>
          <option>Brake Service</option>
          <option>Engine Repair</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="bookingDate">Booking Date</label>
        <input
          id="bookingDate"
          name="bookingDate"
          type="date"
          value={form.bookingDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="button-row">
        <button type="submit" className="primary">
          {submitText || "Save Booking"}
        </button>
        {onCancel ? (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default BookingForm
