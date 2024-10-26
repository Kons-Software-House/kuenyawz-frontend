import UpperSection from "../components/core/UpperSection"
import Container from "../components/core/Container"
import Calendar from "../components/CalendarView/Calendar"

export default function CalendarView() {
  return (
    <>
      <UpperSection title="Kalender" subtitle="Jadwalkan Pesanan Anda" />
      <Container>
        <Calendar />
      </Container>
    </>
  )
}