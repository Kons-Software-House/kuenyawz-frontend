import { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';

import 'react-image-crop/dist/ReactCrop.css'
import { useModal } from '../../contexts/ModalContext';
import { createProduct, uploadProductImages } from '../../services/ProducApiService';
import ImageCropperModal from '../../components/admin/modals/ImageCropperModal';
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar";

export default function AddNewProductView() {
  const { showImageCropperModal, setShowImageCropperModal } = useModal();
  const sixByNineRef = useRef<string>("");
  const oneByOneRef = useRef<string>("");
  const fiveBySixRef = useRef<string>("");
  const navigate = useNavigate();
  const [ratio, setRatio] = useState<"6/9" | "1/1" | "5/6">("6/9");
  const [variantCount, setVariantCount] = useState(1);

  const updatePreviewImages = (ratio: "6/9" | "1/1" | "5/6", imageUrl: string) => {
    switch (ratio) {
      case "6/9":
        sixByNineRef.current = imageUrl;
        break;
      case "1/1":
        oneByOneRef.current = imageUrl;
        break;
      case "5/6":
        fiveBySixRef.current = imageUrl;
        break;
    }
  }

  async function handleSubmit(values: any) {
    const product = {
      name: values.name,
      tagline: values.tagline,
      description: values.description,
      category: values.category,
      variants: Array.from({ length: variantCount }).map((_, index) => ({
        price: values.variants[index].price,
        type: values.variants[index].type,
        minQuantity: values.variants[index].minQuantity,
        maxQuantity: values.variants[index].maxQuantity,
      }))
    }
    try {
      const response = await createProduct(product);
      const { productId } = response;
      const images = [sixByNineRef.current, oneByOneRef.current, fiveBySixRef.current].map((imageUrl, index) =>
        fetch(imageUrl)
          .then(res => res.blob())
          .then(blob => new File([blob], `image${index}.jpg`, { type: blob.type }))
      );
      const imageFiles = await Promise.all(images);
      await uploadProductImages(productId, imageFiles);
    } catch (error: any) {
      alert(error.response.data.message);
      console.error(error);
    } finally {
      navigate("/admin/produk");
    }
  }

  const validateInput = (values: any) => {
    const errors: any = {};
    if (!sixByNineRef.current) errors.sixByNine = "Foto 6/9 tidak boleh kosong";
    if (!oneByOneRef.current) errors.oneByOne = "Foto 1/1 tidak boleh kosong";
    if (!fiveBySixRef.current) errors.fiveBySix = "Foto 5/6 tidak boleh kosong";
    if (!values.name) errors.name = "Nama produk tidak boleh kosong";
    if (!values.tagline) errors.tagline = "Tagline tidak boleh kosong";
    if (!values.description) errors.description = "Deskripsi produk tidak boleh kosong";

    const variantsErrors = Array.from({ length: variantCount - 1 }).map((_, index) => {
      const variantError: any = {};
      if (!values.variants[index].type) variantError.type = "Tipe varian tidak boleh kosong";
      if (!values.variants[index].price) variantError.price = "Harga tidak boleh kosong";
      if (!values.variants[index].minQuantity) variantError.minQuantity = "Jumlah minimal pembelian tidak boleh kosong";
      if (!values.variants[index].maxQuantity) variantError.maxQuantity = "Jumlah maksimal pembelian tidak boleh kosong";
      return variantError;
    });

    if (variantsErrors.some((variantError: any) => Object.keys(variantError).length > 0)) {
      errors.variants = variantsErrors;
    }

    return errors;
  }
  return (
    <>
      {showImageCropperModal && <ImageCropperModal aspectRatio={ratio} onClose={updatePreviewImages} />}
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <h1 className="font-semi text-2xl text-center p-4">Buat Produk Baru</h1>
          <div className="p-14">
            <Formik
              initialValues={{
                sixByNine: '',
                oneByOne: '',
                fiveBySix: '',
                name: '',
                tagline: '',
                description: '',
                category: 'other',
                variants: [
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                  { price: 0, type: '', minQuantity: 0, maxQuantity: 0 },
                ],
              }} onSubmit={handleSubmit} validate={validateInput}>
              <Form className="flex flex-col gap-4">
                <h2>Foto Produk</h2>
                <div className="flex flex-col grid grid-cols-1 md:grid-cols-3 gap-10 w-full mb-4">
                  <div className="p-2 flex flex-col gap-1">
                    <label htmlFor="photo1">Foto 1 (6/9)</label>
                    <div className='flex justify-center aspect-[6/9] border-4 border-tetriary-400 lg:mx-14'>
                      <img src={sixByNineRef.current} className='text-center aspect-[6/9] h-full' alt='Pilih Foto' />
                    </div>
                    <div className='grow' />
                    <ErrorMessage name="sixByNine" component="div" className="text-red-500 w-full text-center" />
                    <button type="button" className='bg-tetriary-550 rounded-lg' onClick={() => { setRatio("6/9"); setShowImageCropperModal(true) }}>Pilih Foto</button>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <label htmlFor="photo2">Foto 2 (1/1)</label>
                    <div className='flex justify-center aspect-[1/1] border-4 border-tetriary-400'>
                      <img src={oneByOneRef.current} className='text-center aspect-[1/1] h-full' alt='Pilih Foto' />
                    </div>
                    <div className='grow' />
                    <ErrorMessage name="oneByOne" component="div" className="text-red-500 w-full text-center" />
                    <button type="button" className='bg-tetriary-550 rounded-lg' onClick={() => { setRatio("1/1"); setShowImageCropperModal(true) }}>Pilih Foto</button>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <label htmlFor="photo3">Foto 3 (5/6)</label>
                    <div className='flex justify-center aspect-[5/6] border-4 border-tetriary-400'>
                      <img src={fiveBySixRef.current} className='text-center aspect-[5/6] h-full' alt='Pilih Foto' />
                    </div>
                    <div className='grow' />
                    <ErrorMessage name="fiveBySix" component="div" className="text-red-500 w-full text-center" />
                    <button type="button" className='bg-tetriary-550 rounded-lg' onClick={() => { setRatio("5/6"); setShowImageCropperModal(true) }}>Pilih Foto</button>
                  </div>
                </div>
                <Field name="name" type="text" placeholder="Nama Produk" className="p-2 border border-gray-300 rounded" />
                <ErrorMessage name="name" component="div" className="text-red-500" />
                <Field name="tagline" type="text" placeholder="Tagline" className="p-2 border border-gray-300 rounded" />
                <ErrorMessage name="tagline" component="div" className="text-red-500" />
                <Field name="description" as="textarea" placeholder="Deskripsi Produk" className="p-2 border border-gray-300 rounded" />
                <ErrorMessage name="description" component="div" className="text-red-500" />
                <Field name="category" as="select" className="p-2 border border-gray-300 rounded">
                  <option value="other">Lainnya</option>
                  <option value="cake">Cake</option>
                  <option value="pastry">Pastry</option>
                  <option value="pasta">Pasta</option>
                  <option value="pie">Pie</option>
                </Field>
                <select name="variantCount" onChange={(e) => setVariantCount(parseInt(e.target.value))} className="p-2 border border-gray-300 rounded">
                  <option value="1">1 Varian</option>
                  <option value="2">2 Varian</option>
                  <option value="3">3 Varian</option>
                </select>

                <div className={`grid grid-cols-${variantCount} gap-8 mt-4`}>
                  {Array.from({ length: variantCount }).map((_, index) => (
                    <VariantField key={index} name={`variants[${index}]`} variant={`Varian ${index + 1}`} />
                  ))}
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
      <ErrorMessage name={`${name}.type`} component="div" className="text-red-500" />
      <label htmlFor={`${name}.price`}>Harga</label>
      <Field name={`${name}.price`} type="number" placeholder="Harga" className="p-2 border border-gray-300 rounded" />
      <ErrorMessage name={`${name}.price`} component="div" className="text-red-500" />
      <label htmlFor={`${name}.minQuantity`}>Jumlah Minimal Pembelian</label>
      <Field name={`${name}.minQuantity`} type="number" placeholder="Jumlah Minimal Pembelian" className="p-2 border border-gray-300 rounded" />
      <ErrorMessage name={`${name}.minQuantity`} component="div" className="text-red-500" />
      <label htmlFor={`${name}.maxQuantity`}>Jumlah Maksimal Pembelian</label>
      <Field name={`${name}.maxQuantity`} type="number" placeholder="Jumlah Maksimal Pembelian" className="p-2 border border-gray-300 rounded" />
      <ErrorMessage name={`${name}.maxQuantity`} component="div" className="text-red-500" />
    </div>
  )
}