import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

require('styles/app.scss');

const App = props => (
  <div>
    <p id="value">Value: {props.value}</p>
    <Button id="increment_button" onClick={props.increment} value="Increment">Increment</Button>
    <Button id="decrement_button" onClick={props.decrement} value="Decrement">Decrement</Button>
  </div>
);

App.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default App;
