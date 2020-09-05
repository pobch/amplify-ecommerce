import './App.css'
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { API } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

function Admin(props) {
  const [itemInfo, setItemInfo] = useState({ name: '', price: '' })

  return (
    <div>
      <Input />
      <Input />
      <Button>Add Product</Button>
    </div>
  )
}

export default withAuthenticator(Admin)
