import React from 'react';
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
import { styles } from './register.style';
import { useAuthStore } from '../../store/auth.store';

export const RegisterScreen = () => {
    const createLocalUser = useAuthStore(state => state.createLocalUser)
    const registerUser = useAuthStore(state => state.registerUser);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = () => {
        if (!email.trim()) {
            return;
        }

        registerUser({ name, email });
    }

    const handleContinueWithoutRegistration = () => {
        createLocalUser();
    }

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
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                keyboardType='email-address'
                            />

                            <TextInput
                                style={styles.input}
                                label={'Пароль'}
                                mode='outlined'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TextInput
                                style={styles.input}
                                label={'Имя'}
                                mode='outlined'
                                value={name}
                                onChangeText={setName}
                            />

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
