import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"
import Calendar from "../../components/user/views/CalendarView/Calendar"
import AvailabilityTable from "../../components/user/views/CalendarView/AvailabilityTable"

export default function CalendarView() {
  return (
    <>
      <UpperSection title="Kalender" subtitle="Jadwalkan Pesanan Anda" />
      <Container>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Calendar />
          <AvailabilityTable />
        </div>
      </Container>
    </>
  )
}