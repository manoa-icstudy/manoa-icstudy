import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { ReportFormSchema as formSchema } from '../forms/ReportFormInfo';
import { Report } from '../../api/report/Report';
import { ReportDate } from '../../api/date/ReportDate';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const EditReport = () => {
  const { owner } = useParams();

  const { ready, reportDoc, dateDoc } = useTracker(() => {
    // Request Reports and Enrollment docs. Won't be locally available until ready() returns true.
    const reportSubscription = Meteor.subscribe('ReportCollection');
    const dateSubscription = Meteor.subscribe('ReportDateData');
    return {
      reportDoc: Report.findOne({ owner }),
      dateDoc: ReportDate.findOne({ owner }),
      ready: reportSubscription.ready() && dateSubscription.ready(),
    };
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    let updateError;
    const reportId = reportDoc._id;
    const dateId = dateDoc._id;
    const { name, date, reportUser, description } = data;
    Report.update(
      reportId,
      { $set: { name, reportUser, description } },
      (error) => { updateError = error; },
    );
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      ReportDate.update(dateId, { $set: { name, reportUser, owner, description, date } }, (error) => {
        updateError = error;
      });
      if (updateError) {
        swal('Error', updateError.message, 'error');
      } else {
        swal('Success', 'Report was updated.', 'success');
      }
    }
  };

  const model = _.extend({}, reportDoc, dateDoc);
  return (ready) ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit User Report</h2></Col>
          <AutoForm schema={bridge} onSubmit={(data) => submit(data)} model={model}>
            <Card>
              <Col className="m-3 mb-0">
                <Button href="/create-report" variant="primary">Back</Button>
              </Col>
              <Card.Body>
                <TextField id="name-field" name="name" />
                <DateField id="date-field" name="date" showInlineError type="datetime-local" />
                <TextField id="report-user-field" name="reportUser" />
                <LongTextField id="description-field" name="description" />
                <SubmitField id="submit-field" value="Update" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditReport;
