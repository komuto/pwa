// @flow
import React from 'react'

const Sort = (props) => {
  const { isShow, selected } = props
  return (
    <div className='sort-option sortButton' style={{display: isShow ? 'block' : 'none'}} onClick={(e) => props.sortOnClick(e)}>
      <div className='sort-list effect-slide-bottom-up sortButton'>
        <p><strong>Urutkan Berdasarkan</strong></p>
        <label className='checkbox' htmlFor='#terbaru' onClick={() => props.sortSelected('terbaru')}>
          <span className={`sort-text ${selected === 'terbaru' ? 'active' : ''}`}>Terbaru</span>
          <span className={`input-wrapper ${selected === 'terbaru' ? 'checked' : ''}`}>
            <input type='checkbox' id='terbaru' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#termurah' onClick={() => props.sortSelected('termurah')}>
          <span className={`sort-text ${selected === 'termurah' ? 'active' : ''}`}>Termurah</span>
          <span className={`input-wrapper ${selected === 'termurah' ? 'checked' : ''}`}>
            <input type='checkbox' id='termurah' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#termahal' onClick={() => props.sortSelected('termahal')}>
          <span className={`sort-text ${selected === 'termahal' ? 'active' : ''}`}>Termahal</span>
          <span className={`input-wrapper ${selected === 'termahal' ? 'checked' : ''}`}>
            <input type='checkbox' id='termahal' />
          </span>
        </label>
        <label className='checkbox' htmlFor='#terlaris' onClick={() => props.sortSelected('terlaris')}>
          <span className={`sort-text ${selected === 'terlaris' ? 'active' : ''}`}>Terlaris</span>
          <span className={`input-wrapper ${selected === 'terlaris' ? 'checked' : ''}`}>
            <input type='checkbox' id='terlaris' />
          </span>
        </label>
      </div>
    </div>
  )
}

export default Sort
