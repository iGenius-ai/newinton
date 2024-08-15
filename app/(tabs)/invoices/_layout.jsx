import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";

const InvoicesLayout = () => {
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
            title: "",
            navigationBarColor: "#F7F7F7",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#F7F7F7"
            }
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            title: "",
            navigationBarColor: "#F7F7F7",
            headerShadowVisible: false,
            headerBackTitleVisible: true,
            headerStyle: {
              backgroundColor: "#F7F7F7"
            }
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#F7F7F7" style="auto" />
    </>
  );
};

export default InvoicesLayout;