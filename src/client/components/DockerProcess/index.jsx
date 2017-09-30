import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import _map from 'lodash/map';
import _join from 'lodash/join';

class DockerProcessComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successLog: props.successLog,
      errorLog: props.errorLog,
    };
  }

  componentDidMount() {
    this.props.getAllContainers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      successLog: nextProps.successLog,
      errorLog: nextProps.errorLog,
    });
  }

  render() {
    if (this.props.successLog.length > 0) {
      return (
        <Table compact definition stackable singleLine={false} textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>
                <Checkbox readOnly />
              </Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Command</Table.HeaderCell>
              <Table.HeaderCell>Ports</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              _map(this.props.successLog, each => (
                <Table.Row key={each.id}>
                  <Table.Cell collapsing>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>{each.id}</Table.Cell>
                  <Table.Cell>{_join(each.names, '\n')}</Table.Cell>
                  <Table.Cell>{each.command}</Table.Cell>
                  <Table.Cell>{_join(each.ports, '\n')}</Table.Cell>
                  <Table.Cell>{each.status}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      );
    }
    return <span />;
  }
}

DockerProcessComponent.propTypes = {
  successLog: PropTypes.array.isRequired,
  errorLog: PropTypes.string.isRequired,
  getAllContainers: PropTypes.func.isRequired,
};

export default DockerProcessComponent;
