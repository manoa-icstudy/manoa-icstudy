import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const ReportDate = new Mongo.Collection('ReportDateData');

/** Define a schema to specify the structure of each document in the collection. */
const ReportDateDataSchema = new SimpleSchema({
  name: String,
  owner: String,
  reportUser: String,
  description: String,
  date: Date,
});

/** Attach the schema to the collection. */
ReportDate.attachSchema(ReportDateDataSchema);

/** Make these objects available to others. */
export { ReportDate, ReportDateDataSchema };
