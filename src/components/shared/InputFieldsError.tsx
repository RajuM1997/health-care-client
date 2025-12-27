import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface FieldErrorProps {
  field: string;
  state: IInputErrorState;
}

const InputFieldsError = ({ field, state }: FieldErrorProps) => {
  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className="text-red-500">
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }
  return null;
};

export default InputFieldsError;
