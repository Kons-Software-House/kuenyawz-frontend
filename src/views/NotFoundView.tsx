import UpperSection from "../components/core/UpperSection";
import Container from "../components/core/Container";

export default function NotFoundView() {
  return (
    <>
      <UpperSection title="404" subtitle="Halaman Tidak Ditemukan" />
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-fancy text-primary-500">404</h1>
          <p className="text-lg font-fancy text-primary-500">Halaman yang Anda cari tidak ditemukan</p>
        </div>
      </Container>
    </>
  )
}