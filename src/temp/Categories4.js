// @flow
import React, { Component } from 'react'
// components
import Content from '../Components/Content'
import Section from '../Components/Section'
import {Images} from '../Themes'
import Product from '../Components/Product'
import ProductContainers from '../Components/ProductContainers'
// containers
import TabbarCategories from './TabbarCategories'
import Sort from './Sort'
import Filter from './Filter'

class Categories4 extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      sortActive: false,
      filterActive: false,
      viewActive: 'list',
      selectedSort: null
    })
  }

  sortOnClick () {
    this.setState({ sortActive: true })
  }

  filterOnClick () {
    this.setState({ filterActive: true })
  }

  viewOnClick () {
    let { viewActive } = this.state
    viewActive = viewActive === 'list' ? 'grid' : 'list'
    this.setState({ viewActive })
  }

  sortSelected (selectedSort) {
    this.setState({selectedSort, sortActive: false})
  }

  filterClose () {
    this.setState({ filterActive: false })
  }

  render () {
    const { sortActive, filterActive, selectedSort, viewActive } = this.state
    return (
      <Content>
        <Section
          style={{marginBottom: '40px'}}>
          {
            (viewActive === 'list')
            ? <Content>
              <ProductContainers>
                <Product
                  viewActive={viewActive}
                  images={Images.thumb}
                  pin={{type: 'disc', value: '58%'}}
                  name='Casual and Light Nike Shoes Running'
                  store='GadgetArena'
                  price='Rp 10.500.000'
                  wish='100' />
              </ProductContainers>
              <ProductContainers>
                <Product
                  viewActive={viewActive}
                  images={Images.thumb}
                  pin={{type: 'gross', value: 'Grossir'}}
                  name='Casual and Light Nike Shoes Running'
                  store='GadgetArena'
                  discount='Rp 500.000'
                  price='Rp 10.500.000'
                  wish='100' />
              </ProductContainers>
              <ProductContainers>
                <Product
                  viewActive={viewActive}
                  images={Images.thumb}
                  pin={{type: 'gross', value: 'Grossir'}}
                  name='Casual and Light Nike Shoes Running'
                  store='GadgetArena'
                  discount='Rp 500.000'
                  price='Rp 10.500.000'
                  wish='100' />
              </ProductContainers>
              <ProductContainers>
                <Product
                  viewActive={viewActive}
                  images={Images.thumb}
                  pin={{type: 'gross', value: 'Grossir'}}
                  name='Casual and Light Nike Shoes Running'
                  store='GadgetArena'
                  discount='Rp 500.000'
                  price='Rp 10.500.000'
                  wish='100' />
              </ProductContainers>
            </Content>
            : <ProductContainers>
              <Product
                viewActive={viewActive}
                images={Images.thumb}
                pin={{type: 'disc', value: '58%'}}
                name='Casual and Light Nike Shoes Running'
                store='GadgetArena'
                price='Rp 10.500.000'
                wish='100' />
              <Product
                viewActive={viewActive}
                images={Images.thumb}
                pin={{type: 'gross', value: 'Grossir'}}
                name='Casual and Light Nike Shoes Running'
                store='GadgetArena'
                discount='Rp 500.000'
                price='Rp 10.500.000'
                wish='100' />
              <Product
                viewActive={viewActive}
                images={Images.thumb}
                pin={{type: 'gross', value: 'Grossir'}}
                name='Casual and Light Nike Shoes Running'
                store='GadgetArena'
                discount='Rp 500.000'
                price='Rp 10.500.000'
                wish='100' />
              <Product
                viewActive={viewActive}
                images={Images.thumb}
                pin={{type: 'gross', value: 'Grossir'}}
                name='Casual and Light Nike Shoes Running'
                store='GadgetArena'
                discount='Rp 500.000'
                price='Rp 10.500.000'
                wish='100' />
            </ProductContainers>
          }
        </Section>
        <TabbarCategories
          sortOnClick={() => this.sortOnClick()}
          filterOnClick={() => this.filterOnClick()}
          viewOnClick={() => this.viewOnClick()}
          viewActive={viewActive} />
        <Sort
          isShow={sortActive}
          selected={selectedSort}
          sortSelected={(data) => this.sortSelected(data)} />
        <Filter
          isShow={filterActive}
          filterClose={() => this.filterClose()} />
      </Content>
    )
  }
}

export default Categories4
