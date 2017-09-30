import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import * as actions from 'actions/containerActions';
import DockerProcessComponent from 'components/DockerProcess';

const mapStateToProps = state => ({
  successLog: state.containerReducer.successLog,
  errorLog: state.containerReducer.errorLog,
});

const mapDispatchToProps = dispatch => ({
  getAllContainers: () => {
    dispatch(actions.getAllContainers(ipcRenderer));
  },
});

const DockerProcessContainer = connect(mapStateToProps, mapDispatchToProps)(DockerProcessComponent);

export default DockerProcessContainer;
