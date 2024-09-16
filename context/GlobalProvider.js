import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/newinton";
import Toast from "react-native-toast-message";
import { toastConfig } from "../lib/toastConfig";
import * as SecureStore from 'expo-secure-store';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const userData = await getCurrentUser();
          if (userData) {
            setIsLogged(true);
            setUser(userData);
          } else {
            // Token exists but user data fetch failed, clear token
            await SecureStore.deleteItemAsync('userToken');
            setIsLogged(false);
            setUser(null);
          }
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
      <Toast config={toastConfig} />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;