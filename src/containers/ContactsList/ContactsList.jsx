import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './ContactsList.scss';
import Contact from '../../components/Contact/Contact';

class ContactsList extends Component {

    static propTypes = {
        userContacts: PropTypes.array.isRequired,
        currentSearchString: PropTypes.string.isRequired
    };

    render() {
        const {userContacts, currentSearchString} = this.props;
        let contacts,
            iterableContacts;
        if (userContacts.length) {
            if (currentSearchString.length) {
                iterableContacts = userContacts.filter(item => item.login.includes(currentSearchString));
            } else {
                iterableContacts = userContacts;
            }
            contacts = iterableContacts.map((item, index) => (
                <Contact key={index}
                         userName={item.login}
                         userAvatar={item.avatar_url}
                         userId={item.id}
                />
            ));
        } else {
            contacts = <li className="contacts__item">
                <div className="MuiListItemText-root">
                    <span
                        className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Контактов нет...</span>
                </div>
            </li>;
        }
        return (
            <ul className="contacts__list">
                {contacts}
            </ul>
        );
    }
}

const
    mapStateToProps = ({personalAreaReducer}) => ({
        userContacts: personalAreaReducer.userContacts,
        currentSearchString: personalAreaReducer.currentSearchString
    });
const
    mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)

(
    ContactsList
)
;