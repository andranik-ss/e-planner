import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateUserInfoRequest, changeForm } from '../../AppAuth/modules/actions';
import Loading from '../components/Loading';

import { FormattedMessage } from 'react-intl';
import messages from '../modules/messages';
import './AccountSettings.scss';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._changeDisplayName = this._changeDisplayName.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.dispatch(
            updateUserInfoRequest({
                email      : this.props.formState.get('email'),
                displayName: this.props.formState.get('displayName')
            })
        );
    }

    _changeEmail(event) {
        this._emitChange(this.props.formState.set('email', event.target.value));
    }

    _changeDisplayName(event) {
        this._emitChange(this.props.formState.set('displayName', event.target.value));
    }

    _emitChange(newFormState) {
        this.props.dispatch(changeForm(newFormState));
    }


    render() {
        const { currentUser } = this.props;

        if (!currentUser) {
            return <Loading />;
        }

        let photoURL = currentUser.get('photoURL');

        if (!photoURL && currentUser.get('providerData').size > 0) {
            photoURL = currentUser.getIn(['providerData', '0', 'photoURL']);
        }

        return (
            <form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
                <h4><strong><FormattedMessage {...messages.account_settings_description} /></strong></h4>
                <div className='col-md-6 custom-settings'>
                    <br />
                    <div className='form-group form-inline'>
                        <label htmlFor='email'><FormattedMessage {...messages.email} />:</label>
                        <ins>{currentUser.get('email')}</ins>
                        <a>change email</a>
                    </div>
                    <div className='form-group form-inline'>
                        <label htmlFor='displayName'><FormattedMessage {...messages.display_name} />:</label>
                        <input type='text' className='form-control' id='displayName' placeholder='Display name'
                            name='displayName' defaultValue={currentUser.get('displayName')}
                            onChange={this._changeDisplayName}
                        />
                    </div>
                    <div className='form-group form-inline'>
                        <label htmlFor='Sex'><FormattedMessage {...messages.sex} />:</label>
                        <select className='form-control' id='sex-select'>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='btn btn-primary'>
                            <FormattedMessage {...messages.update_btn} />
                        </button>
                    </div>
                </div>
                <div className='col-md-3' />
                <div className='col-md-3 media text-center'>
                    <a href='#'>
                        <img className='media-object img-responsive center-block' src={photoURL} />
                    </a>
                    <a>change photo</a>
                </div>
            </form>
        );
    }

}

UserProfile.propTypes = {
    currentUser: PropTypes.object,
    formState  : PropTypes.object,
    dispatch   : PropTypes.func.isRequired
};

export default UserProfile;
