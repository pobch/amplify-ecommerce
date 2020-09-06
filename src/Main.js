import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import { API } from 'aws-amplify'
import Container from './Container'
import { checkUser } from './checkUser'

function Main(props) {
  const [state, setState] = useState({ products: [], loading: true })
  const [user, setUser] = useState({})
  let didCancel = false

  useEffect(() => {
    getProducts() // catch??
    checkUser(setUser) // there is a `catch` inside this
    return () => (didCancel = true)
  }, [])

  async function getProducts() {
    const data = await API.get('ecommerceapi', '/products')
    console.log('data: ', data)
    if (didCancel) return
    setState({ products: data.data.Items, loading: false })
  }

  async function deleteItem(id) {
    try {
      setState((prev) => {
        return {
          ...prev,
          products: prev.products.filter((product) => product.id !== id),
        }
      })
      await API.del('ecommerceapi', '/products', { body: { id } })
      console.log('successfully deleted item')
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={(item) => {
          return (
            <List.Item
              actions={
                user.isAuthorized
                  ? [
                      <p key={item.id} onClick={() => deleteItem(item.id)}>
                        Delete
                      </p>,
                    ]
                  : null
              }
            >
              <List.Item.Meta title={item.name} description={item.price} />
            </List.Item>
          )
        }}
      />
    </Container>
  )
}

export default Main
