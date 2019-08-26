import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


class PassToParentField extends Component {

    onFormChange = (event) => {
        this.props.onFormChange(this.props.name, event.target.value);
    }

    render() {

        return (
            <TextField 
                name={this.props.name}
                label={this.props.label}
                type={this.props.type}
                margin={this.props.margin}
                required={true}
                onChange={this.onFormChange}  
                error={this.props.error}  
            />
        )
    }
}

export default PassToParentField