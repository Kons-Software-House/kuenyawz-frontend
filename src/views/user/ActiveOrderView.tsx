import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { Order } from "../../types/Order"
import { formatToIdr } from "../../types/Formatter"
import { retrieveOrder } from "../../services/OrderApiService"
import Container from "../../components/user/core/Container"
import UpperSection from "../../components/user/core/UpperSection"

export default function ActiveOrderView() {
  return (
    <>
      <UpperSection title="Pesanan Aktif" />
      <Container>

      </Container>
    </>
  )
}