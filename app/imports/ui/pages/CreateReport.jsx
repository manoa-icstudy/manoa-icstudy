import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { ReportFormSchema as formSchema } from '../forms/ReportFormInfo';
import { Report } from '../../api/report/Report';
import { ReportDate } from '../../api/date/ReportDate';

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CreateReport = () => {
  const [emailState, setEmailState] = useState('');

  // On submit, insert the data.
  const submit = (data, formRef) => {
    let insertError;
    const { name, date, reportUser, description } = data;
    const owner = Meteor.user().username;
    Report.insert(
      { name, reportUser, description, owner },
      (error) => { insertError = error; },
    );

    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      ReportDate.insert({ name, reportUser, owner, description, date }, (error) => { insertError = error; });
      if (insertError) {
        swal('Error', insertError.message, 'error');
      } else {
        swal('Success', 'Report was created.', 'success');
        setEmailState(owner);
        formRef.reset();
      }
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create User Report</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Col className="m-3 mb-0">
                <Button href="/study-session-list" variant="primary">Back</Button>
              </Col>
              <Card.Body>
                <TextField name="name" />
                <DateField name="date" showInlineError type="date" />
                <TextField name="reportUser" />
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          {emailState ? (
            <Alert className="py-2">
              <a href={`/edit-report/${emailState}`}>Edit this report</a>
            </Alert>
          ) : ''}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReport;
