import React, { Component } from 'react';
import Joi from 'joi-browser';
import Button from './Button';
import Input from './Input';
import GenericInput from './GenericInput';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    // console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label, classes) {
    return (
      <Button disabled={this.validate()} bsClasses={classes}>
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  }

  renderGenericInput(name, label, classes, type = 'text') {
    const { data } = this.state;

    return (
      <GenericInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        classes={classes}
        onChange={this.handleChange}
      ></GenericInput>
    );
  }
}

export default Form;
