import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { icsCourses } from '../course/courses';

/**
 * The ProfilesCollection. It encapsulates state and variable values for a profile.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      owner: String,
      email: { type: String, index: true, unique: true },
      picture: { type: String, optional: true },
      currentCourses: { type: Array, optional: true },
      'currentCourses.$': {
        type: String,
        allowedValues: icsCourses,
      },
      mentorCourses: { type: Array, optional: true },
      'mentorCourses.$': {
        type: String,
        allowedValues: icsCourses,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
