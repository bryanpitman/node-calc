const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let numArr = [];
  for(let num of strNums){
    numArr.push(parseInt(num));
  }
  return numArr;
  // const id = parseInt(req.params.id)
}


module.exports = { convertStrNums };