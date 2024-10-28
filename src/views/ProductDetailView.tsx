import { motion } from "framer-motion"
import { LighterBackgroundColors, LighterBorderColors } from '../components/core/Colors';
import Container from "../components/core/Container"
import UpperSection from "../components/core/UpperSection"

type BgColorProps = {
  background: 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500' 
}


export default function ProductDetailPage({ background }: BgColorProps) {
  return (
    <>
      <UpperSection title="Bitter Ballen" background={background} />
      <Container>
        <div className="grid grid-cols-6 lg:grid-cols-11 gap-10 w-full mb-4 -mt-20">
          <Column span2={false}>
            <p className="font-semi text-xl md:text-2xl lg:text-3xl mb-4 object-cover font-semibold">
              Perfectly Crispy and Flavorful.
            </p>
            <div className={`overflow-hidden aspect-[3/4.5] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[background]} rounded-lg`}>
              <img className="bg-gray-100 aspect-[3/4.5] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.tmecosys.com%2Fimage%2Fupload%2Ft_web767x639%2Fimg%2Frecipe%2Fras%2FAssets%2F364d0f265f38e66f4549b746c1dd9c32%2FDerivates%2F845fa8930920a2fdbdb48e31a1a3d5b59675ed95.jpg&f=1&nofb=1&ipt=1fe60df92ba7bec3ac45cb4d9e01c4066fd2d99dc02c9fab31d72d6125df48fe&ipo=images" />
            </div>
            <div className="lg:h-12 lg:w-full">
            </div>
          </Column>
          <Column span2={false}>
            <p className="font-poppins sm:text-mds md:text-md lg:text-lg xl:text-xl mb-4 text-justify tracking-tight pb-2">
              Bola kentang lembut dengan isian daging ayam atau sapi dan butter, dilapisi kulit renyah, cocok sebagai camilan gurih untuk acara spesial.
            </p>
            <div className={`overflow-hidden aspect-[1/1] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[background]} rounded-lg`}>
              <img className="bg-gray-100 aspect-[1/1] w-full object-cover rounded-lg shadow-md scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src="https://live.staticflickr.com/5655/23240281263_4c75d47de2_b.jpg" />
            </div>
          </Column>
          <Column span2={true}>
            <div className={`overflow-hidden aspect-[10/12] bg-gray-100 w-full rounded-lg border-8 ${LighterBorderColors[background]} rounded-lg`}>
              <img className="aspect-[10/12] object-cover scale-105 hover:scale-110 transition ease-in-out duration-300" draggable="false" alt="Product" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fappetizersandpartyrecipes.com%2Fwp-content%2Fuploads%2F2018%2F12%2FBeef-Bitterballen-Recipe.jpg&f=1&nofb=1&ipt=b3bedaf3c32d4f7e8316ecb27dd440cdb2f85074518337f1f2bd1f818d851e97&ipo=images" />
            </div>
            <div className="bg-secondary-400 p-2 flex flex-col gap-2 rounded-lg">
              <div className="lg:w-full flex w-full gap-2 bg-secondary-300 rounded-lg">
                <AddToCartButton color={background} />
              </div>
            </div>
          </Column>
        </div>
      </Container>
      <div className={`absolute left-0 right-0 -mt-[16rem] md:h-[6rem] -z-10 ${LighterBackgroundColors[background]}`} />
      <Container>
        <h4 className="w-full text-center text-3xl font-semi mt-4">Cocok ditambah dengan</h4>
        <div className="flex mt-6 w-full lg:w-5/6 bg-secondary-250 p-8 gap-20 justify-between">
          <div className="bg-slate-200 aspect-[1/1] w-1/4"></div>
          <div className="bg-slate-200 aspect-[1/1] w-1/4"></div>
          <div className="bg-slate-200 aspect-[1/1] w-1/4"></div>
        </div>
      </Container>
    </>
  )
}

type ColumnProps = {
  span2: boolean
  children?: React.ReactNode

}

function Column
  (
    { span2, children }: ColumnProps,) {
  return (
    <div className={"" + (span2 ? "col-span-6 lg:col-span-5" : "col-span-3")}>
      <div className="flex items-end justify-end flex h-full w-full">
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  )
}

function AddToCartButton({ color }: { color: string }) {
  const hoverVariant = {
    default: { width: "0%" },
    hover: { width: "100%" },
  }

  return (
    <motion.a className={`border ${color} grow text-white hover:text-black transition ease-in-out duration-300 rounded-lg h-12`} href="/">
      <motion.div className='relative z-50 flex h-full' initial="default" whileHover="hover">
        <p className="flex w-full justify-center items-center font-bold tracking-wide text-lg">
          Tambah Ke Keranjang --/
        </p>
        <motion.div variants={hoverVariant} className='absolute bg-secondary-250 w-10 top-0 bottom-0 z-[-1] rounded-lg'>
        </motion.div>
      </motion.div>
    </motion.a >
  )
}