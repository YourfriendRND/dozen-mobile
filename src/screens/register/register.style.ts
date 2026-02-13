import { StyleSheet } from 'react-native';
import { colors } from '../../theme/design-system';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 24,
        paddingHorizontal: 24,
    },

    headerImage: {
        resizeMode: 'cover',
    },

    ovarlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    logo: {
        fontSize: 42,
        fontWeight: '700',
        color: colors.whiteSoft,
        zIndex: 1,
        marginTop: 24,
        letterSpacing: 1.2
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        backgroundColor: colors.surface,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        color: colors.title
    },

    input: {
        marginBottom: 14,
        backgroundColor: colors.surface,
    },

    primaryButton: {
        marginTop: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
    },

    primaryButtonContent: {
        height: 52,
    },

    secondaryAction: {
        marginTop: 24,
        textAlign: 'center',
        color: '#374151',
        textDecorationLine: 'underline',
        fontSize: 14
    }
});
