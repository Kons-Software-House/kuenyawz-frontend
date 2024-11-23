import Container from "../../components/user/core/Container";
import UpperSection from "../../components/user/core/UpperSection";

import PhoneIcon from "../../assets/AboutUs/PhoneIcon.png";
import PinpointIcon from "../../assets/AboutUs/PinpointIcon.png";
import InstagramIcon from "../../assets/AboutUs/InstagramIcon.png";

export default function AboutUsView() {
  return (
    <>
      <UpperSection title="Kontak Kami" subtitle="Ciptakan Pertemuan Manis" />
      <Container>
        <section className="lg:mx-10 flex flex-col h-[60dvh] md:p-20">
          <h3 className="font-clear text-lg mb-8">
            Kuenya WZ siap membantu Anda! Hubungi kami untuk pemesanan kue, pastry, camilan, atau pertanyaan seputar layanan catering kami. Kami senang bisa menjadi bagian dari momen spesial Anda.
          </h3>
          <div className="flex gap-4 mb-2">
            <div className="">
              <img className="h-12 md:h-14" src={PinpointIcon} alt="" />
            </div>
            <div className="grid grid-rows-2">
              <h3 className="font-clear text-text-dark text-lg md:text-xl tracking-tight">Kuenya WZ
              </h3>
              <p className="font-clear text-text-light text-md md:text-lg">
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
              <p className="font-clear text-text-light text-md md:text-lg">
                0812-3456-7890
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
              <p className="font-clear text-text-light text-md md:text-lg">
                @kuenyawz
              </p>
            </div>
          </div>
        </section>

      </Container >
    </>
  )
}