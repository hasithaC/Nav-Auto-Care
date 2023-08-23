import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useDispatch} from 'react-redux';
import {colors} from '../../theme';
import {setAlertBoxVisibility} from '../../redux/action/action';
type SectionProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  description?: string;
  button?: string;
  onPress?: any;
}>;
const AlertBox = ({
  visible,
  title,
  description,
  button,
  onPress,
}: SectionProps) => {
  const dispatch = useDispatch();

  const alertBoxVisibility = {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  };
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.alert}>
          <View style={styles.alertTop}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.alertBottom}>
            <TouchableOpacity
              onPress={() => {
                onPress();
                dispatch(setAlertBoxVisibility(alertBoxVisibility));
              }}>
              <Text style={styles.button}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertBox;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
  },
  alert: {
    width: '80%',
    backgroundColor: colors.SECONDARY_COLOR,
    borderRadius: 20,
  },
  alertTop: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 12,
    borderBottomColor: colors.BACKGROUND_COLOR,
    borderBottomWidth: 0.5,
  },
  alertBottom: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  title: {
    fontFamily: '',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    marginBottom: 10,
  },
  description: {
    fontFamily: '',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
  },
  button: {
    fontFamily: '',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    margin: 2,
  },
});
