import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "flex-start"
  },
  row: {
    flexDirection: "row",
    marginTop: 15
  },
  number: {
    fontSize: 25,
    textAlign: "center",
    color: "#686d75"
  },
  backspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    flex: 1,
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9
  },
  input: { fontSize: 26 },
  prefix: { fontSize: 26, marginRight: 6 },
  suffix: { fontSize: 26, marginLeft: 6 },
  keyboard: {
    height: 0,
    paddingTop: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",

    shadowColor: "#bfbfbf",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: -2,
      width: 0
    },
    zIndex: 1
  },
  inputWrapper: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 12
  },
  label: { fontSize: 12, color: "#a0a5ab" },
  button: { color: "#686d75" },
  mask: {
    flex: 1,
    zIndex: 8,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#00000000"
  },
  dot: {
    fontSize: 48,
    lineHeight: 32
  }
});
