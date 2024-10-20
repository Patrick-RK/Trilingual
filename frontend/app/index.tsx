import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstRoute from './routes/firstRoute';  // Import the first route
import SecondRoute from './routes/secondRoute'; // Import the second route
import ThirdRoute from './routes/thirdRoute';   // Import the third route
import styles from './styles/styles';           // Import the shared styles

export default function TabViewExample() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '日本語' },
    // { key: 'second', title: 'Francaise' },
    // { key: 'third', title: 'Español' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    // second: SecondRoute,
    // third: ThirdRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}  // Uncommented this line
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </View>
  );
}
