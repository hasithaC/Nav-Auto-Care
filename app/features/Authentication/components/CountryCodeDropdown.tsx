import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import {FlatList} from 'react-native-gesture-handler';
import {CountryCodes} from '../../../constants/CountryCodes';
import {colors} from '../../../theme';

type SectionProps = PropsWithChildren<{
  reference?: any;
  onPressItem?: any;
}>;

type ItemProps = PropsWithChildren<{
  item: {
    name: string;
    dial_code: string;
    code: string;
  };
  index: number;
}>;

const CountryCodeDropdown = ({
  reference,
  onPressItem,
}: SectionProps): React.JSX.Element => {
  const _reference = reference;
  const onPressBack = () => {
    _reference.current.close();
  };

  const DATA = CountryCodes;

  const Item = ({item, index}: ItemProps) => (
    <>
      {index === 0 ? (
        <Text style={styles.itemFirstChar}>{item.name.charAt(0)}</Text>
      ) : item.name.charAt(0) === DATA[index - 1].name.charAt(0) ? undefined : (
        <Text style={styles.itemFirstChar}>{item.name.charAt(0)}</Text>
      )}

      <View style={{width: '100%', paddingHorizontal: 10}}>
        <TouchableOpacity
          style={
            index < DATA.length - 1
              ? styles.itemTouchable
              : styles.itemTouchableLast
          }
          onPress={() => {
            onPressItem(item);
            _reference.current.close();
          }}>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.itemDialCode}>{item.dial_code}</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <RBSheet
      ref={_reference}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="slide"
      customStyles={{
        wrapper: {
          backgroundColor: colors.SECONDARY_COLOR,
        },
        draggableIcon: {
          backgroundColor: colors.ACCENT_COLOR,
        },
        container: {...styles.contentContainer},
      }}>
      <PrimaryHeader
        onPressBack={onPressBack}
        title={'Select Country Code'}
        style={styles.header}
        backIconType="down"
      />

      <FlatList
        data={DATA}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </RBSheet>
  );
};

export default CountryCodeDropdown;

const styles = StyleSheet.create({
  contentContainer: {
    height: '80%',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 16,
    borderTopWidth: 0.35,
    borderColor: colors.SECONDARY_COLOR,
  },
  itemFirstChar: {
    //fontFamily: '',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    marginVertical: 14,
  },
  itemTouchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 7,
    borderTopWidth: 0.35,
    borderColor: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
  },
  itemTouchableLast: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 7,
    borderTopWidth: 0.35,
    marginBottom: 16,
    borderColor: colors.SECONDARY_COLOR,
  },
  itemName: {
    flex: 1,
    //fontFamily: '',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
  },
  itemDialCode: {
    //fontFamily: '',
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    marginLeft: 10,
  },
});
