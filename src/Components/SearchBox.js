import React, { Component } from 'react'

class SearchBox extends Component {
  render () {
    return (
      <nav className='level header is-fullwidth'>
        <div className='nav-left'>
          <a className='level-item'>
            <span>Galaksi Parabola</span>
          </a>
        </div>
        <div className='nav-right'>
          <span className='icon-love' />
          <span className='icon-cart'><span className='notif-cart'>4</span></span>
        </div>
        <div className='field search-form is-clearfix'>
          <p className='control has-icons-left'>
            <input className='input is-medium' type='text' placeholder='Cari barang' />
            <span className='icon is-left'>
              <span className='icon-search' />
            </span>
          </p>
        </div>
      </nav>
    )
  }
}

export default SearchBox
