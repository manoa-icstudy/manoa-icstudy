import SimpleSchema from 'simpl-schema';

const ReportFormSchema = new SimpleSchema({
  name: { label: 'Name', type: String },
  reportUser: { label: 'ReportUser', type: String },
  description: { label: 'Description', type: String },
  date: { label: 'Report Date', type: Date, defaultValue: new Date() },
});

export { ReportFormSchema };
