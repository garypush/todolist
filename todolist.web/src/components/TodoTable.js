import React from 'react';
import PropTypes from 'prop-types'
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import {
  updateItem,
  deleteItem,
  addItem,
  fetchItems
} from '../actions/index'

const columns = [
  { title: 'Description', field: 'description' },
  { title: 'Status', field: 'status', editable: 'never' },
  { title: 'Created On', field: 'createdOn', editable: 'never', type: 'datetime' },
  { title: 'Updated On', field: 'modifiedOn', editable: 'never', type: 'datetime' },
]

class TodoTable extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchItems())
  }
  
  render() {
    const { items } = this.props;
    return (
      <MaterialTable
        title="To-Do Items"
        columns={columns}
        data={items}
        editable={{
          onRowAdd: newData => this.props.dispatch(addItem(newData.description)),
          onRowUpdate: (newData, oldData) => this.props.dispatch(updateItem(oldData.id, newData)),
          onRowDelete: oldData => this.props.dispatch(deleteItem(oldData.id))
        }}
        actions={[
          rowData => ({
            icon: 'check',
            tooltip: 'Complete',
            disabled: rowData.status === 'Done',
            onClick: (event, rowData) => this.props.dispatch(updateItem(rowData.id, {
              description: rowData.description,
              status: 'Done'
            }))
          })
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    );
  }
}

TodoTable.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { reducer } = state
  const { items, isFetching } = reducer
  return {
    items,
    isFetching,
  }
}

export default connect(mapStateToProps)(TodoTable);;
