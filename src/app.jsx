import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render () {
    return <div>
      Hello React World!
    </div>
  }
}

export default connect(
  state => {
    return ({

    })
  },
  dispatch => ({

  })
)(App);