import React from 'react'
import CustomButton from '../customButton/customButton.component'
import './card.style.scss'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.action'


class CustomCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            buttonHidden: true,
            rerender:true
            
        }
    }

    render() {
        let { buttonHidden } = this.state;
        const { data, addItem } = this.props;
        return (
            <>
                <div className='type' >
                {data.type}
                </div>
                <div className='cus-card' onMouseOver={() => {
                    this.setState({ buttonHidden: false })
                }} onMouseOut={() => {
                    this.setState({ buttonHidden: true })
                }}>
                    <Card >
                        <img src={data['url']} alt='image' className='card-img' />
                    </Card>
                    <div className='card-button'>
                        <CustomButton type='btnup large' hidden={buttonHidden}
                            onClick={() => addItem(data)}>Add to Cart</CustomButton>
                    </div>
                </div>

            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        addItem: (item) => dispatch(addItem(item))
    })
}

export default connect(null, mapDispatchToProps)(CustomCard)