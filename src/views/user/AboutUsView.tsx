import PhoneIcon from "../../assets/AboutUs/PhoneIcon.png";
import Container from "../../components/user/core/Container";
import PinpointIcon from "../../assets/AboutUs/PinpointIcon.png";
import InstagramIcon from "../../assets/AboutUs/InstagramIcon.png";
import UpperSection from "../../components/user/core/UpperSection";
import { formatPhoneNumber } from "../../types/Formatter";

export default function AboutUsView() {
  return (
    <>
      <UpperSection title="Tentang Kami" subtitle="Ciptakan Pertemuan Manis" />
      <Container>
        <section className="lg:mx-10 flex flex-col md:p-20">
          <h3 className="font-clear text-sm mt-4 lg:mt-0 lg:text-lg mb-8">
            Kuenya WZ siap membantu Anda! Hubungi kami untuk pemesanan kue, pastry, camilan, atau pertanyaan seputar layanan catering kami. Kami senang bisa menjadi bagian dari momen spesial Anda.
          </h3>
          <div className="flex gap-4 mb-2">
            <div className="">
              <img className="w-14 md:h-14" src={PinpointIcon} alt="" />
            </div>
            <div className="grid grid-rows-2">
              <h3 className="font-clear text-text-dark text-lg md:text-xl tracking-tight">Kuenya WZ
              </h3>
              <p className="font-clear text-text-light text-sm md:text-lg">
                Jl. Belimbing No. 9F, Jagakarsa, Jakarta Selatan, 12620
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-2">
            <div className="flex p-1">
              <img className="h-10 md:h-12" src={PhoneIcon} alt="" />
            </div>
            <div className="grid grid-rows-2">
              <h3 className="font-clear text-text-dark text-lg md:text-xl tracking-tight">Telepon & WhatsApp
              </h3>
              <p className="font-clear text-text-light text-sm md:text-lg">
                {formatPhoneNumber(import.meta.env.VITE_ADMIN_PHONE as string)}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex p-2">
              <img className="h-8 md:h-10" src={InstagramIcon} alt="" />
            </div>
            <div className="grid grid-rows-2">
              <h3 className="font-clear text-text-dark text-lg md:text-xl tracking-tight">Instagram
              </h3>
              <p className="font-clear text-text-light text-sm md:text-lg underline underline-offset-2" onClick={() => window.open("https://www.instagram.com/kuenyawz")}>
                @kuenyawz
              </p>
            </div>
          </div>
        </section>

      </Container >
    </>
  )
}