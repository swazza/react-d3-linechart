import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { AddPointForm } from './AddPointForm';

describe('Add Point Form', function() {
  afterEach(cleanup);

  it('should not submit if no values are provided', async function() {
    const submitHandler = jest.fn(e => e.preventDefault());
    const { getByTestId } = render(<AddPointForm onSubmit={submitHandler} />);
    const form = getByTestId('add-point-form');
    fireEvent.submit(form);
    expect(submitHandler).toHaveBeenCalledTimes(0);
  });

  it('should not submit if invalid values are provided', async function() {
    const submitHandler = jest.fn(() => 1);
    const { getByTestId } = render(<AddPointForm onSubmit={submitHandler} />);
    const form = getByTestId('add-point-form');
    const x = getByTestId('x');
    const y = getByTestId('y');
    fireEvent.change(x, { target: { value: 'invalid date' } });
    fireEvent.submit(form);
    expect(submitHandler).toHaveBeenCalledTimes(0);
  });

  it('should submit if valid values are provided', async function() {
    const submitHandler = jest.fn(() => 1);
    const { getByTestId } = render(<AddPointForm onSubmit={submitHandler} />);
    const form = getByTestId('add-point-form');
    const x = getByTestId('x');
    const y = getByTestId('y');
    fireEvent.change(x, { target: { value: '2018-04-19T13:45:03+01:00' } });
    fireEvent.change(y, { target: { value: '20' } });
    fireEvent.submit(form);
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});
