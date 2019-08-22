import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container';
import API from '../../utils/API'
import FloaterRed from '../Floater/FloaterRed'
import FloaterGreen from '../Floater/FloaterGreen';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                BeerMe
      </Link>{' '}
            {new Date().getFullYear()}
            {'. Built with '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI.
      </Link>
        </Typography>
    );
}

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


class SignUp extends Component {
    state = {
        form: {
            name: "",
            email: "",
            password: "",
            password2: "",
        },
        context: []

    }

    handleNameChange = (event) => {
        this.setState({ form: { ...this.state.form, name: event.target.value } });
    }
    handleEmailChange = (event) => {
        this.setState({ form: { ...this.state.form, email: event.target.value } });
    }
    handlePasswordChange = (event) => {
        this.setState({ form: { ...this.state.form, password: event.target.value } });
    }
    handlePassword2Change = (event) => {
        this.setState({ form: { ...this.state.form, password2: event.target.value } });
    }

    registerHandler = (event) => {
        event.preventDefault();
        API.registerUser(this.state.form)
            .then(response => {
                console.log(response)
                this.setState({
                    context: response[0].msg
                })
                console.log(this.state.context)
            })
            .catch(err => console.log(err.message))
    }

    render() {
        const { classes } = this.props

        let floater = (
            <div></div>
        )
        if (this.state.context === "User created! Please log in") {
            floater = <FloaterGreen message={this.state.context} />
        } else if (this.state.context.length > 0) {
            floater = <FloaterRed message={this.state.context} />
        } else {
            floater = floater
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {floater}
                    <form className={classes.form} noValidate onSubmit={this.registerHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={this.handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Verify Password"
                                    type="password"
                                    id="password2"
                                    autoComplete="current-password"
                                    onChange={this.handlePassword2Change}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                    </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUp);