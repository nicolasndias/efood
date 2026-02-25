import { useParams } from 'react-router-dom'
import { CardapioItem, Restaurants } from '../Home'
import { useEffect, useState } from 'react'
import HeaderPerfil from '../../components/HeaderPerfil'
import FoodList from '../../components/FoodList'
import Cart from '../../components/Cart'
import Footer from '../../components/Footer'

const Perfil = () => {
  const [restaurante, setRestaurante] = useState<Restaurants | null>(null)
  const { id } = useParams()

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => {
        const restauranteEncontrado = res.find(
          (r: Restaurants) => r.id === Number(id)
        )

        if (restauranteEncontrado) {
          const cardapioCorrigido: CardapioItem[] =
            restauranteEncontrado.cardapio.map((item: any) => ({
              ...item,
              preco: Number(item.preco)
            }))

          setRestaurante({
            ...restauranteEncontrado,
            cardapio: cardapioCorrigido
          })
        }
      })
  }, [id])

  if (!restaurante) {
    return <h2>Carregando...</h2>
  }

  return (
    <>
      <HeaderPerfil
        tipo={restaurante.tipo}
        titulo={restaurante.titulo}
        capa={restaurante.capa}
      />
      <FoodList />
      <Cart />
      <Footer />
    </>
  )
}

export default Perfil
