import UpperSection from "../../components/core/UpperSection"
import Container from "../../components/core/Container"
import Calendar from "../../components/views/CalendarView/Calendar"
import AvailabilityTable from "../../components/views/CalendarView/AvailabilityTable"

export default function CalendarView() {
  return (
    <>
      <UpperSection title="Kalender" subtitle="Jadwalkan Pesanan Anda" />
      <Container>
        <div className="flex gap-x-4 justify-center w-full">
          <Calendar />
          <AvailabilityTable />
        </div>
      </Container>
    </>
  )
}