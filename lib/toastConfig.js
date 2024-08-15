import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Outfit-Medium',
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'Outfit-Regular',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Outfit-Medium',
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'Outfit-Regular',
      }}
    />
  ),
};