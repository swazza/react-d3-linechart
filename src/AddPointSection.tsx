import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddPointForm from './forms/AddPointForm';
import LoaderOverlay from './components/LoaderOverlay';
import { Store } from './store';
import { addPoint } from './store/actions';

interface Props {
  isAddingPoint: boolean;
  addPoint: any;
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
