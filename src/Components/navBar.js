import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export class navBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Buttton color="inherit">Login</Buttton>
                    <Buttton color="inherit">Sign Up</Buttton>
                    <Buttton color="inherit">Home</Buttton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default navBar
