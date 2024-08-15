import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";

const DashboardLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "Transactions",
            headerTitleStyle: {
              fontFamily: "CircularStd-Bold"
            },
            headerTitleAlign: "center",
            navigationBarColor: "#FFFFFF",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#FFFFFF"
            },
          }}
        />
        <Stack.Screen
          name="trxdetail/[details]"
          options={{
            title: "Details",
            headerTitleStyle: {
              fontFamily: "CircularStd-Bold"
            },
            headerTitleAlign: "center",
            navigationBarColor: "#FFFFFF",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#FFFFFF"
            },
          }}
        />
        <Stack.Screen
          name="kyc/kycForm"
          options={{
            title: "KYC Verification",
            headerTitleStyle: {
              fontFamily: "CircularStd-Bold"
            },
            headerTitleAlign: "center",
            navigationBarColor: "#FFFFFF",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#FFFFFF"
            },
          }}
        />
        <Stack.Screen
          name="transactions"
          options={{
            title: "Transactions",
            headerTitleStyle: {
              fontFamily: "CircularStd-Bold"
            },
            headerTitleAlign: "center",
            navigationBarColor: "#FFFFFF",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#FFFFFF"
            },
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#F7F7F7" style="auto" />
    </>
  );
};

export default DashboardLayout;