import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{
  children?: any;
  style?: object;
  containerStyle?: object;
}>;

const PrimaryContainer = ({
  children,
  style,
  containerStyle,
}: SectionProps): React.JSX.Element => {
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [contentViewHeight, setContentViewHeight] = useState(0);

  return (
    <View style={{...styles.parentView, ...containerStyle}}>
      <SafeAreaView style={styles.PrimaryContainer}>
        <ScrollView
          scrollEnabled={contentViewHeight > scrollViewHeight}
          contentContainerStyle={styles.PrimaryContainer}
          showsVerticalScrollIndicator={false}
          onLayout={e => {
            setScrollViewHeight(e.nativeEvent.layout.height);
          }}>
          <View
            style={{
              ...styles.ContentContainer,
              ...style,
            }}
            onLayout={e => {
              setContentViewHeight(e.nativeEvent.layout.height);
            }}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PrimaryContainer;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    width: '100%',
  },
  PrimaryContainer: {
    flexGrow: 1,
  },
  ContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
