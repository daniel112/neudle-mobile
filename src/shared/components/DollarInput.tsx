import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import CurrencyInput from "react-native-currency-input";

interface DollarInputProps
  extends Omit<TextInputProps, "value" | "onChangeValue"> {
  value: number | null;
  onChangeValue: (value: number | null) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const DollarInput: React.FC<DollarInputProps> = ({
  value,
  onChangeValue,
  onBlur,
  placeholder = "Enter amount",
  ...props
}) => {
  return (
    <CurrencyInput
      value={value}
      onChangeValue={onChangeValue}
      onBlur={onBlur}
      prefix="$"
      delimiter=","
      separator="."
      precision={2}
      minValue={0}
      renderTextInput={(textInputProps) => (
        <TextInput
          {...(textInputProps as TextInputProps)}
          placeholder={placeholder}
        />
      )}
      {...props}
    />
  );
};
