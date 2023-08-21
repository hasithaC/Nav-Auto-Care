import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {colors} from '../../theme';
import {images} from '../../theme/images';

type SectionProps = PropsWithChildren<{
  style?: object;
  onPressBack?: any;
  title?: string;
  type?: 'default' | 'searchbar';
  backIconType?: 'left' | 'down';
}>;

const PrimaryHeader = ({
  style,
  onPressBack,
  title,
  type = 'default',
  backIconType = 'left',
}: SectionProps): React.JSX.Element => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const backAction = () => {
      onPressBackArrow();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onPressBackArrow = () => {
    onPressBack();
  };

  return (
    <View style={{...styles.parentView, ...style}}>
      <TouchableOpacity
        style={backIconType === 'down' ? styles.downButton : styles.backButton}
        onPress={onPressBackArrow}>
        <Image
          style={backIconType === 'down' ? styles.downArrow : styles.backArrow}
          resizeMode="contain"
          source={images.icons.back_icon}
        />
      </TouchableOpacity>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      )}

      {type === 'searchbar' && (
        <>
          <View style={styles.searchBar}>
            <TouchableOpacity>
              <Image
                style={styles.searchIcon}
                resizeMode="contain"
                source={images.icons.search_icon}
              />
            </TouchableOpacity>
            <TextInput
              //ref={}
              placeholderTextColor={colors.TEXT_COLOR_ON_DARK_BACKGROUND}
              placeholder="Find Service Centers"
              style={styles.textInput}
              onChangeText={(value: React.SetStateAction<string>) =>
                setText(value)
              }
              value={text}
              // onBlur={}
              // onFocus={}
              keyboardType="default"
              returnKeyType="done"
              numberOfLines={1}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 4,
  },
  downButton: {
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 4,
  },
  backArrow: {
    width: 8,
    height: 16,
  },
  downArrow: {
    width: 8,
    height: 16,
    transform: [{rotate: '-90deg'}],
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 32,
  },
  title: {
    //fontFamily: '',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
  },
  searchBar: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    //fontFamily: '',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    paddingVertical: 0,
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
  },
});
