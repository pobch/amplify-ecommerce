import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Hub } from 'aws-amplify'
import { checkUser } from './checkUser'

function Nav(props) {
  const { current } = props
  const [user, setUser] = useState({})

  useEffect(() => {
    checkUser(setUser) // catch??
    Hub.listen('auth', (data) => {
      const {
        payload: { event },
      } = data
      console.log('event: ', event)
      if (event === 'signIn' || event === 'signOut') checkUser(setUser) // catch??
    })
    // unlisten ??
  }, [])

  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">
            <UserOutlined />
            Profile
          </Link>
        </Menu.Item>
        {user.isAuthorized && (
          <Menu.Item key="admin">
            <Link to="/admin">
              <ProfileOutlined />
              Admin
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  )
}

export default Nav
