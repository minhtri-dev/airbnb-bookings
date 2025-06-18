import { useEffect, useState, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface CalendarProps {
  listingId: string
  // onDatesChange returns the selected start and end dates as ISO strings along with a conflict flag
  onDatesChange: (
    startDate: string | null,
    endDate: string | null,
    conflict: boolean,
  ) => void
}

const Calendar: React.FC<CalendarProps> = ({ listingId, onDatesChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])

  // Fetch unavailable dates from API using the listingId
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/booking/unavailibilites/${listingId}`,
        )
        const dates = (await res.json()) as string[]
        const disabledDates = dates.map((dateStr) => new Date(dateStr))
        setUnavailableDates(disabledDates)
      } catch (error) {
        console.error('Error loading unavailable dates', error)
      }
    }
    void fetchUnavailableDates()
  }, [listingId])

  // Memoize the function to avoid missing dependency warnings
  const dateRangeHasConflict = useCallback(
    (start: Date | null, end: Date | null): boolean => {
      if (!start || !end) return false
      const startCopy = new Date(start)
      const endCopy = new Date(end)
      for (
        let d = new Date(startCopy);
        d <= endCopy;
        d.setDate(d.getDate() + 1)
      ) {
        const dStr = d.toISOString().split('T')[0]
        const conflict = unavailableDates.some(
          (unav) => unav.toISOString().split('T')[0] === dStr,
        )
        if (conflict) return true
      }
      return false
    },
    [unavailableDates],
  )

  // Check for invalid date range (start date later than end date)
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      const startISO = startDate.toISOString()
      const endISO = endDate.toISOString()
      onDatesChange(startISO, endISO, true)
      return
    }
    const conflict = dateRangeHasConflict(startDate, endDate)
    const startISO = startDate ? startDate.toISOString() : null
    const endISO = endDate ? endDate.toISOString() : null
    onDatesChange(startISO, endISO, conflict)
  }, [startDate, endDate, onDatesChange, dateRangeHasConflict])

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          minDate={new Date()}
          excludeDates={unavailableDates}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          className="mt-1 block w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          // Set minDate to startDate (or today) to help prevent invalid ranges
          minDate={startDate || new Date()}
          excludeDates={unavailableDates}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className="mt-1 block w-full rounded border border-gray-300 p-2"
        />
      </div>
    </div>
  )
}

export default Calendar