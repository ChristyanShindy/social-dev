import TextArea from "./Textarea";
import { useController } from "react-hook-form";

const ControlledTextArea = ({ name, control, defaultValue = '', ...props }) => {
  const { 
    field: { value, onChange}
  } = useController({ name, control, defaultValue })

  return (
    <TextArea { ...props } value={value} onChange={onChange} />
  )
}

export default ControlledTextArea