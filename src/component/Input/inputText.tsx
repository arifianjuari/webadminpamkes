import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import ErrorText from "../Typography/ErrorText";
import { Row } from "react-bootstrap";

interface InputTextProps {
  labelTitle: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  readonly?: boolean;
  errorMessage?: string;
  updateFormValue: (arg: { updateType: string; value: string }) => void;
  updateType: string;
}

const InputText: React.FC<InputTextProps> = ({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  readonly,
  errorMessage,
}) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const updateInputValue = (val: string) => {
    setValue(val);
    updateFormValue({
      updateType,
      value: val,
    });
  };

  return (
    <Form.Group className={`mb-3 ${containerStyle}`}>
      <Form.Label
        className={`text-base-content text-xs font-bold ${labelStyle}`}
      >
        {labelTitle}
      </Form.Label>
      <Form.Control
        id={labelTitle}
        type={type || "text"}
        value={value || ""}
        readOnly={readonly || false}
        placeholder={placeholder || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateInputValue(e.target.value)
        }
        className="form-control-xs"
      />
      {errorMessage && errorMessage.includes(labelTitle!) ? (
        <Row className="ml-1">
          <ErrorText styleClass="mt-2 text-red-500 text-xs content-start">
            {errorMessage}
          </ErrorText>
        </Row>
      ) : null}
    </Form.Group>
  );
};

export default InputText;
