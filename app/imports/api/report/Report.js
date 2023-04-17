import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for stuff.
 */

const Report = new Mongo.Collection('ReportCollection');

const ReportSchema = new SimpleSchema({
  name: String,
  owner: String,
  reportUser: String,
  description: String,
});

Report.attachSchema(ReportSchema);

/**
 * The singleton instance of the SessionsCollection.
 * @type {FeedbackCollection}
 */
export { Report, ReportSchema };
