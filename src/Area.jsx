import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';


function CreateArea({ onAdd, onEdit, editNote }) {
  const [isTitleExpanded, setTitleExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (name, value) => {
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleTitleExpand = () => {
    setTitleExpanded(true);
  };

  const submitButton = () => {
    if (editNote) {
      onEdit(editNote.id, note.title, note.content);
    } else {
      onAdd(note);
    }


    setNote({
      title: "",
      content: "",
    });

    setTitleExpanded(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleTitleExpand}>
        <View>
          {isTitleExpanded ? (
            <TextInput
              value={note.title}
              placeholder="Enter Title"
              style={styles.input}
              onChangeText={(value) => handleChange("title", value)}
              required
              autoFocus
            />
          ) : (
            <Text style={styles.inputText}>Add Your Note Here</Text>
          )}
        </View>
      </TouchableOpacity>
      {isTitleExpanded && (
        <TextInput
          value={note.content}
          placeholder="Enter Note Details"
          style={[styles.input, styles.expandedInput]}
          multiline={true}
          onChangeText={(value) => handleChange("content", value)}
          required
        />
      )}
      <TouchableOpacity
        style={[styles.addButton, (!note.title || !note.content) && styles.disabledButton]}
        onPress={submitButton}
        disabled={!note.title && !note.content}
      >
        {editNote ? (
          <Text style={styles.buttonText}>Save</Text>
        ) : (
          <Icon name="pluscircle" size={30} color="yellow" style={styles.add} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    marginBottom: 7,

  },
  expandedInput: {
    height: 100,
    width: width - 90,
    padding: 8,
    textAlignVertical: "top",
  },
  inputText: {
    color: "black",
    height: 35,
    width: width - 90,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'black',

    borderRadius: 8,
    borderWidth: 1,
  },
  addButton: {
    fontSize: 3,
    transitionProperty: "transform",
    transitionDuration: 300,
    transitionTimingFunction: "ease-in-out",
  },
  buttonText: {
  },
  disabledButton: {
  },
  add: {
    position: 'absolute',
    right: -35,
    bottom: 5,
  },
});

export default CreateArea;
