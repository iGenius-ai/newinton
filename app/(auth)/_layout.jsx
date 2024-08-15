import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/dashboard" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify/otp"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/onboarding"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/create_profile"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/success"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reset_password"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="reset"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#F7F7F7" style="auto" />
    </>
  );
};

export default AuthLayout;
