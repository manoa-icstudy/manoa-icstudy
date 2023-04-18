import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const LoginLog = new Mongo.Collection('LoginLogCollection');

/** Define a schema to specify the structure of each document in the collection. */
const LoginLogSchema = new SimpleSchema({
  owner: String,
  date: Date,
});

/** Attach the schema to the collection. */
LoginLog.attachSchema(LoginLogSchema);

/** Make these objects available to others. */
export { LoginLog, LoginLogSchema };
