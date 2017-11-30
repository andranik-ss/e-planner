import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Field, reduxForm } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AddContentIcon from 'material-ui/svg-icons/content/add-box';
import ReduxFormTextField from '../../../../components/Form/ReduxFormTextField';
import Error from '../../../../components/Indicators/Error';
import { FormattedMessage } from 'react-intl';

import validate from './validate';
import messages from './messages';

const styles = {
    paper: {
        display: 'flex',
        padding: '10px 15px 2px 15px',
        margin: '5px 5px 0 5px'
    }
};

const renderTextField = props => {
    const { meta } = props;

    return <ReduxFormTextField {...props} formattedError={<FormattedMessage {...messages[meta.error]} />} />;
};

renderTextField.propTypes = {
    meta: PropTypes.object
};

class NewTask extends Component {
    render() {
        const { showComponent, handleSubmit, error } = this.props;

        if (!showComponent) {
            return null;
        }

        return (
            <form onSubmit={handleSubmit}>
                <Paper zDepth={1} style={styles.paper}>
                    <Field
                        name='description'
                        component={renderTextField}
                        hintText={<FormattedMessage {...messages.description} />}
                    />
                    <IconButton
                        type='submit'
                        iconStyle={{ width: '32px', height: '32px' }}
                        style={{
                            maxContent  : 'max-content',
                            marginTop   : 'auto',
                            marginBottom: '8px'
                        }}
                    >
                        <AddContentIcon color={'#757575'} />
                    </IconButton>
                </Paper>
                {error !== undefined && <Error message={error} />}
            </form>
        );
    }
}

NewTask.propTypes = {
    showComponent: PropTypes.bool,
    handleSubmit : PropTypes.func,
    error        : PropTypes.string
};

export default reduxForm({
    form  : 'NewTask',
    fields: ['description', 'plannedDate'],
    validate
})(NewTask);
