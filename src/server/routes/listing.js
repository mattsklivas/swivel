const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the User data model
const ListingModel = require('../definitions/listing')

// Return all object
router.get('/', async (req,res) => {
    const listing = await ListingModel.find()
    res.json(listing)
    try{
        res.status(200).send({
        message: 'Listings retrieved from database',
    })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Return one listing
router.get('/:listingID', async (req, res) => {
    try {
        // Fetch one listing in the database
        const retrievedListing = await ListingModel.findOne({ username: req.params.listingID })      
        res.status(200).json(retrievedListing)
    } catch (err) {
        // Return error 500 if an internal server error occurred
        res.status(500).json({ message: err.message })
    }
})

// Return all the listings from the user
router.get('/user/:creator', async (req, res) => {
    try {
        // Fetch one listing in the database
        const retrievedListing = await ListingModel.find({ creator: req.params.creator })      
        res.status(200).json(retrievedListing)
    } catch (err) {
        // Return error 500 if an internal server error occurred
        res.status(500).json({ message: err.message })
    }
})

// Create a user
router.post('/create', async (req,res)=>{
    // pass the information to an object 

	const listModel = new ListingModel({
            Email: req.body.email,
			username: req.body.username,
			location: req.body.description 
	})
	
	// save the listing to dbg
	try{
		const saveListing = await listModel.save()
		res.status(200).json(saveListing)
	}catch(err){
		res.status(500).json({message: err.message})
	}
})

// Update a post
router.patch('/:listingID', async(req,res) =>{
	try{
		//update one
		const updateListing = await ListingModel.updateOne(
			{_id: req.params.listingID}, 
			{$set: {title: req.body.title, description: req.body.description}}) // need to include image!!!
	res.json(updateListing)
	}catch(err){
		res.json({message: err})
	}
})

router.patch('/offer/:listingID', async(req,res)=>{
    try{
        // Get all offer IDs from the user that is offering
        const offerListIDs = await ListingModel.find({creator: req.body.creator})
        const myObj = JSON.parse(offerListIDs[0])
        console.log(myObj.title)
        const updateOffers = await ListingModel.updateOne(
            {_id: req.body.listingID}, 
			{$set: {offer: offerListIDs}})
        res.json(updateOffers)
    }catch(err){
        res.json({message: err})
    }
})

// Delete one listing
router.delete('/:listingID', async(req,res) =>{
	try{
		const removeListing =	await ListingModel.remove({_id: req.params.listingID})
		res.json(removeListing)
	}catch(err){
		res.json({message: err})
	}
})

function routes() {
    // Get all listings
    router.get('/all', async (req, res) => {
        try {
            // Fetch the user details in the database
            const userDetails = await UserModel.findOne({ username: req.body.username })

            res.status(200).send({
                userName: userDetails.username,
                message: 'Login successful',
            })
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    return router
}

module.exports = router