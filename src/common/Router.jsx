import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {Switch, Route} from 'react-router-dom';
import Authorization from '../components/Authorization/Authorization';
import PersonalArea from '../containers/PersonalArea/PersonalArea';
import NotFound from '../components/NotFound/NotFound';

class Router extends Component {

    static propTypes = {
        isUserAuthorized: PropTypes.bool.isRequired
    };

    render() {
        if (!this.props.isUserAuthorized) {
            return (
                <Route component={Authorization}/>
            );
        }
        return (
            <Switch>
                <Route exact path='/' component={PersonalArea}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

const mapStateToProps = ({authorizationReducer}) => ({
    isUserAuthorized: authorizationReducer.isUserAuthorized
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Router);

