import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './Aside.scss';
import ContactsList from '../../containers/ContactsList/ContactsList';
import SearchForm from '../../components/SearchForm/SearchForm'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import {updateContacts} from "../../actions/personalAreaActions";

class Aside extends Component {

    static propTypes = {
        updateContacts: PropTypes.func.isRequired,
        userContacts: PropTypes.array.isRequired
    };

    state = {
        isHiddenAddContact: true,
        entryFieldLogin: '',
        entryFieldAvatar: '',
        errorFieldLogin: false,
        errorFieldId: false,
        errorFieldAvatar: false
    };

    toggleAddContact() {
        this.state.isHiddenAddContact === false ? this.setState({isHiddenAddContact: true}) : this.setState({isHiddenAddContact: false});
    }

    changeUserLogin = (e) => {
        this.setState({
            entryFieldLogin: e.target.value
        });
    };

    changeUserAvatar = (e) => {
        this.setState({
            entryFieldAvatar: e.target.value
        });
    };

    sendNewContact(name, avatar) {
        const {userContacts} = this.props;
        (name === '') ? this.setState({errorFieldLogin: true}) : this.setState({errorFieldLogin: false});
        (avatar === '') ? this.setState({errorFieldAvatar: true}) : this.setState({errorFieldAvatar: false});
        if (name !== '' && avatar !== '') {
            fetch(`http://localhost:3000/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "login": `${name}`,
                    "id": Number(userContacts[userContacts.length - 1].id) + 1,
                    "avatar_url": `${avatar}`,
                })
            }).then(response => {
                if (response.status === 201) {
                    this.setState({
                        isHiddenAddContact: true,
                        entryFieldLogin: '',
                        entryFieldAvatar: ''
                    });
                    this.props.updateContacts();
                }
            });
        }
    }

    render() {
        const {entryFieldLogin, entryFieldAvatar, errorFieldLogin, errorFieldAvatar} = this.state;
        const classesAddContact = classNames('add-contact', {'hidden': this.state.isHiddenAddContact});
        return (
            <aside className="aside">
                <SearchForm/>
                <ContactsList/>
                <Button
                    className="aside__btn-add-contact"
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon/>}
                    onClick={() => this.toggleAddContact()}
                >
                    Добавить контакт
                </Button>
                <div className={classesAddContact}>
                    <h1 className="add-contact__title">Новый контакт</h1>
                    <form className="add-contact__form" action="">
                        <TextField
                            error={errorFieldLogin}
                            className="add-contact__entry-field"
                            rowsMax={1}
                            label="Логин/Имя"
                            variant="outlined"
                            multiline
                            onChange={this.changeUserLogin}
                            value={entryFieldLogin}
                        />
                        <TextField
                            error={errorFieldAvatar}
                            className="add-contact__entry-field"
                            rowsMax={1}
                            label="Путь к аватарке"
                            variant="outlined"
                            multiline
                            onChange={this.changeUserAvatar}
                            value={entryFieldAvatar}
                        />
                        <Button
                            className="add-contact__send-btn"
                            variant="contained"
                            color="secondary"
                            onClick={() => this.sendNewContact(entryFieldLogin, entryFieldAvatar)}
                        >Добавить</Button>
                    </form>
                </div>
            </aside>
        );
    }
}

const mapStateToProps = ({personalAreaReducer}) => ({
    userContacts: personalAreaReducer.userContacts
});
const mapDispatchToProps = dispatch => bindActionCreators({updateContacts}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Aside);
