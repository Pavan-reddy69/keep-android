import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./src/Header";
import Count from "./src/Count";
import CreateArea from "./src/Area";
import Note from "./src/Note";
import MasonryList from "@react-native-seoul/masonry-list";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Error retrieving notes:", error);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  function addNote(newNote) {
    const id = Date.now(); // Generate a unique ID
    const updatedNote = { ...newNote, id }; // Include the id in the note
    const updatedNotes = [...notes, updatedNote];
    saveNotes(updatedNotes);
  }

  function deleteNote(noteToDelete) {
    const updatedNotes = notes.filter((note) => note !== noteToDelete);
    saveNotes(updatedNotes);
  }

  function editNote(id, updatedNote) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? updatedNote : note
    );
    saveNotes(updatedNotes);
  }

  return (
    <View style={styles.container}>
      <Header />

      <Count
        count={
          notes.length === 0
            ? "Empty"
            : `Showing ${notes.length} Notes in Database`
        }
      />
      <CreateArea onAdd={addNote} onEdit={editNote} />
      <MasonryList
        data={notes}
        renderItem={({ item }) => (
          <Note
            note={item}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.notesContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  notesContainer: {
    marginLeft: 40,
    marginRight: 20,
  },
});

export default App;
