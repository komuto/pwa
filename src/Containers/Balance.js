import React, { Component } from 'react'
import { connect } from 'react-redux'
// component
import Content from '../Components/Content'
import Card from '../Components/Card'
import CardList from '../Components/CardList'

class Balance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      balance: props.balance || null
    }
  }

  render () {
    return (
      <Content>
        <BalancePanel />
        <BalanceContent />
      </Content>
    )
  }
}

const BalancePanel = () => {
  return (
    <div class='saldo-panel'>
      <p>Rp 250.219</p>
    </div>
  )
}

const BalanceContent = (props) => {
  return (
    <Content>
      <Card title='Isi Ulang'>
        <CardList className='icon-wallet-add' title='Isi Ulang Saldo' url='' />
        <CardList className='icon-status-add' title='Status Pengisian' url='' />
      </Card>
      <Card title='Penarikan Saldo'>
        <CardList className='icon-wallet-pull' title='Tarik Saldo' url='' />
        <CardList className='icon-status-pull' title='Status Penarikan Saldo' url='' />
      </Card>
      <Card>
        <CardList className='icon-history' title='History Saldo' url='' />
      </Card>
    </Content>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToPtops = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToPtops)(Balance)
