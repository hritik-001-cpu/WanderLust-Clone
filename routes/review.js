const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview}=require("../middleware.js");



//Reviews
router.post("/", validateReview, wrapAsync(async (req, res) => {
    console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","New Review was Created!");
  res.redirect(`/listings/${listing._id}`);
}));
// delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await review.findByIdAndDelete(reviewId);
  req.flash("success","Review was Deleted!");
  res.redirect(`/listings/${id}`);
}));

module.exports=router;