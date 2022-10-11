const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')

function routes(app) {
    // Return all object
    router.get('/all', async (req,res) => {
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
    router.get('/findByID/:listingID', async (req, res) => {
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
    router.get('/userListing/:creator', async (req, res) => {
        try {
            // Fetch one listing in the database
            const retrievedListing = await ListingModel.find({ creator: req.params.creator })      
            res.status(200).json(retrievedListing)
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Create a listing
    router.post('/create', async (req,res)=>{
        // pass the information to an object 
        const listModel = new ListingModel({
                creator: req.body.creator,
                category: req.body.category,
                title: req.body.title,
                description: req.body.description 
        })       
        // save the listing to db
        try{
            const saveListing = await listModel.save()
            res.status(200).json(saveListing)
        }catch(err){
            res.status(500).json({message: err.message})
        }
    })

    // Update a listing
    router.patch('/update/:listingID', async(req,res) =>{
        try{
            // update one listing
            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$set: {title: req.body.title, description: req.body.description}}) // need to include image!!!
            res.status(200).json(updateListing)
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Add offers to a listing
    router.patch('/addOffer/:listingID', async(req,res)=>{
        try{
            // Get the string of ids from the body and split by ',' into an array
            const offerArrayNew = req.body.id.split(',')
            // Get current offerings
            const offerArray = await ListingModel.find({_id: req.params.listingID}).select('offers')
            
            // Loop through each of the new offering
            for(let i = 0; i < offerArrayNew.length; i+=1){
                // check if new offering exist in the current offering
                if(!offerArray[0].offers.includes(offerArrayNew[i])){
                    offerArray[0].offers.push(offerArrayNew[i])
                }
            }

            // Update offer with new listings
            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$set: {offers: offerArray[0].offers}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Remove offers from a listing
    router.patch('/deleteOffer/:listingID', async(req,res)=>{
        try{
            // Get the string of ids from the body and split by ',' into an array
            const removeOfferArray = req.body.id.split(',')

            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$pullAll: {offers: removeOfferArray}})
            res.status(200).json(updateListing)
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Delete one listing
    router.delete('/delete/:listingID', async(req,res) =>{
        try{
            const removeListing =	await ListingModel.remove({_id: req.params.listingID})
            res.status(200).json(removeListing)
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    return router
}

module.exports = routes