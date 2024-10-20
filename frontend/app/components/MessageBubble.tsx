import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from '../styles/styles';

// Define the prop types for the component
interface MessageBubbleProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.bubble}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default MessageBubble;
