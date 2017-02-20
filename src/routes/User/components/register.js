import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser, loginWithProvider } from '../../../store/reducers/user';

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: ''
        };
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        this.props.registerUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage })
                    ;
            } else {
                browserHistory.push('/user/profile');
            }
        }
        );
    }

    render() {
        const { messages } = this.props.locale;

        return (
            <div>
                <div className='col-md-4' />
                <div className='col-md-4'>
                    <form id='frmRegister' role='form' onSubmit={this.onFormSubmit}>
                        <p>{this.state.message}</p>
                        <h2>{ messages['app.register.description'] }</h2>
                        <div className='form-group'>
                            <label htmlFor='txtRegEmail'>{ messages['app.email'] }</label>
                            <input type='email' className='form-control' ref='email' id='txtEmail'
                                placeholder='Enter email' name='email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='txtRegPass'>{ messages['app.pwd'] }</label>
                            <input type='password' className='form-control' ref='password' id='txtPass'
                                placeholder='Password' name='password'
                            />
                        </div>
                        <button type='submit' className='btn btn-default'>{ messages['app.register.btn'] }</button>
                        <br /> <br />

                        <a ref='#' className='btn btn-block btn-social btn-facebook' data-provider='facebook'
                            onClick={() => {
                                this.props.loginWithProvider('facebook');
                            }}
                        >
                            <span className='fa fa-facebook' />
                            Facebook
                        </a>
                        <a href='#' className='btn btn-block btn-social btn-twitter' data-provider='twitter'
                            onClick={() => {
                                this.props.loginWithProvider('twitter');
                            }}
                        >
                            <span className='fa fa-twitter' />
                            Twitter
                        </a>
                        <a href='#' className='btn btn-block btn-social btn-google' data-provider='google'
                            onClick={() => {
                                this.props.loginWithProvider('google');
                            }}
                        >
                            <span className='fa fa-google' />
                            Google
                        </a>
                    </form>
                </div>
            </div>
        );
    }

}

UserRegister.propTypes = {
    locale           : React.PropTypes.object.isRequired,
    currentUser      : React.PropTypes.object.isRequired,
    registerUser     : React.PropTypes.func.isRequired,
    loginWithProvider: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registerUser,
        loginWithProvider
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        locale     : state.locale
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);