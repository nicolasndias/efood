import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetRestauranteQuery } from '../../services/api'
import type { CardapioItem } from '../../pages/Home'
import Food from '../Food'
import { List } from './styles'
import { Container } from '../../styles'
import {
  Modal,
  ModalContent,
  BotaoFechar,
  ImageModal,
  ModalButton,
  Description,
  Title
} from './styles'
import { formataPreco } from '../../utils/formatters'
import { add, open } from '../../store/reducers/Cart'
import { Overlay } from '../Cart/styles'
import Fechar from '../../assets/images/fechar.png'

export default function FoodList() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)
  const [pratoSelecionado, setPratoSelecionado] = useState<CardapioItem | null>(
    null
  )

  // 🔥 Query segura sem non-null assertion
  const { data } = useGetRestauranteQuery(id as string, {
    skip: !id
  })

  const handleAddToCart = () => {
    if (pratoSelecionado) {
      dispatch(add(pratoSelecionado))
      dispatch(open())
      setModal(false)
      setPratoSelecionado(null)
    }
  }

  // Evita render caso ainda não tenha dados
  if (!data?.cardapio) return null

  return (
    <Container>
      <List>
        {data.cardapio.map((item) => (
          <Food
            key={item.id}
            onClick={() => {
              setPratoSelecionado({ ...item, quantidade: 1 })
              setModal(true)
            }}
            foto={item.foto}
            nome={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            porcao={item.porcao}
          />
        ))}
      </List>

      <Modal className={modal ? 'visivel' : ''}>
        {pratoSelecionado && (
          <ModalContent>
            <BotaoFechar
              src={Fechar}
              alt="Fechar"
              onClick={() => {
                setPratoSelecionado(null)
                setModal(false)
              }}
            />

            <ImageModal
              src={pratoSelecionado.foto}
              alt={pratoSelecionado.nome}
            />

            <div>
              <Title>{pratoSelecionado.nome}</Title>

              <Description>
                {pratoSelecionado.descricao}
                <span>{pratoSelecionado.porcao}</span>
              </Description>

              <ModalButton onClick={handleAddToCart}>
                Adicionar ao carrinho {formataPreco(pratoSelecionado.preco)}
              </ModalButton>
            </div>
          </ModalContent>
        )}

        <Overlay
          onClick={() => {
            setPratoSelecionado(null)
            setModal(false)
          }}
        />
      </Modal>
    </Container>
  )
}
