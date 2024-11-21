import { FC, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React from "react";
import { InterestRatePreview } from "@/features/mortgageCalculator/InterestRatePreview";
import { Calculator } from "@/features/mortgageCalculator/Calculator";
import { CalculationResultProps } from "@/features/mortgageCalculator/types";
import { Card, DataTable } from "react-native-paper";

/**
 * Composite component that displays the InterestRatePreview and Calculator components
 */
export const MortgageCalculatorScreen: FC = () => {
  const [calculateResult, setCalculateResult] =
    useState<CalculationResultProps | null>(null);
  const dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <InterestRatePreview />
        <Calculator
          onResult={(result) => {
            setCalculateResult(result);
          }}
        />
        {calculateResult && (
          <Card style={{ marginBottom: 16 }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title>Cost</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Monthly Payments</DataTable.Cell>
                <DataTable.Cell>
                  {dollarFormat.format(calculateResult.monthlyPayments)}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Total Interest Paid</DataTable.Cell>
                <DataTable.Cell>
                  {dollarFormat.format(calculateResult.totalInterest)}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Total Payments</DataTable.Cell>
                <DataTable.Cell>
                  {dollarFormat.format(calculateResult.totalPayment)}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
