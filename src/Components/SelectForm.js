// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectForm extends Component {
  static PropTypes = {
    defaultItem: PropTypes.array,
    onSelectChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    indexId: PropTypes.string,
    indexName: PropTypes.string,
    valueIndex: PropTypes.string,
    selected: PropTypes.string,
    items: PropTypes.array
  }
  renderItem (item:Object, index:number, idForm:string) {
    const {indexName, valueIndex} = this.props
    return (<option
      key={'options_' + idForm + index}
      value={valueIndex ? item[valueIndex] : index}>
      {item[indexName || 'id']}
    </option>)
  }
  render () {
    const {id, items, defaultItem, onSelectChange, selected} = this.props
    return (
      <div className='form-group'>
        <label htmlFor={`#` + id} className='select-custom'>
          <select className='form-control' id={id} onChange={onSelectChange} value={selected || ''}>
            {this.renderItem(defaultItem, 0, id)}
            {items.map((thisItem, index) => this.renderItem(thisItem, index, id))}
          </select>
        </label>
      </div>
    )
  }
}

export default SelectForm
