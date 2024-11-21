import React from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * To be used in conjunction with react-query's `enabled` option.
 *
 * So we can only fetch data when the component is focused.
 */
export function useQueryFocusAware() {
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, []),
  );

  return () => focusedRef.current;
}
