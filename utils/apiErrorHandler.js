/**
 * handleApiErrors: Handles API errors and returns message for different error codes
 * TODO: Cater for more error codes
 * @param { Number } errorCode
 * @returns message: A response for the errorCode provided
 */
const handleApiErrors = errorCode => {
  let message
  switch (errorCode) {
    case 400:
      message = 'Bad request. Please check the data provided to endpoint'
      break

    default:
      break
  }
  return message
}

module.exports = { handleApiErrors }
