//Abstracted Generic Sign Up Form 
import React from "react";
import ReactDOM from 'react-dom';
import PropType from 'prop-type';
import isEmail from 'validator/lib/isEmail';

class Listings extends React.Component {

  //NOTE: we keep track of the entire person here along with the array of people
  state = {
    fields : {
      name: "",
      email: ""
    },
    people: [],
    fieldErrors: {} 
  }
  
  //we need to know which input should display the error; hence, 
  //we make fieldErrors an object {} or key-value data struct
  
  //remember, we use es6 syntax to wrap our methods with this 
  onFormSubmit = (evt) => {
    //this is a form submission! this.fields should already contain the entire person 
    const people = this.state.people; 
    const person = this.state.fields; 
    evt.preventDefault();
    if(this.validate()) return;
    
    this.setState({ 
      people: people.concat(person), 
      fields: {name: "", email : ""}
    })
  }
  
  //NOTE: this is as it occurs for every keystroke 
  //we also use it for name & email; hence, the use of name
  onInputChange = ({name, value, error}) => {
    console.log("onInputChange inside Listings")
    //remember our prop validators that we passed to the Field components 
    //return a stirng in the case of an error!
    const fields = this.state.fields; 
    const fieldErrors = this.state.fieldErrors;
    
    fields[name] = value; 
    fieldErrors[name] = error;
    //remember, since this is a parent Component, this will cause 
    //all its children to re-render
    this.setState({ fields, fieldErrors });
    
  }
  
  //this is after the fact
  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMssgs = Object.keys(fieldErrors).filter((k) => fieldErrors[k] );
    return (!person.name || !person.email || errMssgs.length);
  }
  
  render(){
    return(
      <div>
        <h1>Submission: </h1>
          <form onSubmit={this.onFormSubmit}>
            <Field 
              placeholder="Name"
              name="name"
              value={this.state.fields.name}
              onChange={this.onInputChange}
              validate={(val) => val ? false : "Name Required!"}
            />
            <Field 
              placeholder="Email"
              name="email"
              value={this.state.fields.email}
              onChange={this.onInputChange}
              validate={(val)=> isEmail(val) ? false : "Invalid Email!" }
            />
            <input type="submit" disabled={this.validate()}/>
          </form>
         <div>
           <h3>Listings: </h3>
           <ul>
             {this.state.people.map( ({name, email}, i) => 
              <li id={i}> {name} ({email}) </li>
             )}
           </ul>
         </div>
      </div>
     );
  }
}

class Field extends React.Component {
  
  //validation for props being passed
  static protoTypes = {
    placeholder : PropTypes.string, 
    name : PropTypes.string.isRequired, 
    value : PropTypes.string, 
    validate : PropTypes.func, 
    onChange : PropTypes.func.isRequired
  }
  
  //NOTE: we make a prop as a part of our state 
  //we need to keep these changes synchronized
  state = {
    value : this.props.value, 
    error: false
  }
  
  //NOTE: Syntax isn't es6 wrapping this
  //NOTE: update variable 
  componentWillReceiveProps(update) {
    console.log("when is this?");
    this.setState({value : update.value });
  }
  
  onChange = (evt) => {
    console.log("onChange inside Field");
    const name = this.props.name; 
    //we rip the value here NOT props
    const value = evt.target.value; 
    const error = this.props.validate ? this.props.validate(value) : false; 
    //this setState dpesn't register the change into the input field; 
    //rather, our call to setState in Listings is what logs the input
    this.setState({ value, error });
    //NOTE: After updating our state here, we still go upstream and 
    //attempt another state change! 
    this.props.onChange({ name, value, error });
  }
  
  render(){
  console.log("either first rendering or second rendering");
    return(
      <div>
        <input 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
        />
        <span style={{color : "red"}}> {this.state.error} </span>
      </div>
    );
  }
}

ReactDOM.render(<Listings />, document.getElementById("content"));