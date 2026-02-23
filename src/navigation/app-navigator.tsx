import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/welcome/welcome';
import { RegisterScreen } from '../screens/register/register';
import { colors } from '../theme/design-system';
import { useAuthStore } from '../store/auth.store';
import { RoutineScheduleScreen } from '../screens/routine-schedule/routine-schedule';

export type RootStackParamList = {
    Welcome: undefined,
    Register: undefined,
    RoutineSchedule: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: {
                    backgroundColor: colors.navigationBackground
                },
                animationDuration: 450,
            }}
        >
            {user ? 
                <Stack.Screen name='RoutineSchedule' component={RoutineScheduleScreen} />
                : (
                    <>
                        <Stack.Screen name='Welcome' component={WelcomeScreen} />
                        <Stack.Screen name='Register' component={RegisterScreen} />
                    </>
                )
            }
            
        </Stack.Navigator>
    );
}
