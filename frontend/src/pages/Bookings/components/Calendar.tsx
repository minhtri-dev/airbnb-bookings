import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface CalendarProps {
  listingId: string
  // onDatesChange returns the selected start and end dates as ISO strings along with a conflict flag
  onDatesChange: (startDate: string | null, endDate: string | null, conflict: boolean) => void
}

const Calendar: React.FC<CalendarProps> = ({ listingId, onDatesChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])

  // Fetch unavailable dates from API using the listingId
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/booking/unavailibilites/${listingId}`)
        const dates: string[] = await res.json()
        const disabledDates = dates.map(dateStr => new Date(dateStr))
        setUnavailableDates(disabledDates)
      } catch (error) {
        console.error('Error loading unavailable dates', error)
      }
    }
    fetchUnavailableDates()
  }, [listingId])

  // Helper: Check if the selected date range has conflicts with the unavailable dates
  const dateRangeHasConflict = (start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return false
    const startCopy = new Date(start)
    const endCopy = new Date(end)
    for (let d = new Date(startCopy); d <= endCopy; d.setDate(d.getDate() + 1)) {
      const dStr = d.toISOString().split('T')[0]
      const conflict = unavailableDates.some(
        unav => unav.toISOString().split('T')[0] === dStr
      )
      if (conflict) return true
    }
    return false
  }

  // Whenever the dates change, convert them to ISO strings and notify parent
  useEffect(() => {
    const conflict = dateRangeHasConflict(startDate, endDate)
    const startISO = startDate ? startDate.toISOString() : null
    const endISO = endDate ? endDate.toISOString() : null
    onDatesChange(startISO, endISO, conflict)
  }, [startDate, endDate, onDatesChange])

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          minDate={new Date()}
          excludeDates={unavailableDates}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          minDate={startDate || new Date()}
          excludeDates={unavailableDates}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  )
}

export default Calendar