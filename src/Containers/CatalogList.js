// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import NProgress from 'nprogress'
// actions
import * as actionTypes from '../actions/catalog'
// services
import { Status } from '../Services/Status'

class CatalogList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listCatalog: props.listCatalog,
      dropdownSelected: '',
      confirmDelete: false,
      deleteCatalogTemp: '',
      failedDelete: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  handleDropdown (e, id) {
    e.preventDefault()
    const { dropdownSelected } = this.state
    const newState = { dropdownSelected }
    newState.dropdownSelected = id
    this.setState(newState)
  }

  modalFailedDelete (catalog) {
    const { failedDelete } = this.state
    this.setState({ failedDelete: !failedDelete, deleteCatalogTemp: catalog, dropdownSelected: '' })
  }

  modalShowDelete (e, catalog) {
    e.preventDefault()
    const { confirmDelete } = this.state
    if (catalog.count_product === 0) {
      this.setState({ confirmDelete: !confirmDelete, deleteCatalogTemp: catalog, dropdownSelected: '' })
    } else {
      this.modalFailedDelete(catalog)
    }
  }

  modalConfirmDelete (e) {
    e.preventDefault()
    const { deleteCatalogTemp } = this.state
    this.setState({ submitting: true })
    this.props.deleteCatalog({id: deleteCatalogTemp.id})
  }

  toEditCatalog (e, catalog) {
    e.preventDefault()
    NProgress.start()
    Router.push(`/catalog-edit?id=${catalog.id}`)
  }

  toAddCatalog (e) {
    e.preventDefault()
    NProgress.start()
    Router.push('/catalog-add')
  }

  componentDidMount () {
    this.props.getListCatalog()
  }

  componentWillReceiveProps (nextProps) {
    const { notification, listCatalog, deleteCatalogTemp, submitting } = this.state
    const { createCatalog, updateCatalog, statusDeleteCatalog, query } = nextProps
    if (nextProps.listCatalog.status === 200) {
      this.setState({ listCatalog: nextProps.listCatalog })
    }
    if (query.hasOwnProperty('isSuccess')) {
      if (!createCatalog.isLoading) {
        switch (createCatalog.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = createCatalog.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = createCatalog.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          }
          default:
            break
        }
        this.setState({ notification })
      }
      if (updateCatalog.isFound) {
        switch (updateCatalog.status) {
          case Status.SUCCESS: {
            const newNotification = { notification }
            newNotification.notification['status'] = true
            newNotification.notification['message'] = updateCatalog.message
            newNotification.notification['color'] = 'is-success'
            this.setState(newNotification)
            break
          }
          case Status.OFFLINE :
          case Status.FAILED : {
            const newNotif = { notification }
            newNotif.notification['status'] = true
            newNotif.notification['message'] = updateCatalog.message
            newNotif.notification['color'] = 'is-danger'
            this.setState(newNotif)
            break
          }
          default:
            break
        }
        this.setState({ notification })
      }
    }
    if (!statusDeleteCatalog.isLoading && submitting) {
      switch (statusDeleteCatalog.status) {
        case Status.SUCCESS: {
          let newData = listCatalog.catalogs.filter(data => data.id !== deleteCatalogTemp.id)
          let newListCatalog = {
            ...listCatalog, catalogs: newData
          }
          this.setState({ listCatalog: newListCatalog, submitting: false, confirmDelete: false, dropdownSelected: '' })
          const newNotification = { notification }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = statusDeleteCatalog.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ submitting: false, confirmDelete: false, dropdownSelected: '' })
          const newNotif = { notification }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = statusDeleteCatalog.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
  }

  render () {
    const { listCatalog, dropdownSelected, confirmDelete, deleteCatalogTemp, notification, failedDelete, submitting } = this.state
    return (
      <div>
        <div
          className={`notification ${notification.status && notification.color}`}
          style={{display: notification.status ? 'block' : 'none'}}>
          <button className='delete' onClick={(e) => this.handleNotification(e)} />
          {notification.message}
        </div>
        { listCatalog.catalogs.length !== 0 ? listCatalog.catalogs.map(val => {
          return (
            <section className='section is-paddingless bg-white' key={val.id}>
              <div className='data-wrapper'>
                <div className='head-panel' onClick={(e) => this.handleDropdown(e, val.id)}>
                  <h3>{val.name}</h3>
                  <p>{val.count_product} Produk</p>
                  <div className={`menu-top ${dropdownSelected === val.id && 'open'}`}>
                    <a className='option-content'>
                      <span /><span /><span />
                    </a>
                    <ul className='option-dropdown'>
                      <li onClick={(e) => this.toEditCatalog(e, val)}><a>Edit</a></li>
                      <li onClick={(e) => this.modalShowDelete(e, val)}>
                        <a className='js-option'>Hapus</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )
        }) : <p style={{textAlign: 'center', paddingTop: '20px'}}>Silahkan tambah katalog baru</p>}
        <a className='sticky-button' onClick={(e) => this.toAddCatalog(e)}>
          <span className='txt'>+</span>
        </a>
        <div className='sort-option' style={{display: confirmDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Anda yakin akan menghapus</h3>
            <h3>Katalog "{deleteCatalogTemp.name}" ?</h3>
            <button
              className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
              onClick={(e) => this.modalConfirmDelete(e)}>Ya, Hapus Katalog</button>
            <a className='cancel' onClick={(e) => this.modalShowDelete(e, '')}>Batal</a>
          </div>
        </div>
        <div className='sort-option' style={{display: failedDelete && 'block'}}>
          <div className='notif-report'>
            <h3>Gagal menghapus katalog</h3>
            <h3>"{deleteCatalogTemp.name}"</h3>
            <p>Anda tidak bisa menghapus katalog tersebut karena masih ada barang di dalamnya</p>
            <button
              className='button is-primary is-large is-fullwidth'>Tutup</button>
            <a className='cancel' onClick={() => this.modalFailedDelete('')}>Batal</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    createCatalog: state.createCatalog,
    updateCatalog: state.updateCatalog,
    listCatalog: state.getListCatalog,
    statusDeleteCatalog: state.deleteCatalog
  }
}

const mapDispatchToProps = dispatch => ({
  getListCatalog: () => dispatch(actionTypes.getListCatalog()),
  deleteCatalog: (params) => dispatch(actionTypes.deleteCatalog(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogList)
