const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes.js');

//Customize Yargs Version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            desc: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            desc: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const { title, body } = argv;
        notes.addNote(title, body);
    }    
});
// node app.js add --title="Shopping List" --body="1. Get soap"
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            desc: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }    
});
//node app.js remove --title="Shopping List"
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.listNotes();
    }    
});
//node app.js list
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv) {
        notes.readNote(argv.title);
    }    
});
//node app.js read

yargs.parse();