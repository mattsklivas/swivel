const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')

function routes(app) {
    // Return all listings
    router.get('/all', async (req, res) => {
        try {
            const listings = await ListingModel.find()
            res.status(200).json(listings)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    // Return one listing and the listing's offers
    // TODO: include listing offers as well
    router.get('/:id', async (req, res) => {
        try {
            // Fetch one listing in the database
            const listing = await ListingModel.findById(req.params.id)    
            res.status(200).json(listing)
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Return all the listings from a user
    // TODO: test
    router.get('/byUser/:creator', async (req, res) => {
        try {
            const retrievedListing = await ListingModel.find({ creator: req.params.creator })      
            res.status(200).json(retrievedListing)
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Create a listing
    router.post('/create', async (req, res) => {     
        try {
            // Build the listing object
            const listing = new ListingModel({
                    creator: req.body.creator,
                    category: req.body.category,
                    title: req.body.title,
                    description: req.body.description 
            })  
            const savedListing = await listing.save()

            res.status(200).json({id: savedListing._id.toString()})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

    // Update a listing
    router.patch('/:listingID', async(req, res) => {
        try {
            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$set: {title: req.body.title, category: req.body.category, description: req.body.description}}
            )
            res.status(200).json(updateListing)
        } catch(err) {
            res.status(500).json({message: err})
        }
    })

    // Add an offer to a listing
    // TODO: Need to review and test (Matt)
    router.patch('/offer/:listingID', async(req, res) => {
        try {
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
    router.patch('/deleteOffer/:listingID', async(req,res) => {
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
    router.delete('/delete/:listingID', async(req, res) => {
        try {
            const removeListing = await ListingModel.remove({_id: req.params.listingID})
            res.status(200).json(removeListing)
        } catch(err) {
            res.status(500).json({message: err})
        }
    })

    return router
}

module.exports = routes