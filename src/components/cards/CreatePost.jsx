import styled from "styled-components";
import H4 from "../typography/H4"
import TextArea from "../inputs/Textarea";
import Button from "../inputs/Button"
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { createPostSchema } from "../../../modules/post/post.schema"
import axios from "axios";
import ControlledTextArea from "../inputs/ControllerTextArea";
import { useSWRConfig } from "swr";
import { useState } from "react";

const PostContainer = styled.div`
  background-color: ${props => props.theme.white};
  padding: 20px 40px;

  @media (max-width: 500px) {
    padding: 20px;
  }
`
const Title = styled.div`
  font-weight: bold;
  text-align: center;
`

const TextContainer = styled.div`
  margin: 20px 0;
  width: 100%;
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    gap: 5px;
  }
`

const BottomText = styled.p`
  flex: 1;
`
function CreatePost({ userName }) {
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const { control, handleSubmit, formState: { isValid }, reset } = useForm({
    resolver: joiResolver(createPostSchema),
    mode: 'all'
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, data)
      if (response.status === 201) {
        reset()
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/post`)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <PostContainer>
      <H4><Title>No que você esta pensando, @{userName}</Title></H4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextContainer>
          <ControlledTextArea
            placeholder="Digite sua mensagem"
            rows="4" control={control}
            name="text"
            maxLength="256"
          />
        </TextContainer>
        <BottomContainer>
          <BottomText>
            A sua mensagem será publica
          </BottomText>
          <Button loading={loading} disabled={!isValid}>Postar Mensagem</Button>
        </BottomContainer>
      </form>
    </PostContainer>
  )
}

export default CreatePost