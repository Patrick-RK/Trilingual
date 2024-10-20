import React from 'react';
import { ScrollView, TextInput, StyleProp, TextStyle, ViewStyle } from 'react-native';
import MessageBubble from './MessageBubble'; // Bubble Component
import styles from '../styles/styles'; // Importing styles

// Define the props type for the component
interface ConversationProps {
  submittedTexts: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleTextSubmit: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ submittedTexts, inputValue, setInputValue, handleTextSubmit }) => {
  return (
    <>
      <ScrollView style={styles.bubbleContainer as StyleProp<ViewStyle>}>
        {submittedTexts.map((text, index) => (
          <MessageBubble key={index} text={text} onPress={handleTextSubmit} />
        ))}
      </ScrollView>
      <TextInput
        style={styles.input as StyleProp<TextStyle>}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Type here..."
        placeholderTextColor="#000"
        onSubmitEditing={handleTextSubmit}
      />
    </>
  );
};

export default Conversation;
