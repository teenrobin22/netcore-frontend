import React from 'react';
import Joi from 'joi-browser';
import Form from '../UI/Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/actionsIndex';

class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  doSubmit = async () => {
    const { data: model } = this.state;
    this.props.onLogin(model).then(() => {
      if (!this.props.error) this.props.history.push('/members');
    });
  };

  render() {
    return (
      <div>
        <form className='form-inline my-2 my-lg-0' onSubmit={this.handleSubmit}>
          {this.renderGenericInput(
            'username',
            'Username',
            'form-control mr-sm-2'
          )}
          {this.renderGenericInput(
            'password',
            'Password',
            'form-control mr-sm-2',
            'password'
          )}
          {this.renderButton('Login', 'btn-success my-2 my-sm-0')}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: model => dispatch(actions.login(model))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
