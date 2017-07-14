const Realm = require('realm');
var UUID = require('uuid-js');

var tableName = 'note';

let realm = new Realm({
  schema: [{
    name: tableName,
    primaryKey: 'id',
    properties: {
      id: 'string',
      calendarId: 'string',
      image: 'string',
      dateStart: 'string',
      dateEnd: 'string',
      title: 'string',
      description: 'string',
    }
  }]
});

var NoteDb = {

  addNote(note) {
    realm.write(() => {
      realm.create(tableName, {
        id: '' + UUID.create(4),
        calendarId: note.calendarId,
        image: note.image,
        dateStart: note.dateStart,
        dateEnd: note.dateEnd,
        title: note.title,
        description: note.description,
      });
    });
  },

  updateNote(note) {
    realm.write(()=>{
      realm.create(tableName, {
        id: note.id,
        calendarId: note.calendarId,
        image: note.image,
        dateStart: note.dateStart,
        dateEnd: note.dateEnd,
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
