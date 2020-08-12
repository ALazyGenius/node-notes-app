const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => `Your Notes are..`;

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const saveNotes = notes => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if(!duplicateNote) {
        console.log(chalk.green.inverse('New note added.'))
        notes.push({title, body});
    } else {
        console.log(chalk.green.inverse('Notes title taken.'));
    }
    saveNotes(notes);
}

const removeNote = title => {
    const notes = loadNotes();
    const remainingNotes = notes.filter(note => note.title !== title);
    if(notes.length > remainingNotes.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(remainingNotes);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.red.inverse('Your notes:'));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(el => el.title === title);
    if(!note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No note found.'));
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}