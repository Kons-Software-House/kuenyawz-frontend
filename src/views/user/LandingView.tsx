import { Link } from "react-router-dom";
import { Cookie, CalendarRange, MailQuestion } from "lucide-react";

import TransitionLayer from "../../components/user/core/TransitionLayer";
import HorizontalScroller from "../../components/user/views/LandingView/HorizontalScroller";

export default function LandingView() {
  return (
    <>
      <TransitionLayer />
      <div className='h-10 sm:h-14 lg:h-16 bg-secondary-100'>
      </div>
      <HorizontalScroller />
      <div className='lg:h-[28rem] grid md:grid-cols-3 lg:grid-rows-3'>
        <Column background='bg-secondary-300' header='Produk Kami' description='Kelezatan Dalam Setiap Kreasi' href='/products'>
          <div className='bg-white h-4/6 w-11/12 aspect-[1/1] shadow-lg order-last md:order-first'>
            <Cookie color="#cfb285" className="w-full h-full p-6" />
          </div>
        </Column>
        <Column background='bg-secondary-200' header='Kalender' description='Perayaan Anda, Kreasi Kami' href='/calendar'>
          <div className='bg-white h-4/6 w-11/12 aspect-[1/1] shadow-lg order-last md:order-first'>
            <CalendarRange color="#cfb285" className="w-full h-full p-6" />
          </div>
        </Column>
        <Column background='bg-secondary-100' header='Tentang Kami' description='Ciptakan Pertemuan Manis' href='/about'>
          <div className='bg-white h-4/6 w-11/12 aspect-[1/1] shadow-lg order-last md:order-first relative'>
            <MailQuestion color="#cfb285" className="w-full h-full p-6" />
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
    <Link to={href} className={`${background}` + ' grow flex justify-center items-center px-[20%] pt-10 pb-10 md:pt-20 md:pb-20 hover:bg-secondary-400 transition ease-in-out duration-300 h-[28rem]'}>
      <div className='h-full w-full flex flex-col items-center gap-4 justify-between'>
        {children}
        <div className="lg:h-2/6">
          <h2 className='font-fancy text-4xl text-center font-bold tracking-wide'>{header}</h2>
          <p className='font-semi text-xl text-center'>{description}</p>
        </div>
      </div>
    </Link>
  );
}