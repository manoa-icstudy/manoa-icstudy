import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { icsCourses } from '../course/courses';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */
class SessionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionsCollection';
    this.owner = 'UserSessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      date: Date,
      owner: String,
      description: String,
      createDate: Date,
      icsclass: {
        type: String,
        allowedValues: icsCourses,
        defaultValue: 'ICS 101',
      },
      participant: Array,
      'participant.$': {
        type: String,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.owner}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.publicPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the SessionsCollection.
 * @type {SessionsCollection}
 */
export const Sessions = new SessionsCollection();
