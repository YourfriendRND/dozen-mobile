import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
    View, 
    ImageBackground, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ScrollView,
} from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Crypto from 'expo-crypto';

import { RootStackParamList } from '../../navigation/app-navigator';
import { styles } from './register.style';
import { useAuthStore } from '../../store/auth.store';
import { authService, tokenService } from '../../services';
import { isNetworkError } from '../../common/is-network-error';
import { Alert } from '../../components/ui/alert';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export const RegisterScreen = () => {
    const navigation = useNavigation<NavProp>();
    const createLocalUser = useAuthStore(state => state.createLocalUser)
    const registerUser = useAuthStore(state => state.registerUser);

    const user = useAuthStore(state => state.user);

    const [emailRaw, setEmailRaw] = useState('');
    const [nameRaw, setNameRaw] = useState('');
    const [passwordRaw, setPasswordRaw] = useState('');
    const [error, setError] = useState('');
    const [secure, setSecure] = useState(true)
    const [status, setStatus] = useState<'idle' | 'warning' | 'error'>('idle');

    useEffect(() => {
        if (user?.isNeedToSync) {
            setEmailRaw(user?.email ?? '');
            setNameRaw(user?.name ?? '');
            setStatus('warning');
        }
    }, [user])

    const handleRegister = async () => {
        setError('');
        setStatus('idle');

        const email = emailRaw.trim();
        const name = nameRaw.trim();
        const password = passwordRaw.trim();

        if (!email || !password || !name) {
            setError('Пожалуйста заполните все обязательные поля');
            setStatus('error');
            return;
        }

        try {
            const id = user?.id ?? Crypto.randomUUID();
            const createdAt = user?.createdAt ?? new Date();

            const response = await authService.register({
                id,
                name,
                email,
                password,
                createdAt
            });

            const data = response.register;

            if (!data) {
                throw new Error('Failed fetch data from server')
            }

            await tokenService.saveToken(
                data.accessToken,
                data.refreshToken
            )

            registerUser({
                id: data.id,
                name: data.name,
                email: data.email,
                createdAt: data.createdAt,
                isNeedToSync: false,
            })

        } catch(err: unknown) {
            console.error(err);
            setStatus('error');

            if (isNetworkError(err)) {
                registerUser({ name, email, isNeedToSync: true })

                setError('Нет подключения к сети, повторите попытку позже');

                return;
            }

            if (err instanceof Error) {
                setError(err.message);
                return;
            }

            setError('Что-то пошло не так');

        }
    }

    const handleContinueWithoutRegistration = () => {
        createLocalUser();
        navigation.replace('RoutineSchedule');
    }
    // п3 вывод ошибок
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='on-drag'
                >

                    <View style={styles.container}>
                        <ImageBackground
                            source={require('../../../assets/register_header_logo.jpg')}
                            style={styles.header}
                            imageStyle={styles.headerImage}
                        >
                            <View style={styles.ovarlay} />
                            <Text style={styles.logo}>Dozen</Text>
                        </ImageBackground>

                        <View style={styles.content}>
                            <Text style={styles.title}>
                                Регистрация
                            </Text>

                            <TextInput
                                style={styles.input}
                                label={'Email'}
                                mode='outlined'
                                value={emailRaw}
                                onChangeText={setEmailRaw}
                                autoCapitalize='none'
                                keyboardType='email-address'
                            />

                            <TextInput
                                style={styles.input}
                                label={'Пароль'}
                                mode='outlined'
                                value={passwordRaw}
                                onChangeText={setPasswordRaw}
                                secureTextEntry={secure}
                                right={
                                    <TextInput.Icon icon={secure ? 'eye-off' : 'eye' } 
                                        onPress={() => setSecure((prev) => !prev)}
                                    />
                                }
                            />

                            <TextInput
                                style={styles.input}
                                label={'Имя'}
                                mode='outlined'
                                value={nameRaw}
                                onChangeText={setNameRaw}
                            />
                        {status === 'warning' && (
                            <Alert 
                                type='warning' 
                                message='Вы начали регистрацию, но не завершили ее. Пожалуйста, подтвердите данные'
                            />
                        )}

                        {status === 'error' ? <Alert type='error' message={error} /> : null}

                            <Button
                                mode='contained'
                                style={styles.primaryButton}
                                contentStyle={styles.primaryButtonContent}
                                onPress={handleRegister}
                            >   
                                Зарегистрировать аккаунт
                            </Button>

                            <TouchableOpacity onPress={handleContinueWithoutRegistration}>
                                <Text style={styles.secondaryAction}>
                                    Продолжить без регистрации
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                     
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
