import React from "react";
import { View, Text } from "react-native";
import { styles } from './alert.style';

type AlertType = 'error' | 'warning' | 'success';

interface AlertProps {
    type: AlertType,
    message: string,
}

export const Alert = ({ type, message }: AlertProps): React.JSX.Element => {
    const containerStyle = [
        styles.container,
        type === 'error' && styles.errorContainer,
        type === 'warning' && styles.warningContainer,
        type === 'success' && styles.successContainer
    ]

    const textStyle = [
        styles.text,
        type === 'error' && styles.errorText,
        type === 'warning' && styles.warningText,
        type === 'success' && styles.successText
    ]

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>
                {message}
            </Text>
        </View>
    )
}