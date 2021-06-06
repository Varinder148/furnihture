import React from 'react'
import './navbar.styles.scss'
import '../horizontalMenu/horizontalMenu.component'
import HorizontalMenu from '../horizontalMenu/horizontalMenu.component'
import { Redirect, withRouter } from 'react-router'
import CartIconMenu from '../cartIconMenu/cartIconMenu.component'
import LogoBlack from '../../svgAnimations/logo/logoBlack.image'
import Logo from '../../svgAnimations/logo/logo.image'
const Navbar = React.forwardRef((props, ref) => {
    let { type, staticContext, match, navref, ...others } = props;
    let history = props.history;
    return (
        <>
            <div ref={navref} className={`cus-navbar ${type ? type : 'transparent'}`}  {...others}>
                <div className='logo' onClick={() => {
                    history.push('/homepage')
                }}>
                    {window.innerWidth < 700 ? <LogoBlack /> : <Logo />}

                </div>
                <HorizontalMenu>
                </HorizontalMenu>
            </div>
            <CartIconMenu>
            </CartIconMenu>

        </>
    )
}
)

export default withRouter(Navbar);