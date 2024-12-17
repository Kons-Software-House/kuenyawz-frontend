import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from 'react-router-dom';

import 'react-image-crop/dist/ReactCrop.css'
import { Product } from '../../types/Product';
import { editProduct } from '../../services/ProducApiService';
import { retrieveProductById } from "../../services/ProducApiService";
import { retrieveProductImage } from '../../services/ImageApiService';
import Sidebar from "../../components/admin/views/AdminDashboardView/Sidebar";

export default function EditProductView() {
  const sixByNineRef = useRef<string>("");
  const oneByOneRef = useRef<string>("");
  const fiveBySixRef = useRef<string>("");
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [variantCount, setVariantCount] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProduct() {
    if (productId) {
      try {
        const response = await retrieveProductById(productId)
        console.log(response)
        if (response) {
          sixByNineRef.current = await retrieveProductImage(response.images[0])
          oneByOneRef.current = await retrieveProductImage(response.images[1])
          fiveBySixRef.current = await retrieveProductImage(response.images[2])
        }
        setProduct(response)
        setVariantCount(response.variants.length)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      console.error("Product ID is undefined")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

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
      })),
      available: values.available
    }
    try {
      if (productId) {
        await editProduct(product, productId);
      }
    } catch (error: any) {
      alert(error.response.data.message);
      console.error(error);
    } finally {
      navigate("/admin/products");
    }
  }

  const validateInput = (values: any) => {
    const errors: any = {};
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
      {isLoading ? <div>Loading</div> : product &&
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <h1 className="font-semi text-2xl text-center p-4">Ubah Produk</h1>
            <div className="p-14">
              <Formik
                initialValues={{
                  sixByNine: product.images[0],
                  oneByOne: product.images[1],
                  fiveBySix: product.images[2],
                  name: product.name,
                  tagline: product.tagline,
                  description: product.description,
                  category: product.category,
                  variants: [
                    { price: product.variants[0].price, type: product.variants[0].type, minQuantity: product.variants[0].minQuantity, maxQuantity: product.variants[0].maxQuantity },
                    { price: product?.variants?.[1]?.price || 0, type: product?.variants?.[1]?.type || '', minQuantity: product?.variants?.[1]?.minQuantity || 0, maxQuantity: product?.variants?.[1]?.maxQuantity || 0 },
                    { price: product?.variants?.[2]?.price || 0, type: product?.variants?.[2]?.type || '', minQuantity: product?.variants?.[2]?.minQuantity || 0, maxQuantity: product?.variants?.[2]?.maxQuantity || 0 },
                  ],
                  available: false
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
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <label htmlFor="photo2">Foto 2 (1/1)</label>
                      <div className='flex justify-center aspect-[1/1] border-4 border-tetriary-400'>
                        <img src={oneByOneRef.current} className='text-center aspect-[1/1] h-full' alt='Pilih Foto' />
                      </div>
                      <div className='grow' />
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <label htmlFor="photo3">Foto 3 (5/6)</label>
                      <div className='flex justify-center aspect-[5/6] border-4 border-tetriary-400'>
                        <img src={fiveBySixRef.current} className='text-center aspect-[5/6] h-full' alt='Pilih Foto' />
                      </div>
                      <div className='grow' />
                    </div>
                  </div>
                  <Field name="name" type="text" placeholder="Nama Produk" className="p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                  <Field name="tagline" type="text" placeholder="Tagline" className="p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="tagline" component="div" className="text-red-500" />
                  <Field name="description" as="textarea" placeholder="Deskripsi Produk" className="p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                  <Field name="category" as="select" className="p-2 border border-gray-300 rounded">
                    <option value="OTHER">Lainnya</option>
                    <option value="CAKE">Cake</option>
                    <option value="PASTY">Pastry</option>
                    <option value="PASTA">Pasta</option>
                    <option value="PIE">Pie</option>
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
                  <label htmlFor="available">Ketersediaan</label>
                  <Field name="available" as="select" className="p-2 border border-gray-300 rounded">
                    <option value="false">Tidak Tersedia</option>
                    <option value="true">Tersedia</option>
                  </Field>
                  <button type="submit" className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg">Ubah Produk</button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      }
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