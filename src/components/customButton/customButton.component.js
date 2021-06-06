import React from 'react';
import './customButton.styles.scss'
import { Button } from 'react-bootstrap'

const CustomButton=(props)=>{
    let { variant, type,...others }=props
    return (
        <>
        <button className={`cus-btn ${variant?'inverse':'reg'} ${type?type:'btnright large'}`} {...others}>
            {props.children}
        </button>
        </>
    )


}

export default CustomButton