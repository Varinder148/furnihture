import React from 'react'
import './homepageHeader.styles.scss'
import Navbar from '../navbar/navbar.component'


class HomepageHeader extends React.Component {
    constructor() {
        super()

        this.nav = React.createRef()
    }


    componentDidMount() {
        window.addEventListener('scroll', () => this.scroll())
    }


    scroll = () => {
        if (this.nav.current && window.scrollY > 100) {
            this.nav.current.className = `cus-navbar orange`;
        }
        else if (this.nav.current) {
            this.nav.current.className = 'cus-navbar transparent'
        }
    }

    render(props) {
        const active = false;
        return (
            <>
                <Navbar navref={this.nav} >
                </Navbar>
                    <div className='homepage-header'>
                        <div className='custtitle'>
                            <h1>Welcome</h1>
                            <h3>...need some furnishings, eh? Take a look around.</h3>
                        </div>
                    </div>
                
            </>
        )
    }
}
export default HomepageHeader