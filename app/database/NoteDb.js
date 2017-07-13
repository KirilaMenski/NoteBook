const Realm = require('realm');
var UUID = require('uuid-js');

var tableName = 'note';

let realm = new Realm({
  schema: [{
    name: tableName,
    primaryKey: 'id',
    properties: {
      id: 'string',
      image: 'string',
      date: 'string',
      title: 'string',
      description: 'string',
    }
  }]
});

var NoteDb = {

  addNote(note) {
    realm.write(() => {
      realm.create(tableName, {
        id: ''+UUID.create(4),
        image: note.image,
        date: note.date,
        title: note.title,
        description: note.description,
      });
    });
  },

  updateNote(note) {
    realm.write(()=>{
      realm.create(tableName, {
        id: note.id,
        image: note.image,
        date: note.date,
        title: note.title,
        description: note.description,
      }, true);
    });
  },

  deleteNote(note) {
    realm.write(() => {
      realm.delete(note);
    });
  },

  getAllNotes() {
    return realm.objects(tableName);
  },
};

module.exports = NoteDb;
