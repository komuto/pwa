// @flow
import React, { Component } from 'react'

export class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
          id: 'jasa',
          name: 'Jasa Pengiriman',
          viewCheckAll: true,
          selectedAll: false,
          options: [
            {
              id: 'jnereguler',
              name: 'JNE Reguler',
              selected: false
            },
            {
              id: 'jneoke',
              name: 'JNE OKE',
              selected: false
            },
            {
              id: 'jneyes',
              name: 'JNE Yes',
              selected: false
            }
          ]
        },
        {
          id: 'harga',
          name: 'Rentang Harga',
          viewCheckAll: false,
          options: [
            {
              id: 'hargaMinimal',
              name: 'Rp 200.000',
              label: 'Harga Minimal',
              selected: false
            },
            {
              id: 'hargaMaksimal',
              name: 'Rp 500.000',
              label: 'Harga Maksimal',
              selected: false
            }
          ]
        },
        {
          id: 'dikirim',
          name: 'Dikirim Dari',
          viewCheckAll: false,
          options: [
            {
              id: 'dari',
              name: 'Dari',
              options: [
                {
                  id: 'bandung',
                  name: 'Bandung',
                  selected: false
                },
                {
                  id: 'jakarta',
                  name: 'Jakarta',
                  selected: false
                }
              ]
            },
            {
              id: 'ke',
              name: 'Ke',
              options: [
                {
                  id: 'jogja',
                  name: 'Yogyakarta',
                  selected: false
                },
                {
                  id: 'solo',
                  name: 'Solo',
                  selected: false
                }
              ]
            }
          ]
        },
        {
          id: 'brand',
          name: 'Brand',
          viewCheckAll: true,
          selectedAll: false,
          options: [
            {
              id: 'adidas',
              name: 'Adidas',
              selected: false
            },
            {
              id: 'nike',
              name: 'Nike',
              selected: false
            }
          ]
        },
        {
          id: 'lainya',
          name: 'Lainya',
          viewCheckAll: false,
          options: [
            {
              id: 'diskon',
              name: 'Diskon',
              selected: false
            },
            {
              id: 'seller',
              name: 'Seller Terverifikasi',
              selected: false
            }
          ]
        }
      ]
    }
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
          if (option.id === id) {
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
    const { tabs } = this.state
    tabs.map((tab) => {
      tab.selectedAll = false
      tab.options.map((option) => {
        option.selected = false
      })
    })
    this.setState({ tabs })
  }

  filterRealization () {
    this.props.filterRealization(this.state.tabs)
  }

  render () {
    const { isShow } = this.props
    const { tabActive, tabs } = this.state
    const filterTabResults = this.filterTabsByActive(tabActive)

    return (
      <div className={`modal modal-filter ${isShow ? 'is-active' : ''}`} id='modal-filter' style={{ zIndex: 100 }}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Filter</p>
            <button onClick={() => this.props.filterClose()} className='delete icon-close' />
          </header>
          <section className='modal-card-body' style={{ marginBottom: 0 }}>
            <div className='fiter-side'>
              <div className='tabs'>
                <ul>
                  {
                    tabs.map((tab) => {
                      return <li key={tab.id} className={`${tabActive === tab.id ? 'is-active' : ''}`}><a onClick={() => this.setTabActive(tab.id)}>{ tab.name }</a></li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div className='filter-option active'>
              <div className='sort-list'>
                {
                filterTabResults.viewCheckAll
                ? <label className='checkbox'>
                  <span className='sort-text'>Pilih Semua</span>
                  <span className={`input-wrapper ${filterTabResults.selectedAll ? 'checked' : ''}`}>
                    <input type='checkbox' checked={filterTabResults.selectedAll} onChange={(event) => this.viewCheckAll(event, tabActive)} />
                  </span>
                </label>
                : null
              }
                {
                filterTabResults.options.map((option) => {
                  if (option.options) {
                    return (
                      <label className='checkbox' key={option.id}>
                        <span className='label'>{ option.name }</span>
                        <div className='field'>
                          <p className='control'>
                            <span className='select'>
                              <select>
                                {
                                  option.options.map((option) => {
                                    return <option key={option.id}> { option.name }</option>
                                  })
                                }
                              </select>
                            </span>
                          </p>
                        </div>
                      </label>
                    )
                  } else {
                    return (
                      <label className='checkbox' key={option.id}>
                        {
                          option.label ? <span className='label'>{ option.label }</span> : ''
                        }
                        <span className='sort-text'>{ option.name }</span>
                        <span className={`input-wrapper ${option.selected ? 'checked' : ''}`}>
                          <input type='checkbox' name={option.id} checked={option.selected} onChange={(event) => this.viewCheckItem(event, tabActive)} />
                        </span>
                      </label>
                    )
                  }
                })}
              </div>
            </div>
          </section>
          <footer className='modal-card-foot'>
            <div className='columns is-mobile'>
              <div className='column'>
                <a className='button is-large is-fullwidth is-outlined' onClick={() => this.filterReset()}>Reset Filter</a>
              </div>
              <div className='column'>
                <a className='button is-primary is-large is-fullwidth' onClick={() => this.filterRealization()}>Terapkan Filter</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default Filter
