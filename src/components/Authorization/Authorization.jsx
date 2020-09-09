import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './Authorization.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {authorization} from "../../actions/authorizationActions";

class Authorization extends Component {

    static propTypes = {
        authorization: PropTypes.func.isRequired
    };

    state = {
        userLogin: '',
        userPassword: '',
        errorUserLogin: false,
        errorUserPassword: false
    };

    changeUserLogin = (e) => {
        this.setState({
            userLogin: e.target.value
        });
    };

    changeUserPassword = (e) => {
        this.setState({
            userPassword: e.target.value
        });
    };

    sendAuthorization(login, password) {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(response => {
                response.forEach(user => {
                    (user.login === login) ? this.setState({errorUserLogin: false}) : this.setState({errorUserLogin: true});
                    (user.password === password) ? this.setState({errorUserPassword: false}) : this.setState({errorUserPassword: true});
                    if (user.login === login && user.password === password) {
                        this.props.authorization(user.name, user.socialActivity);
                    }
                })
            });
    }

    render() {
        return (
            <div className="authorization">
                <h1 className="authorization__title">Авторизация</h1>
                <form className="authorization__form" action="">
                    <TextField
                        error={this.state.errorUserLogin}
                        className="authorization__entry-field"
                        rowsMax={1}
                        label="Логин"
                        variant="outlined"
                        multiline
                        onChange={this.changeUserLogin}
                        value={this.state.userLogin}
                        placeholder="nikolai"
                    />
                    <TextField
                        error={this.state.errorUserPassword}
                        className="authorization__entry-field"
                        rowsMax={1}
                        label="Пароль"
                        variant="outlined"
                        multiline
                        onChange={this.changeUserPassword}
                        value={this.state.userPassword}
                        placeholder="12345"
                    />
                    <Button
                        className="authorization__send-btn"
                        variant="contained"
                        color="secondary"
                        onClick={() => this.sendAuthorization(this.state.userLogin, this.state.userPassword)}
                    >Отправить</Button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({authorization}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);