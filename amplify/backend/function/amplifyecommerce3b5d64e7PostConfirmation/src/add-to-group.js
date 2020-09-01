/* eslint-disable-line */ const aws = require('aws-sdk')

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  })

  let isAdmin = false
  const adminEmails = ['pob.ch1@yandex.com']

  if (adminEmails.includes(event.request.userAttributes.email)) {
    isAdmin = true
  }

  if (isAdmin) {
    const groupParams = {
      GroupName: 'Admin',
      UserPoolId: event.userPoolId,
    }

    const addUserParams = {
      GroupName: 'Admin',
      UserPoolId: event.userPoolId,
      Username: event.userName,
    }

    try {
      await cognitoidentityserviceprovider.getGroup(groupParams).promise()
    } catch (e) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise()
    }

    try {
      await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise()
      callback(null, event)
    } catch (e) {
      callback(e)
    }
  } else {
    callback(null, event)
  }
}
