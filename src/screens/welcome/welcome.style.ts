import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, typography, spacing } from '../../theme/design-system';

const { height } = Dimensions.get('window'); 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.sectionGap,
  },

  image: {
    width: '110%',
    height: height * 0.45,
    alignSelf: 'center',
    marginTop: 24,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 32
  },

  textBlock: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 50
  },

  title: {
    ...typography.title,
    fontWeight: '700',
    color: colors.title,
    marginBottom: 12
  },

  subtitle: {
    ...typography.subtitle,
    color: colors.subtitle,
  },

  button: {
    backgroundColor: colors.primary, 
    borderRadius: radius.xl,
    width: '100%',
    marginBottom: 0
  },

  buttonContent: {
    height: 54,
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
