import UpperSection from "../../components/user/core/UpperSection";
import Container from "../../components/user/core/Container";

export default function NotFoundView() {
  return (
    <>
      <UpperSection title="404" subtitle="Halaman Tidak Ditemukan" />
      <Container>
        <div className="h-[60dvh] flex flex-col items-center">
          <h1 className="mt-12 text-4xl font-clear text-primary-500">404</h1>
          <p className="text-lg font-clear text-primary-500">Halaman yang Anda cari tidak ditemukan</p>
        </div>
      </Container>
    </>
  )
}
