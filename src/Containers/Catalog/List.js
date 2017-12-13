// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Router from 'next/router'
import NProgress from 'nprogress'
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import Images from '../../Themes/Images'
// actions
import * as actionTypes from '../../actions/catalog'

class CatalogList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listCatalog: props.listCatalog,
      dropdownSelected: '',
      confirmDelete: false,
      deleteCatalogTemp: '',
      failedDelete: false,
      isEmpty: false,
      notification: {
        type: 'is-success',
        status: false,
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
    Router.push(`/catalog-edit?id=${catalog.id}`)
  }

  toAddCatalog (e) {
    e.preventDefault()
    Router.push('/catalog-add')
  }

  componentDidMount () {
    this.props.getListCatalog()
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { listCatalog, createCatalog, updateCatalog, statusDeleteCatalog } = nextProps
    const { deleteCatalogTemp, submitting } = this.state
    const { query, isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(listCatalog)) {
      if (isFound(listCatalog)) {
        let isEmpty = listCatalog.catalogs.length < 1
        this.setState({ listCatalog, isEmpty })
        NProgress.done()
      }
      if (isError(listCatalog)) {
        this.setState({ notification: notifError(listCatalog.message) })
      }
    }
    if (query.hasOwnProperty('isSuccess')) {
      if (!isFetching(createCatalog)) {
        if (isFound(createCatalog)) {
          this.setState({ notification: notifSuccess(createCatalog.message) })
        }
        if (isError(createCatalog)) {
          this.setState({ notification: notifError(createCatalog.message) })
        }
      }
      if (!isFetching(updateCatalog)) {
        if (isFound(updateCatalog)) {
          this.setState({ notification: notifSuccess(updateCatalog.message) })
        }
        if (isError(updateCatalog)) {
          this.setState({ notification: notifError(updateCatalog.message) })
        }
      }
    }
    if (!isFetching(statusDeleteCatalog) && submitting) {
      if (isFound(statusDeleteCatalog)) {
        let newData = listCatalog.catalogs.filter(data => data.id !== deleteCatalogTemp.id)
        let newListCatalog = {
          ...listCatalog, catalogs: newData
        }
        this.setState({ listCatalog: newListCatalog, submitting: false, confirmDelete: false, dropdownSelected: '', notification: notifSuccess(statusDeleteCatalog.message) })
      }
      if (isError(statusDeleteCatalog)) {
        this.setState({ submitting: false, confirmDelete: false, dropdownSelected: '', notification: notifError(statusDeleteCatalog.message) })
      }
    }
  }

  render () {
    const { isEmpty, listCatalog, dropdownSelected, confirmDelete, deleteCatalogTemp, notification, failedDelete, submitting } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { isEmpty ? <CatalogEmpty /> : listCatalog.catalogs.map(val => {
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
        }) }
        <div className='wrapper-sticky'>
          <a className='sticky-button' onClick={(e) => this.toAddCatalog(e)}>
            <span className='txt'>+</span>
          </a>
        </div>
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

/** orders empty content */
const CatalogEmpty = () => {
  return (
    <section className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyKatalog} alt='notFound' />
          <p><strong>Katalog kosong</strong></p>
          <p>Silahkan tambah katalog baru</p>
        </div>
      </div>
    </section>
  )
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
