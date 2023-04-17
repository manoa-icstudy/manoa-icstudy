import React, { useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
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
      ReportDate.insert({ owner, date }, (error) => { insertError = error; });
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
              <a href={`/edit-report/${emailState}`}>Edit this data</a>
            </Alert>
          ) : ''}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReport;
