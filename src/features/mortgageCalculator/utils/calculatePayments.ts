import {
  CalculationResultProps,
  CalculatorFormData,
} from "@/features/mortgageCalculator/types";

export const calculatePayments = (
  formData: CalculatorFormData,
): CalculationResultProps => {
  const { loanAmount, interestRate, loanTerms } = formData;

  const monthlyInterestRate = interestRate / 100 / 12; // i
  const totalNumOfPayments = loanTerms * 12; // n

  // Calculate monthly mortgage payment.
  const monthlyPaymentAmount =
    (loanAmount * monthlyInterestRate) /
    (1 - 1 / Math.pow(1 + monthlyInterestRate, totalNumOfPayments));
  const totalPayment = totalNumOfPayments * monthlyPaymentAmount;

  return {
    monthlyPayments: monthlyPaymentAmount,
    totalPayment,
    totalInterest: totalPayment - loanAmount,
  };
};
