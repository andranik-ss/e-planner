import React from 'react';
import { Map } from 'immutable';
import { addEvent, onEventNameChange } from '../../modules/events';

export const AddEvent = ({ dispatch, formState }) => {
    let input;

    const handleKeyPress = (target) => {
        const eventName = formState.get('eventName');

        if (target.charCode === 13 && eventName !== '') {
            dispatch(addEvent({ name: eventName, services: formState.get('services') }));
        }
    };

    const onChange = (e) => {
        dispatch(onEventNameChange(e.target.value));
    };

    const onAddEventButtonClick = () => {
        const eventName = formState.get('eventName');

        if (eventName !== '') {
            dispatch(addEvent({ name: eventName, services: formState.get('services') }));
        }
    };

    return (
        <div className='input-group'>
            <input className='form-control' placeholder='enter new event'
                value={formState.get('eventName')}
                onChange={onChange}
                onKeyPress={handleKeyPress}
            />
            <span className='input-group-btn'>
                <button className='btn btn-primary'
                    onClick={onAddEventButtonClick}
                >
                    <i className='fa fa-plus-circle fa-fw' aria-hidden='true' />
                </button>
            </span>
        </div>
    );
};

AddEvent.propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    formState: React.PropTypes.instanceOf(Map).isRequired
};

export default AddEvent;
