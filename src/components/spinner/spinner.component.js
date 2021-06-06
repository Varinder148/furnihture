import React from 'react'
import './spinner.style.scss'
const Spinner = () => {
    return (
        <>
        <div className='cus-spinner'>
            <div className='cus-spinner-back'>
            </div>
            <div className='animation'>
                <div>
                    <div></div>
                </div>
                <h3>Loading...</h3>
            </div>
            </div>
        </>
    )
}

export default Spinner