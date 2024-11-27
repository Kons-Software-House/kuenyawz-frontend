import { Formik, Field, Form } from "formik"

import { createClosedDates } from "../../services/CalendarApiService"
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"
import Calendar from "../../components/user/views/CalendarView/Calendar"

export default function AdminCalendarView() {
  const handleSubmit = async (values: any) => {
    try {
      await createClosedDates(values.date, "RESERVED");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-red-200 w-full">
        <Formik initialValues={{ date: '' }} onSubmit={(values) => { handleSubmit(values) }}>
          <Form>
            <Calendar />
            <Field type="date" name="date" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div >
    </div >
  )
}