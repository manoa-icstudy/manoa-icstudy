import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (name, email, password, coursesTaking, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    name: name,
    username: email,
    email: email,
    password: password,
    coursesTaking: coursesTaking,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ name, email, password, coursesTaking, role }) => createUser(name, email, password, coursesTaking, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
