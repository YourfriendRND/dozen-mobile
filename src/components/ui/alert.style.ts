import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    
    text: {
        fontSize: 14,
        textAlign: 'center',
    },

    // Error
    errorContainer: {
        backgroundColor: '#FEE2E2'
    },

    errorText: {
        color: '#B91C1C'
    },

    // Warning
    warningContainer: {
        backgroundColor: '#FEF3C7'
    },

    warningText: {
        color: '#92400E',
        fontStyle: 'italic',
    },

    // Success
    successContainer: {
        backgroundColor: '#DCFCE7'
    },

    successText: {
        color: '#166534'
    }
})