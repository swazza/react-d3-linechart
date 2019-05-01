import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Store } from './store';
import { fetchPoints } from './store/actions';
import Notification from './components/Notification';
import AddPointSection from './AddPointSection';
import ChartSection from './ChartSection';

import './App.css';

interface DispatchableActions {
  fetchPoints: typeof fetchPoints;
}

interface StoreProps {
  notification: string;
}

interface Props extends DispatchableActions, StoreProps {}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPoints();
  }

  render() {
    return (
      <main>
        <section>
          <AddPointSection />
        </section>
        <section>
          <ChartSection />
        </section>
        <section>
          <Notification message={this.props.notification} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state: Store): StoreProps => ({
  notification: state.notification
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ fetchPoints }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
