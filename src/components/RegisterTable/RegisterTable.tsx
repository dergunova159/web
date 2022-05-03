import { action, computed } from "mobx";
import React = require("react");
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { IData } from "../../api/SysApi";
import "./RegisterTable.less";

export interface RegisterTableProps {
  data: Array<IData>;
  onObjectClick: (id: number) => void;
}

export class RegisterTable extends React.Component<RegisterTableProps> {

  @computed
  get columns() {
    return [
      {
        Header: 'ИД',
        show: false,
        accessor: 'id'
      },
      {
        Header: 'Задача',
        accessor: 'name'
      },
      {
        Header: 'Начало',
        accessor: 'start'
      },
      {
        Header: 'Конец',
        accessor: 'end'
      }
    ];
  }

  @computed
  get data() {
    return (this.props.data || []).map(el => {
      return {
        id: el.id,
        name: el.name,
        start: el.start, 
        end: el.end,
      };
    });
  }

  render() {
    return (
      <ReactTable
        className="custom-react-table"
        data={this.data}
        columns={this.columns}
        showPagination={false}
        pageSize={this.data.length}
        sortable={true}
        resizable={true}
        getTrProps={(state, rowInfo, column) => {
          let id = rowInfo.row.id; 
          return {
            className: "hello",
            onDoubleClick: () => this.props.onObjectClick && this.props.onObjectClick(id),
          }
        }}
      />
    );
  }
}