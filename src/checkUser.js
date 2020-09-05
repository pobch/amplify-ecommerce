import { Auth } from 'aws-amplify'

async function checkUser(setUser) {
  const userData = await Auth.currentSession().catch((err) => console.log('error: ', err))

  if (!userData) {
    console.log('userData: ', userData)
    setUser({})
    return
  }

  const {
    idToken: { payload },
  } = userData
  const isAuthorized = payload?.['cognito:groups']?.includes('Admin') ?? false
  setUser({
    username: payload['cognito:username'],
    isAuthorized,
  })
}

export { checkUser }
