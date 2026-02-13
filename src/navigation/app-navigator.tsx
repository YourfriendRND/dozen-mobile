import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/welcome/welcome';
import { RegisterScreen } from '../screens/register/register';
import { colors } from '../theme/design-system';

export type RootStackParamList = {
    Welcome: undefined,
    Register: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: {
                    backgroundColor: colors.navigationBackground
                },
                animationDuration: 450,
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    );
}
