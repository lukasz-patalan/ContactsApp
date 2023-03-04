import Toast from 'react-native-root-toast';
import { Colors } from '../theme/colors';

export const showToast = (message: string, bg?: string) =>
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: 50,
    shadow: false,
    backgroundColor: bg || Colors.eucalyptus,
    opacity: 1,
    containerStyle: { borderRadius: 20, paddingHorizontal: 20 },
  });
