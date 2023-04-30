import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Notes } from '../../api/note/Notes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  chat: String,
  sessionId: String,
  owner: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddNote = ({ owner, sessionId }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { chat, createdAt } = data;
    Notes.collection.insert(
      { chat, sessionId, createdAt, owner },
      (error) => {
        if (error) {
          console.log('Error', error.message, 'error');
        } else {
          console.log('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="chat" />
            <SubmitField />
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="sessionId" value={sessionId} />
            <HiddenField name="createdAt" value={new Date()} />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
};
export default AddNote;
