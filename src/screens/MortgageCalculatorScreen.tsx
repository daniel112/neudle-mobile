import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-paper";

import React from "react";
import { DollarInput } from "@/shared/components/DollarInput";

export const MortgageCalculatorScreen: FC = () => {
  const { control } = useForm({
    defaultValues: {
      loanAmount: 0,
      interestRate: 6.5,
    },
  });
  // const onSubmit = (data) => {
  //   console.log("Form Data:", data);
  // };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Controller
            name="loanAmount"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <DollarInput
                label="Loan Amount"
                onChangeValue={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={"Interest Rate"}
                placeholder="interest rate"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
              />
            )}
            name="interestRate"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: { gap: 16, paddingBottom: 20 },
});
