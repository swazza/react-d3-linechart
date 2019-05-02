import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddPointForm from './forms/AddPointForm';
import LoaderOverlay from './components/LoaderOverlay';
import { Store } from './store';
import { addPoint } from './store/actions';

interface Props {
  /**
   * Flat indicating if an API call is underway for adding a point. If true,
   * the Add Point Form is blocked from interaction by displaying a LoaderOverlay on top. If false,
   * user can interact with the form
   */
  isAddingPoint: boolean;

  /**
   * An action dispatcher that dispatches an action to make an API call to save the Point to an API end point.
   */
  addPoint: any;

  /**
   * A non-empty string indicates an error that occured while making the API call to save a point. If this field
   * is non-empty, an error message is displayed and form state is kept intact.
   */
  addError: string;
}

const AddPointSection: React.FC<Props> = ({
  addPoint,
  isAddingPoint,
  addError
}) => (
  <>
    <span style={{ color: 'red', fontSize: '0.8em' }}>{addError}</span>
    <LoaderOverlay isLoading={isAddingPoint} />
    <AddPointForm onSubmit={addPoint} />
  </>
);

const mapStateToProps = (state: Store) => ({
  isAddingPoint: state.isAddingPoint,
  addError: state.addError
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ addPoint }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPointSection);
