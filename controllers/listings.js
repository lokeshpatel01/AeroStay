const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res, next) => {
    let {category, q} = req.query;
    let filter = {};

    if(category){
        filter.category = category;
    }

    if(q){
        filter.$or = [
            {title: {$regex: q, $options: "i"}},
            {location: {$regex: q, $options: "i"}},
            {country: {$regex: q, $options: "i"}},
        ]
    }

    const allListings = await Listing.find(filter);
    if(allListings.length >= 1){
        res.render("listings/index.ejs", {allListings});
    } else {
        req.flash("error", `Search results for ${q || category} are not found.`);
        return res.redirect("/listings");
    }
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing = async(req, res, next) => {

    const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;

    let lat = 28.6139;
    let lng = 77.2090;

    try {
        const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: fullLocation,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "AeroStay/1.0"
            }
        });

        if (geoResponse.data.length > 0) {
            lat = parseFloat(geoResponse.data[0].lat);
            lng = parseFloat(geoResponse.data[0].lon);
        }
    } catch (geoErr) {
        console.log("Geo Error =", geoErr.message);
    }

    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = {
        type: "Point",
        coordinates: [lng, lat]
    };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async (req, res, next) => {
    let {id} = req.params;
    
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

    const fullLocation = `${req.body.listing.location}, ${req.body.listing.country}`;

    let lat = 28.6139;
    let lng = 77.2090;

    try {
        const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: fullLocation,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "AeroStay/1.0"
            }
        });

        if (geoResponse.data.length > 0) {
            lat = parseFloat(geoResponse.data[0].lat);
            lng = parseFloat(geoResponse.data[0].lon);
        }
    } catch (geoErr) {
        console.log("Geo Error =", geoErr.message);
    }

    listing.geometry = {
        type: "Point",
        coordinates: [lng, lat]
    };

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res, next) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}