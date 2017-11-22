import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';
import { isEqual } from 'lodash';
// components
import SwipeableViews from 'react-swipeable-views';
import AppNavPanel from '../AppNavPanel';
// import Spinner from '../../../../components/Spinner';
import asyncService from '../../asyncService';

class AppEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getComponentState(props);

        this.handleChangeSwipeView = this.handleChangeSwipeView.bind(this);
        this.tabsScrollLeft = this.tabsScrollLeft.bind(this);
    }

    componentDidMount = () => this.tabsScrollLeft(this.state.slideIndex);

    componentWillReceiveProps = nextProps => this.setState(this.getComponentState(nextProps));

    shouldComponentUpdate = (nextProps, nextState) =>
        !isEqual(nextProps.location, this.props.location) || !isEqual(nextProps.eventsByIds, this.props.eventsByIds);

    handleChange = value => {
        this.setState({ slideIndex: value });
        this.tabsScrollLeft(value);
    };

    handleChangeSwipeView = (value, services, evId) => {
        const route = services[value] === 'home' ? `/app/event/${evId}` : `/app/event/${evId}/${services[value]}`;

        browserHistory.push(route);

        this.setState({ slideIndex: value });
        this.tabsScrollLeft(value);
    };

    getComponentState = props => {
        let services = [];

        const { eventsByIds, params, location } = props;

        if (eventsByIds.size > 0) {
            [...services] = eventsByIds
                .getIn([params.id, 'services'])
                .filter(isChecked => isChecked)
                .keys();

            services.unshift('home');
        }

        const service = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        const slideIndex = services.indexOf(service);

        return {
            slideIndex: slideIndex === -1 ? 0 : slideIndex,
            services
        };
    };

    tabsScrollLeft = value => {
        const tabsEl = document.getElementById('event-tabs');

        if (tabsEl) {
            tabsEl.childNodes[0].scrollLeft = value === 1 ? 0 : value * 20;
        }
    };

    render() {
        const { children, params, eventsByIds } = this.props;
        const { services, slideIndex } = this.state;

        if (eventsByIds.size === 0) {
            return <div>Loading ...</div>;
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AppNavPanel eventId={params.id} services={services} onChange={this.handleChange} value={slideIndex} />
                <div style={{ display: 'flex', flex: '1' }}>
                    <SwipeableViews
                        index={slideIndex}
                        onChangeIndex={v => this.handleChangeSwipeView(v, services, params.id)}
                        style={{ display: 'flex', flex: '1' }}
                    >
                        {services.map((name, index) => (
                            <div key={index} style={{ display: 'flex', flex: '1' }}>
                                {index === slideIndex ? children : asyncService[name]}
                            </div>
                        ))}
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

AppEvent.contextTypes = {
    store: PropTypes.object
};

AppEvent.propTypes = {
    children   : PropTypes.element,
    params     : PropTypes.object,
    eventsByIds: PropTypes.instanceOf(Map),
    location   : PropTypes.object
};

export default AppEvent;
