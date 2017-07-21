import React from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
// intl
import messages from './messages';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom, style }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        style={style}
        fullWidth
    />
);

renderTextField.propTypes = {
    input   : PropTypes.object,
    label   : PropTypes.element,
    type    : PropTypes.string,
    meta    : PropTypes.object,
    messages: PropTypes.object,
    inline  : PropTypes.bool,
    style   : PropTypes.object
};

const styles = {
    form: {
        paddingLeft : '20px',
        paddingRight: '20px'
    }
};

class SignIn extends React.Component {
    render() {
        return (
            <form
                style={styles.form}
                onSubmit={this.props.handleSubmit}
            >
                <Field
                    name='email'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.email} />}
                /><br />
                <Field
                    name='password'
                    type='password'
                    component={renderTextField}
                    label={<FormattedMessage {...messages.pwd} />}
                /><br /><br />
                <RaisedButton
                    type='submit'
                    label={<FormattedMessage {...messages.login_btn} />}
                    fullWidth
                    primary
                />
            </form>
        );
    }
}

SignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form  : 'login',
    fields: ['email', 'password']
    // validate
})(SignIn);
