import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Modal } from 'semantic-ui-react';
import _map from 'lodash/map';
import _join from 'lodash/join';

class DockerProcessComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successLog: props.successLog,
      error: (props.errorLog.length > 0),
      errorLog: props.errorLog,
    };
  }

  componentDidMount() {
    this.props.getAllContainers();
    this.interval = setInterval(() => this.pollTheCommand(), 5000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      successLog: nextProps.successLog,
      error: (nextProps.errorLog.length > 0),
      errorLog: nextProps.errorLog,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  pollTheCommand() {
    this.props.getAllContainers();
  }

  render() {
    if (this.props.successLog.length > 0) {
      return (
        <Table
          className="content-table"
          compact
          definition
          singleLine={false}
          stackable
          textAlign="center"
        >
          <Table.Header className="content-table-header">
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
          <Table.Body className="content-table-body">
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
    } else if (this.props.errorLog.length > 0) {
      return (
        <Modal
          className="content-modal"
          open={this.state.error}
          size="tiny"
        >
          <Modal.Header className="content-modal-header">
            Oops...
          </Modal.Header>
          <Modal.Content className="content-modal-body">
            <p>{this.state.errorLog}</p>
          </Modal.Content>
        </Modal>
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
