import './App.css'
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { API } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

const initialState = { name: '', price: '' }

function Admin(props) {
  const [itemInfo, setItemInfo] = useState(initialState)
  function updateForm(e) {
    const key = e.target.name
    const value = e.target.value
    setItemInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  async function addItem() {
    try {
      const data = {
        body: {
          ...itemInfo,
          price: Number(itemInfo.price),
        },
      }
      setItemInfo(initialState)
      await API.post('ecommerceapi', '/products', data)
    } catch (err) {
      console.log('error adding item...', err)
    }
  }

  return (
    <div style={containerStyle}>
      <Input
        style={inputStyle}
        name="name"
        onChange={updateForm}
        value={itemInfo.name}
        placeholder="Item name"
      />
      <Input
        style={inputStyle}
        name="price"
        onChange={updateForm}
        value={itemInfo.price}
        placeholder="Item price"
      />
      <Button style={buttonStyle} onClick={addItem}>
        Add Product
      </Button>
    </div>
  )
}

const containerStyle = { width: 400, margin: '20px auto' }
const inputStyle = { marginTop: 10 }
const buttonStyle = { marginTop: 10 }

export default withAuthenticator(Admin)
