import Sidebar from "../../components/admin/Sidebar";
import { Formik, Form, Field } from "formik";

export default function AddNewProductView() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="font-semi text-2xl text-center p-4">Buat Produk Baru</h1>
          <div className="p-14">
            <Formik
              initialValues={{
                name: '',
                tagline: '',
                description: '',
                category: '',
                variants: [
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                ],
              }} onSubmit={(values) => { console.log(values) }}>
              <Form className="flex flex-col gap-4">
                <Field name="name" type="text" placeholder="Nama Produk" className="p-2 border border-gray-300 rounded" />
                <Field name="tagline" type="text" placeholder="Tagline" className="p-2 border border-gray-300 rounded" />
                <Field name="description" as="textarea" placeholder="Deskripsi Produk" className="p-2 border border-gray-300 rounded" />
                <Field name="category" as="select" className="p-2 border border-gray-300 rounded">
                  <option value="cake">Cake</option>
                  <option value="pastry">Pastry</option>
                  <option value="pasta">Pasta</option>
                  <option value="pie & pudding">Pie & Pudding</option>
                  <option value="lainnya">Lainnya</option>
                </Field>
                <div className="grid grid-cols-3 gap-8 mt-4">
                  <VariantField name="variants[0]" variant="Varian 1" />
                  <VariantField name="variants[1]" variant="Varian 2" />
                  <VariantField name="variants[2]" variant="Varian 3" />
                </div>
                <button type="submit" className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg">Buat Produk Baru</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

type VariantFieldProps = {
  name: string;
  variant: string;
}

function VariantField({ name, variant }: VariantFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="w-full text-center text-lg">{variant}</h2>
      <label htmlFor={`${name}.type`}>Tipe Varian</label>
      <Field name={`${name}.type`} type="text" placeholder="Tipe Varian" className="p-2 border border-gray-300 rounded" />
      <label htmlFor={`${name}.price`}>Harga</label>
      <Field name={`${name}.price`} type="number" placeholder="Harga" className="p-2 border border-gray-300 rounded" />
      <label htmlFor={`${name}.minQuantity`}>Jumlah Minimal Pembelian</label>
      <Field name={`${name}.minQuantity`} type="number" placeholder="Jumlah Minimal Pembelian" className="p-2 border border-gray-300 rounded" />
      <label htmlFor={`${name}.maxQuantity`}>Jumlah Maksimal Pembelian</label>
      <Field name={`${name}.maxQuantity`} type="number" placeholder="Jumlah Maksimal Pembelian" className="p-2 border border-gray-300 rounded" />
    </div>
  )
}