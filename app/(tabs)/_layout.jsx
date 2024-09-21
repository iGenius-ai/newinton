import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { DocumentText1, FolderOpen, Home3, MoreCircle } from "iconsax-react-native";

const TabIcon = ({ IconComponent, color, variant, textColor, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <IconComponent color={color} size={24} variant={variant} />
      <Text className="mt-1" style={{
        fontFamily: focused ? 'CircularStd-Medium' : 'CircularStd-Book',
        fontSize: 12,
        color: textColor
      }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#8a8b8b",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E3E7ED",
            height: 90,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                IconComponent={Home3}
                variant={focused ? "Bold" : "Outline"}
                color={focused ? "#37a19a" : "#D0D4DD"} textColor={focused ? "#37a19a" : "#101828"}
                name="Dashboard"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="documents"
          options={{
            title: "Documents",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                IconComponent={FolderOpen}
                variant={focused ? "Bold" : "Outline"}
                color={focused ? "#37a19a" : "#D0D4DD"} textColor={focused ? "#37a19a" : "#101828"}
                name="Documents"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="invoices"
          options={{
            title: "Invoices",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                IconComponent={DocumentText1}
                variant={focused ? "Bold" : "Outline"}
                color={focused ? "#37a19a" : "#D0D4DD"} textColor={focused ? "#37a19a" : "#101828"}
                name="Invoices"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={MoreCircle}
                variant={focused ? "Bold" : "Outline"}
                color={focused ? "#37a19a" : "#D0D4DD"} textColor={focused ? "#37a19a" : "#101828"}
                name="More"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#F7F7F7" style="auto" />
    </>
  );
};

export default TabLayout;
