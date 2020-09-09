import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Router from './Router';

class Layout extends Component {

    render() {
        return (
            <Router/>
        )
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);