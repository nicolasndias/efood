import { Link } from 'react-router-dom'
import { Botao } from './styles'

type ButtonProps = {
  to: string
  title: string
  children: React.ReactNode
}

const Button = ({ to, title, children }: ButtonProps) => (
  <Botao as={Link} to={to} title={title}>
    {children}
  </Botao>
)

export default Button
