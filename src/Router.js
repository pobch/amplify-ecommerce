import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Admin from './Admin'
import Nav from './Nav'
import Profile from './Profile'
import Main from './Main'

function Router(props) {
  const [current, setCurrent] = useState('home')

  useEffect(() => {
    setRoute()
    window.addEventListener('hashchange', setRoute)
    return () => window.removeEventListener('hashchange', setRoute)
  }, [])

  function setRoute() {
    const location = window.location.href.split('/')
    const pathname = location[location.length - 1] || 'home'
    console.log('pathname: ', pathname)
    setCurrent(pathname)
  }

  return (
    <HashRouter>
      <Nav current={current} />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/profile" component={Profile} />
        <Route component={Main} />
      </Switch>
    </HashRouter>
  )
}

export default Router
