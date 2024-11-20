import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/shared/components/navigation/TabBarIcon";
import { useTheme } from "react-native-paper";

// NOTE: Layout files in a directory are used to define shared UI elements such as headers, tab bars so that they persist between different routes.

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trivia",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CalculatorTab"
        options={{
          title: "Mortgage Calculator",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
