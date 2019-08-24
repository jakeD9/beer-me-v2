import React, { Component } from 'react'
import Dashboard from '../Dashboard/Dashboard';

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

export default class MenuWrapper extends Component {
    state = {
        drawerOpen: true
    }

    // toggleMobileDrawerView = () => {
    //     this.setState(prevState => ({
    //         drawerOpen: !prevState.drawerOpen
    //     }))
    // }

    componentDidMount = () => {
        if (isMobileDevice()) {
            this.setState({
                drawerOpen: false
            })
        }
    }



    render() {
        // adjust for left drawer and top, with a standard padding
        // for non fixed elements.
        const pad = 16;
        const appbarHeight = 64;
        const drawerWidth = 255;

        // this will be padding (or fixed positions) depending on whethere drawer is open
        const left = this.state.drawerOpen ? drawerWidth : 0;
        const top = appbarHeight;

        const width = this.state.drawerOpen ?
            'calc(100% - ' + (drawerWidth + 2 * pad) + 'px)' :
            'calc(100% - ' + (2 * pad) + 'px)';
        const contentWidth = this.state.drawerOpen ?
            'calc(100% - ' + drawerWidth + 'px)' :
            '100%';

        // each child will be enclosed in this style

        const contentStyle = {
            width: width,
            marginTop: top + pad,
            marginLeft: left + pad,
            marginBottom: pad,
            marginRight: pad,
            padding: 0
        };

        if (this.props.fixed) {
            // need to do special things to add props needed by fixed content
            return (
                <div>
                    <Dashboard />
                    {React.cloneElement(this.props.children, {
                        contentLeft: left,
                        contentWidth: contentWidth,
                        contentTop: top
                    })}
                </div>
            );
        }
        else {
            return (
                <div style={contentStyle}>
                    <Dashboard />
                    {this.props.children}
                </div>
            );
        }
    }
}