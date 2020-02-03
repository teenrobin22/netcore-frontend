import React, { Component, Fragment } from 'react';
import valueService from './services/valueService';

class Values extends Component {
  state = {
    values: []
  };

  //On Load
  async componentDidMount() {
    const { data: values } = await valueService.getValues();
    this.setState({ values });
    // this.setState({ values: data });
  }

  render() {
    const { values } = this.state;
    return (
      <Fragment>
        <h1>Values List</h1>
        {values.map(item => (
          <p key={item.id}>
            id: {item.id}, name: {item.name}
          </p>
        ))}
      </Fragment>
    );
  }
}

export default Values;
