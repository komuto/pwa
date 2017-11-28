// @flow
import React, { Component } from 'react'
import Content from '../Components/Content'
import _ from 'lodash'
// import RegexNormal from '../Lib/RegexNormal'
import { inputNumber } from '../Validations/Input'

export class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expeditionServices: props.expeditionServices || [],
      provinces: props.provinces || [],
      districts: props.districts || [],
      brands: props.brands || [],
      tabActive: 'condition',
      tabs: [
        {
          id: 'condition',
          name: 'Kondisi',
          viewCheckAll: true,
          selectedAll: false,
          options: [
            {
              id: 'new',
              name: 'Baru',
              selected: false
            },
            {
              id: 'used',
              name: 'Bekas',
              selected: false
            }
          ]
        },
        {
          id: 'expeditionServices',
          name: 'Jasa Pengiriman',
          viewCheckAll: true,
          selectedAll: false,
          options: []
        },
        {
          id: 'harga',
          name: 'Rentang Harga',
          viewCheckAll: false,
          customComponent: true,
          priceMinimum: 0,
          priceMaximum: 0
        },
        {
          id: 'sendFrom',
          name: 'Dikirim Dari',
          viewCheckAll: false,
          districtsSelected: null,
          customComponent: true
        },
        {
          id: 'brands',
          name: 'Brand',
          viewCheckAll: true,
          selectedAll: false,
          options: []
        },
        {
          id: 'others',
          name: 'Lainya',
          viewCheckAll: false,
          options: [
            {
              id: 'discount',
              name: 'Diskon',
              selected: false
            },
            {
              id: 'verified',
              name: 'Seller Terverifikasi',
              selected: false
            },
            {
              id: 'wholesaler',
              name: 'Grosir',
              selected: false
            }
          ]
        }
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    const { expeditionServices, provinces, brands, districts } = nextProps
    let { tabs } = this.state
    tabs.map((tab) => {
      if (tab.id === 'expeditionServices' && tab.options.length < 1) {
        expeditionServices.map((expedition) => {
          expedition.name = expedition.full_name
          expedition.selected = false
        })
        tab.options = expeditionServices
      }

      if (tab.id === 'brands') {
        tab.options = brands
      }
    })

    this.setState({ tabs, provinces, districts })
  }

  setTabActive (tabActive) {
    this.setState({ tabActive })
  }

  viewCheckAll (event, tabActive) {
    const selectedAll = event.target.checked
    let { tabs } = this.state
    tabs.map((tab) => {
      if (tab.id === tabActive) {
        tab.selectedAll = selectedAll
        tab.options.map((option) => {
          option.selected = selectedAll
        })
      }
    })
    this.setState({ tabs })
  }

  viewCheckItem (event, tabActive) {
    const id = event.target.name
    const selectedItem = event.target.checked
    let { tabs } = this.state
    tabs.map((tab) => {
      if (tab.id === tabActive) {
        // set item selected
        tab.options.map((option) => {
          if (_.toString(option.id) === _.toString(id)) {
            option.selected = selectedItem
          }
        })
        // find options with selected is false
        tab.selectedAll = (tab.options.filter((option) => { return !option.selected }).length < 1)
      }
    })
    this.setState({ tabs })
  }

  filterTabsByActive (tabActive) {
    const { tabs } = this.state
    return tabs.filter((tab) => { return tab.id === tabActive })[0]
  }

  filterReset () {
    let { tabs, districts } = this.state
    tabs.map((tab) => {
      tab.selectedAll = false
      tab.customComponent
      ? tab.districtsSelected = null
      : tab.options.map((option) => {
        option.selected = false
      })
    })
    districts = []
    this.setState({ tabs, districts })
  }

  // filter event button
  filterRealization () {
    this.props.filterRealization(this.state.tabs)
  }
  // change provinces event selected
  onChangeProvinces (event) {
    this.props.onChangeProvinces(event.target.value)
  }
  // change change event selected
  onChangeDistrict (event) {
    const { tabs } = this.state
    const value = event.target.value
    if (value !== 'default') tabs.map((tab) => { if (tab.id === 'sendFrom') tab.districtsSelected = value })
    this.setState({ tabs })
  }

  onChangePriceMinimum (e) {
    let value = inputNumber(e.target.value)
    let { tabs } = this.state
    tabs.map((tab) => { if (tab.id === 'harga') tab.priceMinimum = value })
    this.setState({ tabs })
  }

  onChangePriceMaximun (e) {
    let value = inputNumber(e.target.value)
    let { tabs } = this.state
    tabs.map((tab) => { if (tab.id === 'harga') tab.priceMaximum = value })
    this.setState({ tabs })
  }

  render () {
    const { isShow } = this.props
    const { tabActive, tabs, provinces, districts } = this.state
    const filterTabResults = this.filterTabsByActive(tabActive)
    const tabsNav = tabs.map((tab) => { return <li key={tab.id} className={`${tabActive === tab.id ? 'is-active' : ''}`}><a onClick={() => this.setTabActive(tab.id)}>{ tab.name }</a></li> })
    const checkAllButton = filterTabResults.viewCheckAll
          ? <label className='checkbox'>
            <span className='sort-text active'>Pilih Semua</span>
            <span className={`input-wrapper ${filterTabResults.selectedAll ? 'checked' : ''}`}>
              <input type='checkbox' checked={filterTabResults.selectedAll} onChange={(event) => this.viewCheckAll(event, tabActive)} />
            </span>
          </label>
          : null

    let chekAllItems = null
    if (filterTabResults.customComponent && filterTabResults.id === 'sendFrom') {
      chekAllItems = <Content>
        <InputDropdown
          title='Wilayah / Provinsi'
          onChange={(event) => this.onChangeProvinces(event)}
          options={provinces} />
        <InputDropdown
          title='Kota'
          onChange={(event) => this.onChangeDistrict(event)}
          options={districts} />
      </Content>
    } else if (filterTabResults.customComponent && filterTabResults.id === 'harga') {
      chekAllItems = <Content>
        <label className='checkbox is-other'>
          <span className='label'>Harga Minimal</span>
          <div className='filter-price'>
            <span className='currency'>Rp</span>
            <input type='text' className='input' onChange={(e) => this.onChangePriceMinimum(e)} value={filterTabResults.priceMinimum} />
          </div>
        </label>
        <label className='checkbox is-other'>
          <span className='label'>Harga Maksimal</span>
          <div className='filter-price'>
            <span className='currency'>Rp</span>
            <input type='text' className='input' onChange={(e) => this.onChangePriceMaximun(e)} value={filterTabResults.priceMaximum} />
          </div>
        </label>
      </Content>
    } else {
      chekAllItems = filterTabResults.options.map((option) => {
        return (
          <label className='checkbox' key={option.id}>
            {
                                option.label ? <span className='label'>{ option.label }</span> : ''
                              }
            <span className='sort-text'>{ option.name }</span>
            <span className={`input-wrapper ${option.selected ? 'checked' : ''}`}>
              <input type='checkbox' name={option.id} checked={option.selected ? option.selected : false} onChange={(event) => this.viewCheckItem(event, tabActive)} />
            </span>
          </label>
        )
      })
    }
    return (
      <div className={`modal modal-filter ${isShow ? 'is-active' : ''}`} id='modal-filter' style={{ zIndex: 1000 }}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Filter</p>
            <button onClick={() => this.props.filterOnClick()} className='delete icon-close' />
          </header>
          <section className='modal-card-body' style={{ marginBottom: 0 }}>
            <div className='fiter-side'>
              <div className='tabs'>
                <ul>
                  { tabsNav }
                </ul>
              </div>
            </div>
            <div className='filter-option active'>
              <div className='sort-list'>
                { checkAllButton }
                { chekAllItems }
              </div>
            </div>
          </section>
          <footer className='modal-card-foot'>
            <div className='columns is-mobile'>
              <div className='column is-half'>
                <a className='button is-large is-fullwidth is-outlined' onClick={() => this.filterReset()}>Reset Filter</a>
              </div>
              <div className='column is-half'>
                <a className='button is-primary is-large is-fullwidth' onClick={() => this.filterRealization()}>Terapkan Filter</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

const InputDropdown = (props) => {
  const { title, options } = props
  return (
    <label className='checkbox is-other'>
      <span className='label'>{ title }</span>
      <div className='field'>
        <p className='control'>
          <span className='select'>
            <select onChange={(event) => props.onChange(event)}>
              <option value='default'> Pilih { title }</option>
              {
                options.map((option) => {
                  return <option key={option.id} value={option.id}> { option.name }</option>
                })
              }
            </select>
          </span>
        </p>
      </div>
    </label>
  )
}

export default Filter
