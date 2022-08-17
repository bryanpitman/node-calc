/** Simple demo Express app. */
"use strict";
const express = require("express");
const app = express();
const {
  findMean,
  findMedian,
  findMode,
} = require("./stats");

const { convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));



/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  let stringOfNums = req.query.nums;
  let arrayOfNums = stringOfNums.split(",");
  let convertedNums = convertStrNums(arrayOfNums);
  let meanResult = findMean(arrayOfNums);

  return res.json({
    operation: "mean",
    value: meanResult,
  });

});



/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  let stringOfNums = req.query.nums;
  let arrayOfNums = stringOfNums.split(",");
  let convertedNums = convertStrNums(arrayOfNums);
  let medianResult = findMedian(arrayOfNums);

  return res.json({
    operation: "median",
    value: medianResult,
  });

});


/** Finds mode of nums in qs: returns {operation: "mean", result } */


app.get("/mode", function (req, res) {

  let stringOfNums = req.query.nums;
  let arrayOfNums = stringOfNums.split(",");
  let convertedNums = convertStrNums(arrayOfNums);
  let modeResult = findMode(convertedNums);

  return res.json({
    operation: "mode",
    value: modeResult,
  });

});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;