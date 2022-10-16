const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')
// Import the User data model
const UserModel = require('../definitions/user')

function routes(app) {
    console.log('ok')
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
    // TODO: include listing offers as well
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
        console.log('ok')
        try {
            console.log('ok')
            // Get current offers
            const offerArray = await ListingModel.find({_id: req.body.listing_id}).select('offers')
            // Check if new offer exist in the current offer
            if(!offerArray[0].offers.includes(req.body.offer_id)){
                // Add the new offers
                offerArray[0].offers.push(req.body.offer_id)
            }

            console.log(offerArray[0])

            // Update offer with new listings
            const updateListing = await ListingModel.updateOne(
                {_id: req.body.listing_id}, 
                {$set: {offers: offerArray[0].offers}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            console.log(err)
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

    // Update the listing with an accepted offer
    // param: listingID is the current listing to add accepted offer to
    // body: acceptedOffer is the listing ID as a string
    router.patch('/acceptOffer/:listingID', async(req, res) => {
        try {
            const updateListing = await ListingModel.updateOne(
                {_id: req.params.listingID}, 
                {$set: {accepted: req.body.acceptedOffer}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Delete one listing
    // param: listingID is the records to be deleted
    router.delete('/:listingID', async(req, res) => {
        try {
            // Delete the record
            const removeListing = await ListingModel.deleteOne({_id: req.params.listingID})

            // Delete all reference to the deleted offer in all other listing
            const listings = await ListingModel.find()
            listings.forEach(async element => {
                // Check if the deleted offer exist in the offers
                if(element.offers.includes(req.params.listingID)){
                    // Filter out the deleted offer
                    const newListing = element.offers.filter(item => item !== req.params.listingID)
                    // update the offer list
                    await ListingModel.updateOne(
                        {_id: element._id}, 
                        {$set: {offers: newListing}})
                }                 
            })

            // Delete all reference to the deleted offer in the saved_listing in user's record
            const userRecords = await UserModel.find()
            userRecords.forEach(async user => {               
                // Check if the deleted offer exist in the offers
                if(user.saved_listings.includes(req.params.listingID)){
                    // Filter out the deleted offer
                    const newSavedListing = user.saved_listings.filter(item => item !== req.params.listingID)
                    // update the offer list
                    await UserModel.updateOne(
                        {_id: user._id}, 
                        {$set: {saved_listings: newSavedListing}})
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