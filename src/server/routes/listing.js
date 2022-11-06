const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')
// Import the User data model
const UserModel = require('../definitions/user')

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
    // param: listingID is the records to be returned
    router.get('/:listingID', async (req, res) => {
        try {
            // Fetch one listing in the database
            const listing = await ListingModel.findById(req.params.listingID)
            const offers = await ListingModel.find({_id: listing.offers}) 
            res.status(200).json({details: listing, offers: offers})
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Return all the listings from a user(creator)
    // param: creator 
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
    // Body: creator as string, category as string, title as string, description as string
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
    // param: listingID is the record to be updated
    // body: title as string, category as string, description as string
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
    // body: listing_id is the current listing to add offers to, offer_id is the listing ID as a string
    router.put('/offer', async(req, res) => {
        try {
            // Get current offers
            const offerArray = await ListingModel.find({_id: req.body.listing_id}).select('offers')
            // Check if new offer exist in the current offer
            if(!offerArray[0].offers.includes(req.body.offer_id)){
                // Add the new offers
                offerArray[0].offers.push(req.body.offer_id)
            }

            // Update offer with new listings
            const updateListing = await ListingModel.updateOne(
                {_id: req.body.listing_id}, 
                {$set: {offers: offerArray[0].offers}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Remove offers from a listing
    // Body: listingID is the current listing for which to delete an offer
    // offerID is the offer ID (string) that you want to remove
    router.patch('/offer/delete/:listingID', async(req,res) => {
        try {
            // $pullAll removes all instance of the value from the array
            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$pullAll: {offers: [req.body.offerID]}})
            res.status(200).json(updateListing)
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Update the listing with an accepted offer
    // body: listing_id is the current listing to add accepted offer to, accepted_id is the ID of the listing to accept
    router.put('/accept', async(req, res) => {
        try {
            const updateListing = await ListingModel.updateOne(
                {_id: req.body.listing_id}, 
                {$set: {accepted: req.body.accepted_id}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Delete one listing
    // params: listingID is the records to be deleted
    router.delete('/:listingID', async(req, res) => {
        try {
            // Delete the record
            const removeListing = await ListingModel.deleteOne({_id: req.params.listingID})

            // Delete all reference to the deleted offer in all other listing
            const listings = await ListingModel.find()
            listings.forEach(async element => {
                // Check if the deleted offer exist in the offers
                if(element.offers.includes(req.params.listingID)){
                    // Removes all instance of the value from the array
                    await ListingModel.updateOne(
                        {_id: element._id}, 
                        {$pullAll: {offers: [req.params.listingID]}})
                }                 
            })

            // Delete all reference to the deleted offer in the saved_listing in user's record
            const userRecords = await UserModel.find()
            userRecords.forEach(async user => {               
                // Check if the deleted offer exist in the offers
                if(user.saved_listings.includes(req.params.listingID)){
                    // Remove the offer from the saved listings
                    await UserModel.updateOne(
                        {_id: user._id}, 
                        {$pullAll: {saved_listings: [req.params.listingID]}})
                }
            })
            res.status(200).json(removeListing)
        } catch(err) {
            res.status(500).json({message: err})
        }
    })

    return router
}

module.exports = routes