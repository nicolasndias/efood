import {
  ContainerFood,
  ImagemFood,
  TitleFood,
  DescriptionFood,
  StyledButton
} from './styles'

type FoodProps = {
  foto: string
  nome: string
  descricao: string
  preco: number
  porcao: string
  onClick?: () => void
}

export default function Food({
  onClick,
  foto,
  descricao,
  nome,
  preco
}: FoodProps) {
  const limitarDescricao = (descricao: string) => {
    return descricao.length > 150 ? descricao.slice(0, 150) + '...' : descricao
  }

  return (
    <ContainerFood onClick={onClick}>
      <ImagemFood src={foto} />
      <div onClick={onClick}>
        <TitleFood>{nome}</TitleFood>
        <DescriptionFood>{limitarDescricao(descricao)}</DescriptionFood>
        <StyledButton>Adicionar ao carrinho </StyledButton>
      </div>
    </ContainerFood>
  )
}
