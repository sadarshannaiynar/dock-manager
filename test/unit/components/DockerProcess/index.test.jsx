/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import DockerProcessComponent from 'components/DockerProcess';

const initiator = (dataFlag) => {
  const containers = [{
    id: '123456789012',
    fullId: '123456789012345',
    names: ['container'],
    command: 'command',
    ports: ['2000'],
    status: 'running',
  }];

  const mockFunc = spy();

  const props = {
    successLog: (dataFlag) ? containers : [],
    errorLog: '',
    getAllContainers: mockFunc,
  };

  const wrapper = shallow(<DockerProcessComponent {...props} />);

  return { wrapper, props, mockFunc };
};

describe('Testing the DockerProcessComponent', () => {
  describe('Rendering Tests', () => {
    describe('With Data', () => {
      const { wrapper } = initiator(true);

      it('must render component', () => {
        expect(wrapper.exists()).to.be.true;
      });

      it('Must render the Table element', () => {
        expect(wrapper.find('Table').exists()).to.be.true;
      });

      it('Must render the Table with the props', () => {
        const tableProps = wrapper.find('Table').props();
        expect(tableProps.compact).to.be.true;
        expect(tableProps.definition).to.be.true;
        expect(tableProps.stackable).to.be.true;
        expect(tableProps.singleLine).to.be.false;
        expect(tableProps.textAlign).to.be.eql('center');
      });

      it('Must render the Table.Header element', () => {
        expect(wrapper.find('TableHeader').exists()).to.be.true;
      });

      it('Must render 6 header cells', () => {
        const headerCells = wrapper.find('TableHeader').find('TableRow');
        expect(headerCells.exists()).to.be.true;
        expect(headerCells.find('TableHeaderCell')).to.have.length(6);
      });

      it('Must render the first header cell with a checkbox', () => {
        const headerCell = wrapper.find('TableHeader').find('TableRow').find('TableHeaderCell').first();
        expect(headerCell.props().collapsing).to.be.true;
        expect(headerCell.find('Checkbox').exists()).to.be.true;
        expect(headerCell.find('Checkbox').props().readOnly).to.be.true;
      });

      it('Must render 5 text header cells', () => {
        const headerCells = wrapper.find('TableHeader').find('TableRow');
        expect(headerCells.find('TableHeaderCell').at(1).childAt(0).text()).to.be.eql('ID');
        expect(headerCells.find('TableHeaderCell').at(2).childAt(0).text()).to.be.eql('Name');
        expect(headerCells.find('TableHeaderCell').at(3).childAt(0).text()).to.be.eql('Command');
        expect(headerCells.find('TableHeaderCell').at(4).childAt(0).text()).to.be.eql('Ports');
        expect(headerCells.find('TableHeaderCell').at(5).childAt(0).text()).to.be.eql('Status');
      });

      it('Must render the Table.Body element', () => {
        expect(wrapper.find('TableBody').exists()).to.be.true;
      });

      it('Must render 1 row', () => {
        const bodyWrapper = wrapper.find('TableBody');
        expect(bodyWrapper.find('TableRow')).to.have.length(1);
      });

      it('Must render 6 columns in a row', () => {
        const rowWrapper = wrapper.find('TableBody').find('TableRow').first();
        expect(rowWrapper.find('TableCell')).to.have.length(6);
      });

      it('Must render the first column with a checkbox', () => {
        const rowWrapper = wrapper.find('TableBody').find('TableRow').find('TableCell').first();
        expect(rowWrapper.props().collapsing).to.be.true;
        expect(rowWrapper.find('Checkbox').exists()).to.be.true;
      });

      it('Must render contents in a row', () => {
        const rowWrapper = wrapper.find('TableBody').find('TableRow').first();
        expect(rowWrapper.find('TableCell').at(1).childAt(0).text()).to.be.eql('123456789012');
        expect(rowWrapper.find('TableCell').at(2).childAt(0).text()).to.be.eql('container');
        expect(rowWrapper.find('TableCell').at(3).childAt(0).text()).to.be.eql('command');
        expect(rowWrapper.find('TableCell').at(4).childAt(0).text()).to.be.eql('2000');
        expect(rowWrapper.find('TableCell').at(5).childAt(0).text()).to.be.eql('running');
      });
    });

    describe('Without Data', () => {
      const { wrapper } = initiator(false);

      it('Must render the component', () => {
        expect(wrapper.exists()).to.be.true;
      });

      it('Must render the span element', () => {
        expect(wrapper.find('span').exists()).to.be.true;
      });
    });
  });

  describe('Functionality Tests', () => {
    const componentDidMountSpy = spy(DockerProcessComponent.prototype, 'componentDidMount');
    const componentWillReceivePropsSpy = spy(DockerProcessComponent.prototype, 'componentWillReceiveProps');

    const { wrapper, mockFunc } = initiator(false);

    it('Must call componentDidMount', () => {
      componentDidMountSpy.reset();
      mockFunc.reset();
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy.calledOnce).to.be.true;
      expect(mockFunc.calledOnce).to.be.true;
    });

    it('Must call componentWillReceiveProps', () => {
      componentWillReceivePropsSpy.reset();
      expect(wrapper.state().successLog).to.deep.equal([]);
      expect(wrapper.state().errorLog).to.deep.equal('');
      wrapper.instance().componentWillReceiveProps({
        successLog: [{ id: '12345' }],
        errorLog: 'error',
      });
      wrapper.update();
      expect(wrapper.state().successLog).to.deep.equal([{ id: '12345' }]);
      expect(wrapper.state().errorLog).to.deep.equal('error');
    });
  });
});
