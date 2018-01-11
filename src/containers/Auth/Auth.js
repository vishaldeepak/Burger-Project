import React, { Component } from 'react'
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'

import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig:{
            type: 'email',
            placeholder: "Email Address"
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        elementType: 'input',
        elementConfig:{
            type: 'password',
            placeholder: "Password"
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        touched: false,
        valid: false
      }
    },
    isSignUp: true
  }

  checkValidity(value, rules){
    let isValid = true

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }

  switchSignHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
        ...this.state.controls,
        [inputIdentifier]: {
          ...this.state.controls[inputIdentifier],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
          touched: true
        }
      }

    // let formIsValid = true;
    // for(let formElement in updatedControls){
    //     formIsValid = updatedControls[formElement].valid && formIsValid
    // }

    this.setState({
        controls: updatedControls
        // formIsValid: formIsValid
    })
}

  submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  render () {
    const formElementsArray = []
    for (let key in this.state.controls){
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }

    let text_type = "SIGN UP"
    if(this.state.isSignUp){
      text_type = "SIGN IN"
    }

    let form = (
      <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formElement => (
              <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  invalid={!formElement.config.valid}
                  touched={formElement.config.touched}
                  shouldValidate={formElement.config.validation}/>
          ))}
          <Button type="submit" btnType="Success" >Submit</Button>
      </form>
    );

    if(this.props.loading){
      form = <Spinner />
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = (
        <p>
          {this.props.error.message}
        </p>
      )
    }

    return (
      <div className={classes.Auth}>
        {form}
        <Button btnType="Danger" clicked={this.switchSignHandler}>Switch to {text_type}</Button>
        {errorMessage}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);