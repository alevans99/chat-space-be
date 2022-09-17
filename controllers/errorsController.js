/**
 * For any errors created that include a status code and error message, these
 * are passed back into the response. If the error is not a custom error, we will use
 * the next middleware to handle it.
 * @param {*} err - The error received
 * @param {*} req - The request object
 * @param {*} res  - The reponse object
 * @param {*} next - Function to move to the next middleware
 */
 exports.handleCustomErrors = (err, req, res, next)=> {
    if (err.status && err.message) {
      res.status(err.status).send({ message: err.message })
    } else {
      next(err)
    }
  }
  
  
  /**
   * This will catch any errors which do not fit into the custom or DB categories.
   * @param {*} err - The error received
   * @param {*} req - The request object
   * @param {*} res  - The reponse object
   * @param {*} _next - Function to move to the next middleware
   */
  exports.handleServerErrors = (err, req, res) => {
      res.status(500).send({
          message: 'Internal Server Error'
      })
  }
  