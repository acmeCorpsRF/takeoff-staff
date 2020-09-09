import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import './SearchForm.scss';
import {setSearchValue} from '../../actions/personalAreaActions'

class SearchForm extends Component {

    static propTypes = {
        setSearchValue: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="search-block">
                <form action="" className="search-form">
                    <input
                        className="search-form__input"
                        type="text"
                        onChange={(e) => this.props.setSearchValue(e.target.value)}
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({setSearchValue}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);