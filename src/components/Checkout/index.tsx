import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../store'

import {
  clear,
  closeOrder,
  closePayment,
  openPayment
} from '../../store/reducers/Cart'

import { usePurchaseMutation } from '../../services/api'

import {
  OrderContainer,
  OrderTitle,
  OrderDescription,
  OrderButton,
  OrderRow,
  LabelContainer,
  ErrorMessage
} from './styles'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isPayment, items } = useSelector((state: RootState) => state.cart)

  const [purchase, { data, isSuccess, error }] = usePurchaseMutation()

  const fecharPagamento = () => dispatch(closePayment())
  const fecharPedido = () => dispatch(closeOrder())
  const abrirPagamento = () => dispatch(openPayment())
  const limparPedido = () => dispatch(clear())

  const finalizarPedido = () => {
    fecharPagamento()
    navigate('/')
    limparPedido()
  }

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  }

  const formikEntrega = useFormik({
    initialValues: {
      name: '',
      endereco: '',
      cidade: '',
      cep: '',
      numero: '',
      complemento: ''
    },

    validationSchema: Yup.object({
      name: Yup.string().required('O nome é obrigatório'),
      endereco: Yup.string().required('O endereço é obrigatório'),
      cidade: Yup.string().required('A cidade é obrigatória'),
      cep: Yup.string().required('O CEP é obrigatório'),
      numero: Yup.string().required('O número é obrigatório')
    }),

    onSubmit: () => {
      abrirPagamento()
    }
  })

  const formikPagamento = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cvv: '',
      dueMonth: '',
      dueYear: ''
    },

    validationSchema: Yup.object({
      cardName: Yup.string().required('Nome obrigatório'),
      cardNumber: Yup.string().required('Número obrigatório'),
      cvv: Yup.string().required('CVV obrigatório'),
      dueMonth: Yup.string().required('Mês obrigatório'),
      dueYear: Yup.string().required('Ano obrigatório')
    }),

    onSubmit: (values) => {
      purchase({
        products: items.map((item) => ({
          id: item.id,
          price: item.preco
        })),
        delivery: {
          receiver: formikEntrega.values.name,
          address: {
            descricao: formikEntrega.values.endereco,
            city: formikEntrega.values.cidade,
            zipcode: formikEntrega.values.cep,
            number: Number(formikEntrega.values.numero),
            complement: formikEntrega.values.complemento
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cvv),
            expires: {
              month: Number(values.dueMonth),
              year: Number(values.dueYear)
            }
          }
        }
      })
    }
  })

  if (error) {
    return (
      <OrderContainer>
        <OrderTitle>Erro ao realizar o pedido</OrderTitle>
        <OrderButton onClick={fecharPedido}>Voltar</OrderButton>
      </OrderContainer>
    )
  }

  return (
    <OrderContainer>
      {data && isSuccess ? (
        <>
          <OrderTitle>Pedido realizado - {data.orderId}</OrderTitle>

          <OrderDescription>
            Seu pedido está sendo preparado e em breve será entregue.
          </OrderDescription>

          <OrderButton className="marginTop" onClick={finalizarPedido}>
            Concluir
          </OrderButton>
        </>
      ) : (
        <>
          {isPayment ? (
            <form onSubmit={formikPagamento.handleSubmit}>
              <OrderTitle>
                Pagamento - valor a pagar R$ {getTotalPrice().toFixed(2)}
              </OrderTitle>

              <OrderRow>
                <LabelContainer>
                  <label>Nome no cartão</label>
                  <input
                    name="cardName"
                    value={formikPagamento.values.cardName}
                    onChange={formikPagamento.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>Número do cartão</label>
                  <input
                    name="cardNumber"
                    value={formikPagamento.values.cardNumber}
                    onChange={formikPagamento.handleChange}
                  />
                </LabelContainer>

                <LabelContainer width="80px">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={formikPagamento.values.cvv}
                    onChange={formikPagamento.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>Mês</label>
                  <input
                    name="dueMonth"
                    value={formikPagamento.values.dueMonth}
                    onChange={formikPagamento.handleChange}
                  />
                </LabelContainer>

                <LabelContainer>
                  <label>Ano</label>
                  <input
                    name="dueYear"
                    value={formikPagamento.values.dueYear}
                    onChange={formikPagamento.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderButton type="submit">Finalizar pagamento</OrderButton>

              <OrderButton type="button" onClick={fecharPagamento}>
                Voltar
              </OrderButton>
            </form>
          ) : (
            <form onSubmit={formikEntrega.handleSubmit}>
              <OrderTitle>Entrega</OrderTitle>

              <OrderRow>
                <LabelContainer>
                  <label>Quem irá receber</label>
                  <input
                    name="name"
                    value={formikEntrega.values.name}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>Endereço</label>
                  <input
                    name="endereco"
                    value={formikEntrega.values.endereco}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>Cidade</label>
                  <input
                    name="cidade"
                    value={formikEntrega.values.cidade}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>CEP</label>
                  <input
                    name="cep"
                    value={formikEntrega.values.cep}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>

                <LabelContainer>
                  <label>Número</label>
                  <input
                    name="numero"
                    value={formikEntrega.values.numero}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label>Complemento</label>
                  <input
                    name="complemento"
                    value={formikEntrega.values.complemento}
                    onChange={formikEntrega.handleChange}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderButton type="submit">Continuar com pagamento</OrderButton>

              <OrderButton type="button" onClick={fecharPedido}>
                Voltar para o carrinho
              </OrderButton>
            </form>
          )}
        </>
      )}
    </OrderContainer>
  )
}

export default Checkout
