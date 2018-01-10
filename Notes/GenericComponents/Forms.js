//Generic React Form 
import React from 'react';
import ReactDOM from 'react-dom'; 
import isEmail from 'validator/lib/isEmail';

class Listings extends React.Component {

  //NOTE: name & email are attributes for an object named fields
  state = {
    fields : {
      name: "",
      email: ""   
    }, 
    people : [], 
    fieldErrors : {},
  }

  //NOTE: Two different handlers. 
  //One for handling our current input & the other for publishing it in the list 
  
  //this publishes the current person stored in fields into our people array 
  onFormSubmit = (evt) => {
    //change the flow of publishing a user into our people array due to validator
    /*
    const people = [...this.state.people, this.state.fields];
    this.setState({ people,  fields: {name: '', email : ''} });
    evt.preventDefault();
    **/
    const person = this.state.fields;
    const fieldErrors = this.validate(person); //returns object
    this.setState({ fieldErrors });
    evt.preventDefault();
    if(Object.keys(fieldErrors).length) return; //don't bother publishing this user 

    const people = [...this.state.people, person];
    this.setState({ people, fields: { name: "", email: ""} });
  }

  //trace every key stroke and stores it into our fields object
  //Yes, this cause re-rendering!
  //NOTE: evt.target.NAME is wrt to what was used in the input component name="something"
  onInputChange = (evt) => {
    console.log("Constantly triggered via key strokes");
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }

  validate = (person) => {
    const errors = {}; 
    if(!person.name) errors.name ="Name Required!";
    if(!person.email) errors.email = "Email Required!";
    if(person.email && !isEmail(person.email) ) errors.email = "Invalid Email!";
    return errors;
  }

  render(){
    return(
      <div>
        <h2> Signing! </h2>
        {/*NOTE: name="something" that's us naming our input; hence, event.target.NAME will 
          hold the user input from our form. */}
        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Name"
            name="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
            />
            <span style={{ color : "red" }}> {this.state.fieldErrors.name} </span>
            <br/>

          <input placeholder="Email" 
            name="email" 
            value={this.state.fields.email} 
            onChange={this.onInputChange} 
            />
            <span style={{ color : "red" }}> {this.state.fieldErrors.email} </span>
            <br/>

          <input type="submit" />
        </form>
        <div>
          <h3>Our Listings: </h3>
          <ul>
            { this.state.people.map( ({name, email}, i) => <li key={i}> {name} ({email})</li> )}
          </ul>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Listings />, document.getElementById('root'));