import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://localhost:8000';
    this.state = {
      columns: [
        { title: 'Description', field: 'description' },
        { title: 'Status', field: 'status', editable: 'never' },
        { title: 'Created On', field: 'createdOn', editable: 'never', type: 'datetime' },
        { title: 'Updated On', field: 'modifiedOn', editable: 'never', type: 'datetime' },
      ],
    }
    this.getData();
  }

  render() {
    return (
      <MaterialTable
        title="Items"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            this.add(newData).then(newData => {
              const data = this.state.data;
              data.push(newData);
              this.setState({ data });
            }),
          onRowUpdate: (newData, oldData) =>
            this.update(newData).then(newData => {
              const data = this.state.data;
              const index = data.indexOf(oldData);
              data[index] = newData;
              this.setState({ data });
            }),
          onRowDelete: oldData =>
            this.delete(oldData).then(() => {
              let data = this.state.data;
              const index = data.indexOf(oldData);
              data.splice(index, 1);
              this.setState({ data });
            }),
        }}
        actions={[
          rowData => ({
            icon: 'check',
            tooltip: 'Complete',
            disabled: rowData.status === 'Done',
            onClick: (event, rowData) => this.complete(rowData).then(newData => {
              const data = this.state.data;
              const index = data.indexOf(rowData);
              data[index] = newData;
              this.setState({ data });
            })
          })
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    );
  }

  getData() {
    axios.get('items/').then(response => {
      this.state.data = response.data;
      let data = this.state.data;
      this.setState({ data });
    })
  }

  async add(data) {
    const response = await axios.post('items/', data);
    return response.data;
  }

  async update(data) {
    let newData = {
      status: data.status,
      description : data.description
    } 
    const response = await axios.put(`items/${data.id}/`, newData);
    return response.data;
  }

  async delete(data) {
    const response = await axios.delete(`items/${data.id}/`);
    return response.data;
  }

  async complete(data) {
    let newData = {
      status : 'Done',
      description : data.description
    }
    const response = await axios.put(`items/${data.id}/`, newData);
    return response.data;
  }
}

export default TodoList;
