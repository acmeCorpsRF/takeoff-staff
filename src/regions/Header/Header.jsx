import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './Header.scss';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

class Header extends Component {

    static propTypes = {
        currentUserName: PropTypes.string.isRequired,
        currentUserSocialActivity: PropTypes.string.isRequired
    };

    render() {
        const {currentUserName, currentUserSocialActivity} = this.props;
        return (
            <header className="header">
                <Link className="header__profile-link" to="/profile/">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={currentUserName}
                        secondary={currentUserSocialActivity}/>
                    <ListItemText/>
                </Link>
            </header>
        );
    }
}

const mapStateToProps = ({authorizationReducer}) => ({
    currentUserName: authorizationReducer.currentUserName,
    currentUserSocialActivity: authorizationReducer.currentUserSocialActivity
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);