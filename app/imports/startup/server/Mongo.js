import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/session/Session.js';
import { Profiles } from '../../api/profile/Profile';

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

// Initialize the database with a default data document.
const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}
