import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Sessions } from '../../api/session/Session';
import { Profiles } from '../../api/profile/Profile';
import { Feedbacks } from '../../api/feedback/Feedback';
import { Report } from '../../api/report/Report';
import { ReportDate } from '../../api/date/ReportDate';
import { LoginLog } from '../../api/log/LoginLog';
import { Points } from '../../api/points/Points';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Sessions.publicPublicationName, function () {
  return Sessions.collection.find();
});

Meteor.publish('ReportDateData', () => ReportDate.find());

Meteor.publish('ReportCollection', () => Report.find());

Meteor.publish('LoginLogCollection', () => LoginLog.find());

Meteor.publish(Points.publicPublicationName, function () {
  return Points.collection.find();
});

Meteor.publish(Sessions.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Sessions.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Sessions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Sessions.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Feedbacks.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Feedbacks.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
