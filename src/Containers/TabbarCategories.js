// @flow
import React from 'react'

const Tabbar = (props) => {
  const { viewActive } = props
  return (
    <div className='level nav-bottom filter-nav is-mobile'>
      <a onClick={props.sortOnClick} className='level-item has-text-centered js-sort'><span className='icon-sort' />Urutkan</a>
      <a onClick={props.filterOnClick} className='level-item has-text-centered modal-button' data-target='#modal-filter'><span className='icon-filter' />Filter</a>
      <a onClick={props.viewOnClick} className='level-item has-text-centered'>
        { (viewActive === 'list') ? <span className='icon-grid-view' /> : <span className='icon-list' /> }
        Tampilan
      </a>
    </div>
  )
}

export default Tabbar
