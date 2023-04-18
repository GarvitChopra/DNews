import React from 'react'
import spinner from './Spinner-1s-200px.gif'

const Loading =()=> {
    return (
      <div className='text-center'>
        <img src={spinner} alt="loading" />
      </div>
    )
}

export default Loading
