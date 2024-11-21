import {
  ActivityIndicator,
  DataTable,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { useMortgageRatesRecent } from "@/features/mortgageCalculator/hooks/useMortgageRatesRecent";
import { useQueryFocusAware } from "@/shared/hooks/useQueryFocusAware";

interface InterestRatePreviewProps {
  state?: string;
}

/**
 * Displays average interest rate for the given state
 */
export const InterestRatePreview: FC<InterestRatePreviewProps> = ({
  state = "AZ",
}) => {
  const isFocused = useQueryFocusAware();
  const theme = useTheme();
  const { data: list, isLoading } = useMortgageRatesRecent({
    queryOptions: { enabled: isFocused },
  });

  return (
    <Surface style={styles.infoSurface} elevation={2}>
      <Text style={styles.headerText} variant="titleMedium">
        Current National Mortgage Rates
      </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.lastUpdatedContainer}>
            <Text variant="labelSmall">Last Updated: </Text>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.secondary, fontStyle: "italic" }}
            >
              {`${list?.[0].data.week}`}
            </Text>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title> </DataTable.Title>
              <DataTable.Title numeric>INTEREST</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.rowDescription}>
                30 Year Fixed
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {list?.[0].data.frm_30 ?? 0}%
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.rowDescription}>
                15 Year Fixed
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {list?.[0].data.frm_15 ?? 0}%
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  infoSurface: { marginVertical: 16, minHeight: 200, padding: 16 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  rowDescription: { fontWeight: "bold" },
  lastUpdatedContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
