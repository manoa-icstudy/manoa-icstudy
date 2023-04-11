import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/session/Session.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Sessions.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
