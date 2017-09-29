// @flow
import React from 'react'

const Sort = (props) => {
  const { sortActive, selectedSort } = props
  return (
    <div className='sort-option sortButton' style={{display: sortActive ? 'block' : 'none'}} onClick={(e) => props.sortOnClick(e)}>
      <div className='sort-list effect-slide-bottom-up sortButton'>
        <p><strong>Urutkan Berdasarkan</strong></p>
        <label className='checkbox' htmlFor='#terbaru' onClick={() => props.sortSelected('terbaru')}>
          <span className={`sort-text ${selectedSort === 'terbaru' ? 'active' : ''}`}>Terbaru</span>
          <span className={`input-wrapper ${selectedSort === 'terbaru' ? 'checked' : ''}`}>
            <input type='checkbox' id='terbaru' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#termurah' onClick={() => props.sortSelected('termurah')}>
          <span className={`sort-text ${selectedSort === 'termurah' ? 'active' : ''}`}>Termurah</span>
          <span className={`input-wrapper ${selectedSort === 'termurah' ? 'checked' : ''}`}>
            <input type='checkbox' id='termurah' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#termahal' onClick={() => props.sortSelected('termahal')}>
          <span className={`sort-text ${selectedSort === 'termahal' ? 'active' : ''}`}>Termahal</span>
          <span className={`input-wrapper ${selectedSort === 'termahal' ? 'checked' : ''}`}>
            <input type='checkbox' id='termahal' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#terlaris' onClick={() => props.sortSelected('terlaris')}>
          <span className={`sort-text ${selectedSort === 'terlaris' ? 'active' : ''}`}>Terlaris</span>
          <span className={`input-wrapper ${selectedSort === 'terlaris' ? 'checked' : ''}`}>
            <input type='checkbox' id='terlaris' />
          </span>
        </label>
      </div>
    </div>
  )
}

export default Sort
