import * as React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './welcome.style';
import { RootStackParamList } from '../../navigation/app-navigator';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export const WelcomeScreen = () => {
    const navigation = useNavigation<NavProp>();

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/welcome_img.png')}
                resizeMode='contain'
                style={styles.image}
            />

            <View style={styles.content}>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>Dozen</Text>
                    <Text style={styles.subtitle}>Ваш незаменимый помошник в управлении личным временем</Text>
                </View>

                <Button
                    mode='contained'
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={() => navigation.navigate('Register')}
                >
                    Начать
                </Button>
            </View>
        </View>
    )
}
