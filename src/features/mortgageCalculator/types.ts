export enum LoanTerms {
  "15 years" = 15,
  "30 years" = 30,
}

export interface CalculatorFormData {
  loanAmount: number;
  interestRate: number;
  loanTerms: LoanTerms;
}

export interface CalculationResultProps {
  monthlyPayments: number;
  totalPayment: number;
  totalInterest: number;
}
