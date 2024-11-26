import { Link } from "react-router-dom";

import TransitionLayer from "../../components/user/core/TransitionLayer";
import HorizontalScroller from "../../components/user/views/LandingView/HorizontalScroller";

export default function LandingView() {
  return (
    <>
      <TransitionLayer />
      <div className='h-16 bg-secondary-100'>
      </div>
      <HorizontalScroller />
      <div className='h-[28rem] grid grid-cols-3'>
        <Column background='bg-secondary-300' header='Produk Kami' description='Kelezatan Dalam Setiap Kreasi' href='/menu'>
          <div className='bg-white h-1/2 w-11/12 shadow-lg'>
          </div>
        </Column>
        <Column background='bg-secondary-200' header='Kalender' description='Perayaan Anda, Kreasi Kami' href='/kalender'>
          <div className='bg-white h-1/2 w-11/12 shadow-lg'>
          </div>
        </Column>
        <Column background='bg-secondary-100' header='Tentang Kami' description='Ciptakan Pertemuan Manis' href='/tentang-kami'>
          <div className='bg-white h-1/2 w-11/12 shadow-lg'>
          </div>
        </Column>
      </div >
    </>
  );
}

type ColumnProps = {
  children: React.ReactNode;
  background: "bg-secondary-100" | "bg-secondary-200" | "bg-secondary-300";
  header: string;
  description: string;
  href: string;
};

function Column(
  { children, background, header, description, href }: ColumnProps
) {
  return (
    <Link to={href} className={`${background}` + ' grow flex justify-center items-center px-[20%] py-[6%] hover:bg-secondary-400 transition ease-in-out duration-300'}>
      <div className='h-full w-full flex flex-col gap-4 items-center justify-center'>
        {children}
        <h2 className='font-fancy text-4xl text-center font-bold tracking-wide'>{header}</h2>
        <p className='font-semi text-xl text-center'>{description}</p>
      </div>
    </Link>
  );
}