import ImageWithSpace from "../src/components/layout/ImageWithSpace"
import styled from "styled-components"
import Link from "next/link"
import H1 from "../src/components/typography/H1"
import H2 from "../src/components/typography/H2"
import H4 from "../src/components/typography/H4"
import Button from "../src/components/inputs/Button"
import Input from "../src/components/inputs/Input"
import { useState } from "react"

const FormContainer = styled.div`
margin-top: 60px
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 20px;
`

const Text = styled.p`
  text-align: center;
`
function SignupPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleForm = (event) => {
    event.preventDefault()
    console.log({
      firstName,
      lastName,
      user,
      email,
      password
    })
  }
  return(
    <ImageWithSpace>
      <H1># Social DEV</H1>
      <H4>Tudo que acontece no mundo DEV, acontece aqui!</H4>
      <FormContainer>
        <H2>Crie sua conta</H2>
        <Form onSubmit={handleForm}>
          <Input label="Nome" onChange={({ target }) => {setFirstName(target.value)}}/>
          <Input label="Sobrenome" onChange={({ target }) => {setlastName(target.value)}}/>
          <Input label="Usuário" onChange={({ target }) => {setUser(target.value)}}/>
          <Input label="Email" type="email" onChange={({ target }) => {setEmail(target.value)}}/>
          <Input label="Senha" type="password" onChange={({ target }) => {setPassword(target.value)}}/>
          <Button>Cadastrar</Button>
          <Text>Já possui uma conta? <Link href="/login">Faça seu login</Link></Text>
        </Form>
      </FormContainer>
    </ImageWithSpace>
  )
}

export default SignupPage