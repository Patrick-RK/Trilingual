import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  // Added scene style
  scene: {
    flex: 1,
    backgroundColor: '#f9f6f1', // Example background color, adjust as needed
    padding: 10,
  },
  // Added styles for MessageBubble component
  bubble: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
    borderRadius: 8,
    maxWidth: '80%', // Bubble width
    alignSelf: 'flex-start', // Aligns bubble to the start
  },
  bubbleText: {
    fontSize: 16,
    color: '#000',
  },
  bubbleContainer: {
    // Add your desired styling here
    flex: 1,
    padding: 10,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    width: '80%',
  },
});

export default styles;
