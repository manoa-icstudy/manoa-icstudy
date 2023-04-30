import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/session/Session.js';
import { ReportDate } from '../../api/date/ReportDate';
import { Feedbacks } from '../../api/feedback/Feedback';
import { Profiles } from '../../api/profile/Profile';
import { Points } from '../../api/points/Points';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addSession = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Sessions.collection.insert(data);
};

if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default session.');
    Meteor.settings.defaultSession.forEach(data => addSession(data));
  }
}

const addReport = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  ReportDate.insert(data);
};

if (ReportDate.find().count() === 0) {
  if (Meteor.settings.defaultReport) {
    console.log('Creating default report.');
    Meteor.settings.defaultReport.forEach(data => addReport(data));
  }
}

const addFeedback = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Feedbacks.collection.insert(data);
};

if (Feedbacks.collection.find().count() === 0) {
  if (Meteor.settings.defaultFeedback) {
    console.log('Creating default feedback.');
    Meteor.settings.defaultFeedback.forEach(data => addFeedback(data));
  }
}

const addPoints = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Points.collection.insert(data);
};

if (Points.collection.find().count() === 0) {
  if (Meteor.settings.defaultPoints) {
    console.log('Creating default points.');
    Meteor.settings.defaultPoints.forEach(data => addPoints(data));
  }
}

// Initialize the database with a default data document.
const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}
