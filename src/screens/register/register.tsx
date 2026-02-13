import React from 'react';
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

export const RegisterScreen = () => {
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
                            />

                            <TextInput
                                style={styles.input}
                                label={'Пароль'}
                                mode='outlined'
                                secureTextEntry
                            />

                            <TextInput
                                style={styles.input}
                                label={'Имя'}
                                mode='outlined'
                            />

                            <Button
                                mode='contained'
                                style={styles.primaryButton}
                                contentStyle={styles.primaryButtonContent}
                            >   
                                Продолжить
                            </Button>

                            <TouchableOpacity>
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
