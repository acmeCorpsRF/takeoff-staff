import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './Main.scss';

class Main extends Component {

    static propTypes = {
        userContacts: PropTypes.array.isRequired,
        desiredContactId: PropTypes.number.isRequired
    };

    render() {
        const {userContacts, desiredContactId} = this.props;
        let items;
        if (userContacts.length !== 0) {
            if (desiredContactId === 0) {
                items = <li className="contact__information-list-item" key="no-contacts">
                    Выберите контакт для просомтра...
                </li>;
            } else {
                userContacts.forEach(item => {
                    if (item.id === desiredContactId) {
                        items = Object.entries(item).map((property, index) => (
                            <li className="contact__information-list-item" key={index}>
                                <b>{property[0]}:</b> {property[1]}
                            </li>
                        ));
                    }
                })
            }
        } else {
            items = <li className="contact__information-list-item" key="no-contacts">
                Нет данных...
            </li>
        }
        return (
            <main className="main">
                <div className="output-field">
                    <ul className="contact__information-list">
                        {items}
                    </ul>
                </div>
            </main>
        );
    }

}


const mapStateToProps = ({personalAreaReducer}) => ({
    userContacts: personalAreaReducer.userContacts,
    desiredContactId: personalAreaReducer.desiredContactId
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Main);