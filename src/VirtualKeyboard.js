"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  InteractionManager,
  StatusBar
} from "react-native";

import styles from "./VirtualKeyboard.style";
const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];
class VirtualKeyboard extends Component {
  static propTypes = {
    pressMode: PropTypes.oneOf(["string", "char"]),
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    backspaceImg: PropTypes.number,
    applyBackspaceTint: PropTypes.bool,
    decimal: PropTypes.bool,
    height: PropTypes.number,
    duration: PropTypes.number
  };

  static defaultProps = {
    pressMode: "string",
    color: "gray",
    backspaceImg: require("./backspace.png"),
    applyBackspaceTint: true,
    decimal: false,
    height: 224,
    duration: 300
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true
    };

    this.onPressOpen = this.onPressOpen.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setModalVisible(true);
    });
  }

  onPressOpen() {
    this.setModalVisible(true);
  }

  onPressMask() {
    if (typeof this.props.onPressMask === "function") {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === "function") {
      this.props.onCloseModal();
    }
  }

  setModalVisible(visible) {
    const { height, duration } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration
      }).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }

  render() {
    return (
      <TouchableHighlight style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={this.props.inputWrapperStyle}
            onPress={this.onPressOpen}
            activeOpacity={1}
          >
            <View
              style={[
                styles.inputContainer,
                this.props.inputContainerStyle,
                this.state.modalVisible
                  ? this.props.activeInputContainerStyle
                  : {}
              ]}
            >
              {this.props.currency && this.props.currencyFormat == "prefix" && (
                <Text style={[styles.prefix, this.props.inputStyle]}>
                  {this.props.currency}
                </Text>
              )}
              <Text style={[styles.input, this.props.inputStyle]}>
                {this.state.text || "0"}
              </Text>
              {this.props.currency && this.props.currencyFormat == "suffix" && (
                <Text
                  style={[
                    styles.suffix,
                    this.props.inputStyle,
                    this.props.suffixStyle
                  ]}
                >
                  {this.props.currency}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="none"
            visible={this.state.modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={[styles.mask]}
                activeOpacity={1}
                underlayColor={"#00000000"}
                onPress={this.onPressMask}
              >
                <TouchableHighlight underlayColor={"#fff"} style={{ flex: 1 }}>
                  <Animated.View
                    style={[
                      styles.keyboard,
                      {
                        height: this.state.animatedHeight
                      }
                    ]}
                  >
                    <View
                      pointerEvents={
                        this.state.allowPointerEvents ? "auto" : "none"
                      }
                    >
                      {this.Row([1, 2, 3])}
                      {this.Row([4, 5, 6])}
                      {this.Row([7, 8, 9])}
                      <View style={styles.row}>
                        {this.props.decimal ? (
                          this.Cell(".")
                        ) : (
                          <View style={{ flex: 1 }} />
                        )}
                        {this.Cell(0)}
                        {this.Backspace()}
                      </View>
                    </View>
                  </Animated.View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }

  Backspace() {
    return (
      <TouchableOpacity
        accessibilityLabel="backspace"
        style={styles.backspace}
        onPress={() => {
          this.onPress("back");
        }}
      >
        {this.props.backspace}
      </TouchableOpacity>
    );
  }

  Row(numbersArray) {
    let cells = numbersArray.map(val => this.Cell(val));
    return <View style={styles.row}>{cells}</View>;
  }

  Cell(symbol) {
    return (
      <TouchableOpacity
        style={styles.cell}
        key={symbol}
        accessibilityLabel={symbol.toString()}
        onPress={() => {
          this.onPress(symbol.toString());
        }}
      >
        <Text style={[styles.number, symbol == "." ? styles.dot : ""]}>
          {symbol}
        </Text>
      </TouchableOpacity>
    );
  }

  onPress(val) {
    let regexp = /^\d+(\.\d{1,2})?$/;

    if (this.props.pressMode === "string") {
      let curText = this.state.text;
      let newText = curText + val;
      if (isNaN(val)) {
        if (val === "back") {
          curText = curText.slice(0, -1);
        } else {
          if (regexp.test(newText)) {
            curText += val;
          } else if (
            (newText.match(RegExp("\\.", "g")) || []).length == 1 &&
            newText.substring(newText.length - 1) == "."
          ) {
            curText += val;
          }
        }
      } else {
        if (regexp.test(newText)) {
          curText += val;
        }
      }
      this.setState({ text: curText });
      this.props.onPress(curText);
    } /* if (props.pressMode == 'char')*/ else {
      this.props.onPress(val);
    }
  }
}

module.exports = VirtualKeyboard;
