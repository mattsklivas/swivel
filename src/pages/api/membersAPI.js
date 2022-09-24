import auth0 from '../auth0'

// this is the way to prevent unathorixed api access
export default auth0.withApiAuthRequired((req, res) => {
    res.status(200).json({ name: 'John Doe' })
   //  const {user} = await auth0.getSession(req, res)
    // user.sub has the user id 
})