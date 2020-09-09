import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './Contact.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import classNames from 'classnames';
import {updateContacts, establishDesiredContact} from '../../actions/personalAreaActions';

class Contact extends Component {

    static propTypes = {
        updateContacts: PropTypes.func.isRequired,
        establishDesiredContact: PropTypes.func.isRequired
    };

    state = {
        isHiddenEditField: true,
        inputText: '',
        isSelectedContact: false
    };

    removeContact(id) {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 200) {
                this.props.updateContacts();
            }
        });
    }

    editContact(name) {
        this.setState({
            isHiddenEditField: false,
            inputText: name
        });
    }

    changeInputText = (e) => {
        this.setState({
            inputText: e.target.value
        });
    };

    confirmContact(newName, id) {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": `${newName}`,
                "id": `${id}`
            })
        }).then(response => {
            if (response.status === 200) {
                this.props.updateContacts();
            }
        });
        this.setState({
            isHiddenEditField: true
        });
    };

    render() {
        const {userName, userAvatar, userId, establishDesiredContact} = this.props;
        const classesEditField = classNames('contacts__item-edit-field MuiTypography-body1', {'hidden': this.state.isHiddenEditField});
        const classesActionsEdit = classNames('contacts__item-actions-edit', {'hidden': !this.state.isHiddenEditField});
        const classesActionsConfirm = classNames('contacts__item-actions-confirm', {'hidden': this.state.isHiddenEditField});
        return (
            <ListItem
                className="contacts__item"
                onClick={() => establishDesiredContact(userId)}
            >
                <ListItemAvatar>
                    <Avatar alt={userName} src={userAvatar}/>
                </ListItemAvatar>
                <ListItemText primary={userName}/>
                <input
                    className={classesEditField}
                    type="text"
                    onChange={(e) => this.changeInputText(e)}
                    value={this.state.inputText}/>
                <div className="contacts__item-actions">
                    <IconButton
                        className={classesActionsEdit}
                        onClick={() => this.editContact(userName)}
                        title="Редактировать">
                        <EditIcon fontSize="small" title="Редактировать"/>
                    </IconButton>
                    <IconButton
                        className={classesActionsConfirm}
                        onClick={() => this.confirmContact(this.state.inputText, userId)}
                        title="Подтвердить">
                        <CheckCircleOutlineIcon fontSize="small" title="Подтвердить"/>
                    </IconButton>
                    <IconButton
                        className="contacts__item-actions-delete"
                        onClick={() => this.removeContact(userId)}
                        title="Удалить">
                        <DeleteForeverIcon fontSize="small" title="Удалить"/>
                    </IconButton>
                </div>
            </ListItem>
        )
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({updateContacts, establishDesiredContact}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Contact);