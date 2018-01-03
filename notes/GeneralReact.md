
ReactDOM.render(
  <TimersDashboard />, 
  document.getElementById('content')
);



=>basic concepts
>client side routing
>managing complex state 

=>adv concepts
>data architecture
>transport 
>management
>redux, graphQL, Relay
>>graphQL: rest api alternative where the client describes 
>>the data needed. 
>>Relay: glue b/w graphQL & React. A data fetching library. 



  <head>
    <meta charset="utf-8">
    <title>Project One</title>
    <link rel="stylesheet" href="./semantic-dist/semantic.css" />
    <link rel="stylesheet" href="./style.css" />
    <script src="vendor/babel-standalone.js"></script>
    <script src="vendor/react.js"></script>
    <script src="vendor/react-dom.js"></script>
  </head>

there are dependencies we are loading that are 
below <head>


    <div class="main ui text container">
      <h1 class="ui dividing centered header">Popular Products</h1>
      <div id="content"></div>
    </div>

class: is concerned with styling, nothing more. 
It's referencing Semantic UI. 

classes = special functions used to define fx expressions and fx declarations.

class declaration
class Person{
  constructor(age, gender){
    this.age = age;
    this.gender = gender;
  }
} 
hoisting: context execution in Js. 

fx declarations are hoisted, class declarations are NOT. 
First declare class, then access it. 

class expresion (named & nameless)

//named
const Person = class Person{
  constructor(){}
}

//nameless
const Person = class {
  constructor(){}
}





We still need to select a tag via id:
ReactDOM.render(
  <ParentComponent />,
  document.getElementById('content')
)




2 ways to declare React components
class Person extends React.Component{
  render(){return <p></p>}
}


class Person = React.createClass({
  render(){return <p></p>}
})




JSX is just compiled into Javascript

Regualr Js:
React.createElement('div', {className: 'ui items'},
  React.createElement('p', null, 'Hello!')
  );

JSX rep:

<div className='ui items'>
  <p> Hello! </p>
</div>



<script type="text/babel"
    data-plugins="transform-class-properties"
    src="./js/app.js">
type: indicates to Babel that we want to 
handle the loading of this script. 




ReactDOM.render()
=>instructs React to render the react component
inside a specific DOM node. 

ReactDOM.render([what we want rendered], [where we want
it rendered])
[where] => some id on a tag. 



*** In JSX, braces {} are a delimiter signaling 
what resides in-b/w is a Js expression

=>attribute values must be delimited by either {} or ''
=>if type is important ie. Number or null, use {}





While a child component can read its props, 
it CANNOT modify them. 
Child components DON'T own its props; rather, 
the parent component owns the props. 
=> one-way data flow. 
data changes from the top of the app and we are 
propagated downwards through various components. 




============== `this` ============== 
`this.` has different binding depending on the context.

class Product extends React.Component{
  handleFunction(){
    this.props.onVote(this.props.id);
  }
  render(){
    <a onClick={this.handleUpVote}>
  }
}


we want `this` inside `handleUpVote()` to reference the 
component just like it does inside render()



deterministic rendering: 
every react component is rendered as a fx of its 
this.props & this.state 

data that is mutated should be considered stateful. 

initial state should be definied as an object in 
the construcutor 




class Object extends React.Component {
  constructor(){
    super(props);
    this.state = {
      property : []
    };
  }
  componentDidMount(){
    this.setState({ products : Seed.products });
  }
  render(){
    //accessing state properties
    console.log(this.state.products);
  }
}

Remember `this` is refering the component.
we are specifying what this should be set to. 



setState() is asynch 
There is no guarentee when React will update the state 
& re-render our components. 
WRONG:
this.setState({nums : this.state.nums.push(4)});



IMPORTANT 
It's best practice to treat state as immutable 
=> One example is using .concat() on an array 
this creates a new array rather than referencing the original array
also, all updates to this array do not influence our original array.





Property Initalizers 
available via transform-class-properties which is 
in our index.html
<script type="text/babel" 
data-plugins="transform-class-properties"
src="./js/app.js">







1. Prototype the app as being static
2. Start determining what is stateful & props


When determining state, we might have to find 
a middle ground ie. a parent of two-subcomponents. 


The decision of a common owner component for state is 
also dependent on it's actions/restrictions.
Keep this in mind when imposing limitations on a 
property; this will change location of state. 


Owners of state are those that mutate the state!

Keep in mind: React is all about one-way data flow
down the component hierarchy.




Props are state's immutable accomplice.
Mutable state is passed down the hiearchy as 
immutable props. 



ONE-WAY DATA PIPELINE, STATE, PROPS
=> this is important because of the reaction to updating state.
When state is updated the component managing that state re-renders
invokes render(). This re-render() invokes the render() of all the 
children components down the chain and so on. 



In React, forms are stateful. 

Always treat states as immutable!



Sometimes we want to display an ongoing update ie. in our timer
app, we want to show the clock continually going. 
We DON'T want to continually update the properties!
=> We can avoid updating the time properties and still
render the changes via 'forceUpdate'
'forceUpdate()' can have an interval applied to it too
in order to provide the appearance of a live timer


forceUpdate(): built-in react method. this is what actually triggers the 
re-rendering. 

mounting: methods that are called when an instance of a component is
being created & inserted into the DOM. 

componentDidMount(): 
Commonly for data loading from a remote endpoint, good place to 
instatiate network request. 
=> set up subscritions BUT also remember when unsubscribing to invoke
componentWillUnmount()
If you call setState inside this method, you trigger an extra
re-rendering BUT will happen before browser updates the screen. 


componentWillMount(): 
invoked before mounting. called before render(); hence, calling
setState synchronously will not trigger extra rendering
=>rec to use constructor instead.
=>only hook called on server rendering. 
=>all side-effects/subsriptions should be done with DidMount()



componentWillUnmount(): 
triggered when unmounting, the method itself isn't 
unsubscribing! 


ex. 

class Timer extends React.Component {

  componentDidMount() {
    this.forceUpdateInterval = setInterval( () => this.forceUpdate(), 50 );
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render(){
    const elapsedString = "10:10";
  }
}





this.forceUpdateInterval = setInterval( () => this.forceUpdate(), 50 );
forceUpdateInterval=> just a method you made up
setInterval(methodCall, time interval). 
componentDidMount will trigger our setInterval (built-in js method) that will
trigger forceUpdate (built-in react method) every 50 ms. 
we call forceUpdate to trigger re-rendering!


note that we are in fact triggering setInterval when we assign it to 
forceUpdateInterval. 
setInterval actually returns a unique id for it's method; hence, we 
use the variable forceUpdateInterval to remove the method. 



As you prototype your app, you'll notice it isn't 
persistant, you need a server to give persistence to the app. 
IOW, if we currently close our app we will lose all our data. 


Constructing an App:
1. Break the laid out app into components. 
2. Build a static version of the app. 
3. Determine state. 
4. Determine what component should contain what part of state. 
5. Hard code initial state. 
6. Inverse data flow for event propogation 






Components & Servers

Commnunicate events to state managers by calling prop-functions.


Promises allow us to write async code synchronously, IOW
we make async code look like it's synchronous. 
async: the execution of our program doesn't wait for the 
server's response; hence, if we want it to finish we have to 
wait for it. (callbacks or promises)
return function(hello, otherFunction(material){
    return 10 + material;
});
or better alternative
return function(hello)
.then(otherFunction(material)=>{
  return 10 + material
})
or even shorter
return function(hello)
.then(otherFunction)





long-polling: enables changes to be pushed to clients 
near instantly. 


fetch(api endpoint path, headers)
fetch('/api/timers', { headers: { Accept: 'application/json', },})
we are noting that we only want to accept json responses 


=>personal question: why do we only wrap a chain of then's with 
a promise once? When is the promise actually resolved, how can you tell?


optmistic updating: when we update the client locally before waiting to 
hear from the server. 
We have to duplicate our state update efforts as we update both the 
client & server. 

whenever doing optimistic update(s), one needs to replicate 
whatever restrictions the server would have. IOW, replicate 
the code that manages state changes on both client & server. 



NOTE: 
notice that in our React code, 
we still do setState() this is due to wanting our frontend 
to update without looking like it's lagging

so our current code looks like: 
```
startTimer = (timerId) => {
  this.setState({});
  client.startTimer({});
}
//while it could be 
startTimer = (timerId) => {
  //this goes to the server first then re-renders the component
  //makes our update appear slower than it could be
  client.startTimer({}).then(loadTimersFromServer);
}
```





Nov 20th Wednesday



jsx & virtual dom
============================================================
Virtual DOM: a tree of Js objects that represents the actual 
It's a tree of ReactElements.

ReactDOM.render(
  <TimersDashboard />, 
  document.getElementById('content')
);
//also allows for a 3rd element callback 
ReactDOM.render(ReactElement, mountElement, callback)


gotchas: 
Cannot use reserved words class & for
since we are using jsx (a hybrid of js)
<div class=''> : className
<label for=''> : htmlFor



React builds a visual representation of the DOM. 
virutual => tree of Js objects that represent that actual dom. 
we are actually manipulating the virtual representation & letting 
React change the browser's DOM. 

we avoid manipulating the dom since it's hard to track changes 
(state of DOM) and it's slow

with this abstraction, the developer simply returns the DOM they 
wish to see. 
We benefit from the virtual DOM in that it uses: 
efficient diffing algorithms, update subtrees, batch updates. 


Shadow DOM deals with encapsulation of elements NOT React or 
Virtual DOM.

Remember, we are not creating tags directly on the DOM. 
We are providing React a set of JS objects which React 
turns into a real DOM tree. 

//instance of a React Element! 
//var boldElement = React.createElement('b');
var boldElement = React.createElement('b', null, "Text inside")
//this isn't rendered; hence, it does not appear
var mountElement = document.getElementById('root');
//this renders the boldElement in the DOM tree
ReactDOM.render(boldElement, mountElement);

//createElement(dom element type, props, children of element)
//children: ReactElement, string/number/, array



//note: the previous syntax seems cumbersome & verbose
//we use jsx to avoid that syntax
//same as before, we just need to transpile this (usually with babel)
var boldElement = (<b>Text inside</b>);

//expressions in component's attribute are wrapped with curly braces


const comp = (<Alert color = {warningLevel === 'debug' ? 'a':'b'} />)


//spread syntax
{...props}

//classname dependcy to make setting properties easier 

const attributes = classsnames({
  box: true, alert: this.props.isAlert, 
  severity: this.state.onHighAlert, timed: false
})
<div className={attributes}>
}


//data-anything: 
Append data-X for our own attributes that html spec doesn't ocver

This only applies to native HTML DOM components; hence, not 
required for custom components 


REACTELEMENT IS STATELESS & IMMUTABLE





Advanced Component Config with: props, state, and children
============================================================

NOTE: 
advanced-components/components-cookbook
/src/components/Messages/Messages.js


import ProtoTypes from 'proto-types'
//NOTE: how one imports a css doc, not a react component
//the path is made wrt to node_module WHICH is exactly 
//like any other dependency!
import 'font-awesome/css/font-awesome.css'
//this is a regular css file 
//but you have all properties containerized into 
//this style var
const style = require('./Messages.css');
<div className={styles.container}>



//declaring component 
const App = React.createClass({ 
  render: function(){ } 
})

const App extends React.Component {
  render(){}
}



//Render
props: immutable pieces of data that are passed into 
children components from parents. 
component state is where we hold data, local to a componetn.
```
Unlike props, state is private to a component and is mutable
```
//props
using props, we've taken our static component and allowed it 
to dynamically render. 



//GOOD PRACTICE TO USE: PropTypes
well-defined interfaces provide a layer of safety. 
they are a form of documentation and providing defaultProps
means the render of your code doesn't assume as much. 
-> can omit certain type checks
'prop-types' dependency => import PropTypes from 'prop-types'

// if we declared our Component with class, we use this syntax:

class Map extends React.Component {
  static propTypes: {
    zoom: PropTypes.number, 
    place: PropTypes.object,
    markers: PropTypes.array
  };
}
//while there are built in PropTypes (which are validated)
//we can define our own 


/*DEFAULT PROPS WITH getDefaultProps()*/
we can use the static property defaultProps to do this. 

class Counter extends React.Component{
  static defaultProps  = {
    initialValue: 1
  };
}
//this is equivalent to having explicitly assigned the 
//value passing it a prop
<Counter initialValue={1} />

/*CONTEX*/
BE WARY OF USING CONTEXT OR ANY GLOBAL SCOPING IN JS. 
ONE NORMAL USE CASE IS LOGGED IN USERS, BUT IT HARD TO 
MAINTAIN CONSISTENCY. 

By adding childContextTypes & getChildContext to your component 
(the context provider), React passes the info down automatically
& any component in the subtree can access it by defining contextTypes



//State
//NOTE: how these methods are invoked and note the parameter these methods 
//are initiated with

index.html 
<div id="content">
<script type="text/babel" src="./js/app.js"></script>

app.js
import React from 'react';
import ReactDOM from 'react-dom';


class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currency : 'USD'
    }
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  changeCurrency = (selectedCurrency) => {
    console.log('this is called by render!')
    return (event) => {
      console.log('this is called iff you click the button')
      this.setState({ currency : selectedCurrency });
    }
  }

  render(){
    return(<div>
      <button 
        onClick={this.changeCurrency('BTC')}>
        Current Currency: {this.state.currency}
      </button>
    </div>)
  }
}


ReactDOM.render(
  <Wallet />, 
  document.getElementById('content');
);



//bind is core js, not exlusive/native to React. 
This is how binding events works. 
Bounded function: is one bounded to a given context, meaning 
no matter how you call it, the context of the call stays the same.







//State re-iterate it 
//by far most important concept 

Dynamic piece of data. 
When a component needs to hold a dynamic piece of data, that 
component can be considered stateful. 


Stateful components: Components that hold local-mutable data. 

Aim for having as few staetful components as possible. 




To add interaction we want to respond to a CLICK EVENT. 
Callback handler to a component. 
We use the onClick attribute on a component to add a callback
handler to a component. 
select = (choice) =>{
  return (evt) => this.setState({pay:choice});
}
<div className='choice' onClick={this.select(CARD)}>
NOTE: we attatch a callback handler


```
  select = (choice) =>{
    return (evt) => this.setState({pay:choice});
  }
<div className='choice' onClick={this.select(CARD)}>
```
NOTE: onClick attribute expects a function to be passed, but notice
we are actually calling a function that then returns 
a function. 
This function `select` is triggered by render()! 



in the example shown, we do a css import 
` import styles from '../Switch.css' `
this is due to using a webpack loader. 




//Props & State
Setting the intial value of the state property is the only time 
we should ever use props when dealing with a component's state. 
=> if we have a component where prop indicates a value of a 
component we should apply that the value to state in the 
constructor() method!
=>better name for the value as a prop, is initialValue to 
indicate initial state of value will be set. 

=> Setting props inside our component IS ALWAYS A BAD IDEA.
=> What does this even mean?


```
const CounterWrapper = props => (
  <div> 
    <Counter initialValue={125} /> 
  </div>
);

class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: this.props.initialValue};
  }
}
```



Constructor is run once AND ONLY ONCE, before the component 
is mounted. 




//Statefule components 
Defining state on our component requires us to set an 
INSTANCE VARIABLE called this.state in the 
object prototype class 
=> property of the class or in constructor. 

what does setting up a stateful component allow us to do? 
=> Define the initial state of our component. 
=> Tells React that the component will be stateful. 




*** Setting props inside of our component is usually 
always a bad idea. 

*** Setting the initial value of the state property 
is the ONLY time we should ever use props when 
dealing with a component's state. 
=> If we ever want to set the value of a prop to the 
state we should do it here. 
=> if we have a component where the prop indicates 
a value of the  component, we should apply that value to 
the state in the constructor (ie. an initialValue)



//State updates that depend on the current state.

//Best and least problematic way 
```
decrement = () => {
  this.setState(prevState => { 
    return {
      value : prevState.value - 1
    };
  });
}
```

*** whenever a state update depends on the current 
state, it's preferable to pass a function to setState().

*** setState is asynchronous; however, state will not 
necessarily be updated immediately. 
React will add our requested state update to its queue
//hence the way below is bad practice
```
decrement = () => {
  const nextValue = this.state.value - 1; 
  this.setState({ value : nextValue });
}
```


//thinking about state
Whenever a state transition depends on the current state, 
using a function to set the state helps avoid the change
for enigmatic bugs to materialize. 

`setState():`
Note that setState's full function signature is 
```js
setState(updater, [,callback])
```
Where updater: this is the function we send
```
(prevState, props) => stateChange
```
In other words, when we call setState we can also do: 
```
decrement = () => {
  this.setState((prevState, props) => {
    return {value : prevState.value - 1};
  })
}
```
Why does this all matter? 
setState() is actually enqueing changes to the 
component state & tells React that the component & its 
children need to be re-rendered with the updated state. 
In other words, setState() is making a request for updating 
rather than making the update immediately. We don't guarentee 
an immediate update.

Due to the potential pitfall of not updating immediately, 
either use `componentDidUpdate` or a `setState callback`!
=> These are guarenteed to fire after the update has been 
applied. 
THIS IS NOT THE setState callback!!!!
```
this.setState((prevState, props)=>{ 
  return {count: prevState.count + 1}
}, callback);
```
NOTE where the callback is!!
`Previous state immutability!`
`setState((prevState, props)=> return { {} })`
prevState should not be directly mutated; rather, we changes 
concerning it should be a new object based on it's data. 
```
this.setState((prevState, props)=> { 
  return {counter: prevState.counter + props.step}
})
```
`NOTE:` the new counter property of the is using previous state, 
but we never maninpulate prevState directly 
ie. `prevState.counter = prevState.counter  + props.step`

This is what it ends up looking like: 


```babel
class Header extends React.Component {
  state = {
    dummyProp: "something"
  }
  render(){
    return(
      <div>  
        <Switch {...this.state} />
      </div>
    );
  }
}


const BTC = "Bitcoin";
const US = "USD";

class Switch extends React.Component {
  state = {
    currency: 'Bitcoin'
  }
  //this.state. SHOULD NOT BE REFERRED!

  select = (selectedCurrency) => {
    return (evt) => {
      this.setState((prevState, props) =>{
        return {currency: selectedCurrency};
      }, () => {
        console.log('Callback to confirm state change: ', this.state);
      });
    }
  }
  
  renderChoice = (choice) => {
    const cssClasses = []; 
    if(this.state.payMethod === choice){
      cssClasses.push(style.active);
    }
    
    return(
      <div className="choice" 
        onClick={this.select(choice)} 
        className={cssClasses}>
        {choice}
       </div>
    );
  }
  
  render(){
    return(
      <div className="switch">
        {this.renderChoice(BTC)}
        {this.renderChoice(US)}        
        Paying with: {this.state.currency}
      </div>
    );
  }
}


ReactDOM.render(<Header />, document.getElementById('content'));

}
```

```
this.setState((prevState, props), callback);
this.setState((prevState, props) => {
  return {};
})
```
So how do we even get access to prevState & props 

//clarifying some things about setState()
Redux can replace the use of setState(). 

Closure: the combination of a function & the lexical environment within 
which that function was declared. 



--------------------------------------------
--------------------------------------------









