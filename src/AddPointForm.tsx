import React from 'react';
import { Form, Field } from 'react-final-form';

const required = (value: any) => (value ? undefined : 'Required');
const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;
const mustBeISODate = (value: any) =>
  isNaN(new Date(value).getTime()) ? 'Must be ISO Date' : undefined;

const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

interface Props {
  onSubmit: any;
}

const AddPointForm: React.FC<Props> = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid, submitting }) => (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '200px'
        }}
      >
        <h2 style={{ marginRight: 'auto' }}>Add Point</h2>
        <Field name="x" validate={composeValidators(required, mustBeISODate)}>
          {({ input, meta }) => (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: '2em'
              }}
            >
              <label>ISO Date</label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 'auto',
                  position: 'relative'
                }}
              >
                {meta.error && meta.touched && (
                  <span
                    style={{
                      color: 'red',
                      fontSize: '0.8em',
                      position: 'absolute',
                      top: '-1.1em'
                    }}
                  >
                    {meta.error}
                  </span>
                )}
                <input
                  {...input}
                  type="text"
                  placeholder="X"
                  style={{ height: '2.5em' }}
                />
              </div>
            </div>
          )}
        </Field>

        <Field name="y" validate={composeValidators(required, mustBeNumber)}>
          {({ input, meta }) => (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2em'
              }}
            >
              <label>Value</label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 'auto',
                  position: 'relative'
                }}
              >
                {meta.error && meta.touched && (
                  <span
                    style={{
                      color: 'red',
                      fontSize: '0.8em',
                      position: 'absolute',
                      top: '-1.1em'
                    }}
                  >
                    {meta.error}
                  </span>
                )}
                <input
                  {...input}
                  type="text"
                  placeholder="Y"
                  style={{ height: '2.5em' }}
                />
              </div>
            </div>
          )}
        </Field>

        <button
          type="submit"
          disabled={pristine || invalid || submitting}
          style={{
            marginTop: '5px',
            height: '2.5em',
            width: '50px',
            marginLeft: 'auto'
          }}
        >
          Add
        </button>
      </form>
    )}
  />
);

export default AddPointForm;
