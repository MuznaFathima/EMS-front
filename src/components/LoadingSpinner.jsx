import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='d-flex justify-content align-items-center m-5'>
  <Spinner animation="border" variant="secondary" />loading.....

    </div>
  )
}

export default LoadingSpinner