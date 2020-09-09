import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './PersonalArea.scss';
import Header from '../../regions/Header/Header';
import Aside from '../../regions/Aside/Aside';
import Main from '../../regions/Main/Main';
import {updateContacts} from '../../actions/personalAreaActions';

class Profile extends Component {

    static propTypes = {
        updateContacts: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.updateContacts();
    }

    render() {
        return (
            <>
            <Header/>
            <Aside/>
            <Main/>
            </>
        );
    }

}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({updateContacts}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);