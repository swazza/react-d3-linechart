import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPoints } from './store/actions';
import AddPointSection from './AddPointSection';
import ChartSection from './ChartSection';

import './App.css';

interface Props {
  fetchPoints: typeof fetchPoints;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPoints();
  }

  render() {
    return (
      <main>
        <section className="add-point" style={{ position: 'relative' }}>
          <AddPointSection />
        </section>
        <section style={{ position: 'relative' }}>
          <ChartSection />
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ fetchPoints }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(App);
