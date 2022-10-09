const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the User data model
const ListingModel = require('../definitions/listing')

router.get('/test', (req,res) => {
    res.send('We are on test')
})

// Create a listing
router.post('/create', async (req,res)=>{
    // pass the information to an object 

	const post = new ListingModel({
            creator: req.body.creator,
			title: req.body.title,
			description: req.body.description 
	})
	
	// save the listing to db
	try{
		const saveListing = await post.save()
		res.status(200).json(saveListing)
	}catch(err){
		res.status(500).json({message: err.message})
	}
})

// Get all listing
router.get('/all', async (req, res) => {
    try {
        // Fetch the user details in the database
        const userDetails = await ListingModel.findOne({ username: req.body.username })

        res.status(200).send({
            userName: userDetails.username,
            message: 'Login successful',
        })
    } catch (err) {
        // Return error 500 if an internal server error occurred
        res.status(500).json({ message: err.message })
    }
})

// function routes() {
//     // Get all listings
//     router.get('/all', async (req, res) => {
//         try {
//             // Fetch the user details in the database
//             const userDetails = await UserModel.findOne({ username: req.body.username })

//             res.status(200).send({
//                 userName: userDetails.username,
//                 message: 'Login successful',
//             })
//         } catch (err) {
//             // Return error 500 if an internal server error occurred
//             res.status(500).json({ message: err.message })
//         }
//     })

//     return router
// }

module.exports = router