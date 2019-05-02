import React from 'react';
import { connect } from 'react-redux';
import { Store } from '../store';
import { Form, Field } from 'react-final-form';

import './AddPointForm.css';

const required = (value: any) => (value ? undefined : 'Required');
const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;
const mustBeISODate = (value: any) =>
  isNaN(new Date(value).getTime()) ? 'Must be ISO Date' : undefined;

const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

interface OwnProps {
  onSubmit: any;
}

interface StoreProps {
  shouldClearAddPointForm: boolean;
}

interface Props extends OwnProps, StoreProps {}

const AddPointForm: React.FC<Props> = ({
  onSubmit,
  shouldClearAddPointForm
}) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting, form }) => (
      <form onSubmit={handleSubmit}>
        {shouldClearAddPointForm && form.reset()}
        <h2>Add Point</h2>
        <Field name="x" validate={composeValidators(required, mustBeISODate)}>
          {({ input, meta }) => (
            <div className="field">
              <label>ISO Date</label>
              <div className="input">
                {meta.error && meta.touched && (
                  <span className="error">{meta.error}</span>
                )}
                <input {...input} type="text" placeholder="X" />
              </div>
            </div>
          )}
        </Field>

        <Field name="y" validate={composeValidators(required, mustBeNumber)}>
          {({ input, meta }) => (
            <div className="field">
              <label>Value</label>
              <div className="input">
                {meta.error && meta.touched && (
                  <span className="error">{meta.error}</span>
                )}
                <input {...input} type="text" placeholder="Y" />
              </div>
            </div>
          )}
        </Field>

        <button type="submit" disabled={submitting}>
          Add
        </button>
      </form>
    )}
  />
);

const mapStateToProps = (state: Store): StoreProps => ({
  shouldClearAddPointForm: state.shouldClearAddPointForm
});

export default connect(mapStateToProps)(AddPointForm);
