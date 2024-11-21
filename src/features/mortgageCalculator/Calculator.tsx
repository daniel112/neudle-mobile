import {
  CalculationResultProps,
  CalculatorFormData,
  LoanTerms,
} from "@/features/mortgageCalculator/types";
import { calculatePayments } from "@/features/mortgageCalculator/utils/calculatePayments";
import { DollarInput } from "@/shared/components/DollarInput";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

interface CalculatorProps {
  onResult: (result: CalculationResultProps) => void;
}

export const Calculator: FC<CalculatorProps> = ({ onResult }) => {
  const { control, handleSubmit } = useForm<CalculatorFormData>({
    defaultValues: {
      loanAmount: 400000,
      interestRate: 6.5,
      loanTerms: LoanTerms["30 years"],
    },
  });
  const onSubmit = (data: CalculatorFormData) => {
    const result = calculatePayments(data);
    onResult(result);
  };
  return (
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
              keyboardType="numeric"
              onChangeText={onChange}
              value={value.toString()}
            />
          )}
          name="interestRate"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={"Loan Terms"}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
              value={value.toString()}
            />
          )}
          name="loanTerms"
        />
        <Button mode={"contained"} onPress={handleSubmit(onSubmit)}>
          Calculate
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoSurface: { marginVertical: 16, height: 200 },
  scrollView: { gap: 16, paddingBottom: 20 },
});
