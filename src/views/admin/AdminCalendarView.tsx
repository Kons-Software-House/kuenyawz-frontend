import { Formik, Field, Form } from "formik"

import { createClosedDates, deleteClosedDates } from "../../services/CalendarApiService"
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar"
import Calendar from "../../components/user/views/CalendarView/Calendar"
import AvailabilityTable from "../../components/user/views/CalendarView/AvailabilityTable"

export default function AdminCalendarView() {
  const handleCreateClosedDates = async (values: any) => {
    try {
      await createClosedDates(values.date, "CLOSED");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  const handleDeleteClosedDates = async (values: any) => {
    try {
      await deleteClosedDates(values.date);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="m-4">
          <div className="flex gap-2 mt-6 grow lg:flex-row flex-col">
            <Calendar />
            <AvailabilityTable />
          </div>
          <div className="bg-secondary-500 mt-6 p-6 max-w-[59rem]">
            <Formik initialValues={{ date: '' }} onSubmit={(values) => { handleCreateClosedDates(values) }}>
              <Form className="grid grid-cols-3 w-[30rem] mb-2">
                <label htmlFor="date" className="text-clear text-md mr-2">Tambah Hari Libur</label>
                <Field type="date" name="date" className="rounded-md p-2 mr-2" />
                <button type="submit" className="bg-secondary-100 rounded p-2 w-28">Tambahkan</button>
              </Form>
            </Formik>
            <Formik initialValues={{ date: '' }} onSubmit={(values) => { handleDeleteClosedDates(values) }}>
              <Form className="grid grid-cols-3 w-[30rem]">
                <label htmlFor="date" className="text-clear text-md mr-4">Hapus Hari Libur</label>
                <Field type="date" name="date" className="rounded-md p-2 mr-2" />
                <button type="submit" className="bg-secondary-100 rounded p-2 w-28">Hapus</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div >
    </div >
  )
}