import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/AntDesign";

function Note({ note, onDelete, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editingId, setEditingId] = useState(null); // State to track the ID being edited

  const handleEditClick = (id) => {
    setEditing(true);
    setEditingId(id);
  };

  const handleSaveClick = () => {
    const updatedNote = { ...note, title: editedTitle, content: editedContent };
    onEdit(editingId, updatedNote); // Pass the editingId and updatedNote
    setEditing(false);
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <View style={isEditing ? styles.editingNote : styles.note}>
        {isEditing ? (
          <>
            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              style={styles.editInput}
            />
            <TextInput
              value={editedContent}
              onChangeText={setEditedContent}
              multiline={true}
              style={styles.editTextarea}
              numberOfLines={3}
            />
            <TouchableOpacity onPress={handleSaveClick} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.noteHeader}>
              <Icon
                name="edit"
                size={25}
                onPress={() => handleEditClick(note.id)}
                style={styles.editIcon}
              />
            </View>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <View style={styles.deleteContainer}>
              <FontAwesome5
                name="trash"
                size={25}
                onPress={() => onDelete(note)}
                style={styles.deleteIcon}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  noteContent: {
    paddingTop: 10,
    color: 'black',
  },
  note: {
    borderColor: "black",
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: 150,
    position: "relative",
  },
  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 8,
    right: 2,
  },
  editIcon: {
    color: "blue",
  },
  deleteContainer: {
    marginTop: "auto", 
    alignItems: "flex-end", 
  },
  deleteIcon: {
    color: "red",
  },
  editingNote: {
    marginBottom:13,
    borderColor: "#ccc",
    borderWidth: 1,
    color:'black',
    padding: 6,
    width: 170,
    position: "relative",
    shadowColor: "#323030",
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.784,
  },
  editInput: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    marginBottom: 7,
  },
  editTextarea: {
    borderColor: "#ccc",
    borderRadius: 6,
    borderWidth: 1,
    padding: 5,
    width: "100%",
    height: "45%",
    marginBottom: 0,
    minHeight: 14,
  },
  saveButton: {
    margin: 10,
    padding: 6,
    backgroundColor: "#4285f4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    width: 100,
  },
  saveButtonText: {
    color: "#fff",
  },
});

export default Note;
