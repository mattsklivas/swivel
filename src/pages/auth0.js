import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
  secret: 'process.env.REACT_APP_AUTH0_SECRET',
  issuerBaseURL: 'https://dev-gl5357kx.us.auth0.com',
  baseURL: 'http://localhost:3000',
  clientID: 'JRfLd06JxXfnzE2wDOdbO6iJaWmDYeWQ',
  clientSecret: '0aAMy3OkAo4CAVUicd4xxnVooHZtkKgBMLKB0xHO0Rl7SaH6DvmfHJ-wc01emIcR',
})