// @flow
import React from 'react'

const Tabbar = (props) => {
  const { viewActive, sortButton, filterButton, viewButton } = props
  const sort = sortButton ? <a onClick={props.sortOnClick} className='level-item has-text-centered js-sort'><span className='icon-sort' />Urutkan</a> : null
  const filter = filterButton ? <a onClick={props.filterOnClick} className='level-item has-text-centered modal-button' data-target='#modal-filter'><span className='icon-filter' />Filter</a> : null
  const view = viewButton
                ? <a onClick={props.viewOnClick} className='level-item has-text-centered'>
                  { (viewActive === 'list') ? <span className='icon-grid-view' /> : <span className='icon-list' /> }
                    Tampilan
                  </a>
                : null
  return (
    <div className='level nav-bottom filter-nav is-mobile'>
      { sort }
      { filter }
      { view }
    </div>
  )
}

export default Tabbar
