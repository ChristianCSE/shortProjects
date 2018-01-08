
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

## Stateless Components (FUNCTION STATELESS PURE COMPONENT)

Purpose: lightweight components that don't require special handeling. 
Def: Component that only need the render() method. 

`Stateless Functional Component Syntax: `

```
const Header = (props) => {
  return (<h1>{props.headerText}</h1>);
}
```
NOTE: 
Props are passed into the function. 
We are just using a normal Js function, nothing else. 
This is a stateless functional component; hence, they don't have a 
`this` property to even refer to -- a new React Component instance is never 
created. 
These are FUNCTIONS; hence, no backing instance -- they cannot contain state.
`FUNCTION STATELESS PURE COMPONENT` are outside the normal component 
lifecycle methods; hence, we annot use refs, ref the DOM, etc. 
Still, React allows us to use propTypes & defaultProps on our `FUNCTION STATELESS PURE COMPONENT`.

`Immediate Benefits:`
```
Minimize stateful components 
Performance 
```
With the absence of needing to keep track of component instance in memory, 
dirty checking, etc. => perf boost. 

`If lifecycle methods aren't required and you can get away with only arendering function, USE Stateless Functional Pure Components!`


Example of making a component Functionally Pure!

Look at the Switch Component. 
We cannot remove state completely; however, we can isolate it. 
We are trying to pull the state into a few parent components. 
=> we pulled each choice into `renderChoice` indicating a 
good candidate for pulling into it's own stateless component. The 
only problem: `renderChoice` calls `setState`.

`Functionally Pure Component!`
```
//converting our renderChoice method into a functioncally pure component
const Choice = function(props){
  const cssClasses = [];
  if(props.active) {
    cssClasses.push(styles.active);
  }  
  return(
    <div className="choice" onClick={props.onClick} className={cssClasses}>
      {props.label}
    </div>
  )
}
```
NOTE: this functionally pure component doesn't reference state (`this`). IOW, 
we cannot read from state. 
Now, pass arguments down through props. Notice that our functional component 
accepts an argument that we've named props

`onClick={props.onClick}`
Notice we have a prop function, onClick is a function belonging to a 
statefull component since this will be calling some stateful method like 
setState()! 

`How does our Switch component change?`
```
//NOTE: the properties we are sending get consildated into the object props.
  return(
    <div className="switch">
      <Choice 
        onClick={this.select(BTC)} 
        active={this.state.payMethod === BTC}
        label = "Pay with Bitcoin"
        />
      <Choice 
        onClick={this.select(US)}
        active={this.select.payMethod === US}
        label = "Pay with USD"
        />
      Paying with: {this.state.payMethod}
    </div>
  );
```


Functionally Pure Components are reusable and not tied to any particular state!
This Encourages reusing these types of components 



This is the new structure of our Switch by decoupling renderChoice from 
Swtich into it's own Functionally Pure Component. 

```

//functionally pure component
/*NOTE: onClick={props.onClick}, this implies that the event handler belongs 
to a parent/higher method than our current method. This makes sense since 
our functionally pure component is stateless; hence, it won't be the one calling setState({}).*/

const Choice = function(props){
  const cssClasses = [];
  if(props.active){
    cssClassses.push(active); 
    //<div class="active"> when css is .active or anything else
  }
  return(
    <div className="choice" onClick={props.onClick} className={cssClasses}>
      {props.label}
    </div>
  );
}

const BTC = "Bitcoin";
const US = "USD";
class Switch extends React.Component{
  state = {
    currency : "Bitcoin"
  }

  //this triggers re-rendering when state is updated/changed
  select = (selectedCurrency) => {
    //this is an anonymous function
    return (event){
      //NOTE: this.state is NOT referenced
      this.setState((prevState, props) => {
        return {currency: selectedCurrency};
      }, () => {
        //setState callback
        console.log('setState Callback triggered after state change!', this.state);
      });
    }
  }

  render(){
    /*NOTE: We call our Choice functionally pure component, which 
    returns the a component: 
    <div className="choice" onClick={props.onClick} className={cssClasses}>
      {props.label}
    </div>
    This is in our Switch component after the initial rendering! 
    */
    return(
      <div className="switch">
        <Choice 
          onClick={this.select(BTC)}>
          active={this.state.currency === BTC}
          label="Pay with Bitcoin" />
        <Choice 
          onClick={this.select(US)}
          active={this.state.currency === US}
          label="Pay with USD" />
          Paying with: {this.state.currency}
      </div>
    );
  }
}

```




//Reminder of a previous concept: 

## PropTypes!

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






## Appendix Explaination: PropTypes!
1. What are they for?
The are a way to validate values that are passed in through a component's
props.
Simultaneously, they provide a layer of documentation to the consumer 
of our components. 
They use to be a part of React, but now you have to manually install 
the depenency via npm. 

### Using PropTypes
```
import PropTypes from 'prop-types';

class Component extends React.Component {
  static propTypes = {
    propProperty: PropTypes.string
  }
  render(){
    return (<div>{this.props.name}</div>);
  }
}
```
NOTE: We set our propTypes with a static property on the class. 
(there are other ways of declaring them depending when they are declared)

There are predefined PropTypes (i.e. string, number, boolean, etc) and
custom types.
The more esoteric, but commonly used are: element, arrayOf, shape, 
function, etc.


NOTE: Unless we've explicitly stated that we require a prop, 


## Static (Quick Review)

Static methods are made directly on the class!
They are NOT callable on instances of the class! 
Static methods are usually used to create utility functions.
If you want to call a static method within another static method, 
you need to use `this` i.e.  `this.someStaticMethod()`
Static methods aren't accessible with non-static methods!
Even if you use `this`, they will work if you use 
ClassName.staticMethodName().


## Static: When to use?
Follow the simple statement: 
"Does it make sense ot call this method, even if no Object has been
constructed yet?"
If your response is yes to this response, then make the method static!
i.e. Math.round(), Object.keys(), etc. 

My own realization: these seem to be utility functions. 

### Quick Example of static methods!

```
var textnode = document.createTextNode("Water");
class Something {
  static genericStaticMethod(someNumber=1){
    textnode = document.createTextNode("Not Water");
    console.log("Called with certain context: ", someNumber);
    return someNumber*10;
  }

  genericNonStaticMethod(){
    console.log("This should not be allowed to invoke a static method!");
    //you can by-pass the fact 
  }
}
```



## PropTypes continued!
=> A more esoteric type is `object shape`.
This accepts an object with a list of key-valye pairs where it dictates
name: type. 

```
class Component extends React.Component {
  static propTypes = {
    user : PropTypes.shape({
      name: PropTypes.string, 
      profile: PropTypes.string
      });
  }
  render() {
    const { user } = this.props
    return (
      <h1>{user.name} & {user.profile} </h1>
    )
  }
}


```


## multiple VALUES 
You also have the ability to allow more than one VALUE for a particular 
prop! This is especially common with logs. 
```
static propTypes = {
  levelValues : PropTypes.oneOf([
    'debug', 'info', 'error'
  ]),
  phoneTypes : PropTypes.oneOfType([
    PropTypes.number, 
    PropTypes.string
  ])
}
//versus
```

## multiple TYPES
oneOf focuses on TYPES. iow, the prop being passed should be 
one of those values and nothing else. oneOfType focuses on TYPES.



## instanceOf
Must be an instance of a Js class!
```
class Component extends React.Component {
  static propTypes = {
    user : PropTypes.instanceOf(User)
  }
}
```


## node 
This is for a value that can be anything that can be rendered i.e.
String, DOM elements, arrays, numbers, etc.
Useful: Requiring a component to have children or setting a custom
element. 


## element 
This allows the user to use custom components. IOW, 
they aren't constrained to a certain component. 
While some cases require a custom component, in our
case of <List />, we want it to accept different
list components. 

```
class Component extends React.Component {\
  static propTypes = {
    listComponent: PropTypes.element,
    list: PropTypes.array
  }
  render(){

  }
}
```

## any type
We just want the prop to be present regardless of it's
type. 
`PropTypes.any`.


## ONLY APPEARS IN DEVELOPMENT!
Remember, this propTypes will only show error logs in development
builds. IOW, once you are deploying a production build you will 
not see any notifications relating to propTypes!




## Using mapping 
NOTE: [].map returns another array while [].forEach just 
does computations on the values and nothing is returned.
With this in mind, when we want to construct components
with props: 
```
class Basic extends React.Component {
  render(){
    return(
      <div>
      {/*React.Children.map(children, function[(thisArg)])*/}
      {React.Children.map(this.props.children,this.renderChild)}
      </div>
    )
  }
}
```
NOTE: children is an array and renderChild is our function.
All map does is for every element inside our prop we invoke 
the provided function.

# General Summary
State, Props, Context (experimental feature, don't use unless it's
unavoidable), PropTypes, Pure Stateless Functional Components. 
Not really cleared up: lifecycle methods = componentDidMount & componentWillupdate




## Forms 

NOTE: You can use `onClick` & `onSubmit` to handle a submission on 
your form. This seems to depend on the input your form accepts. These 
functions are our even handlers. 




## Generic Submission (onSubmit)


```
class Listings extends React.Componet {
  state = { names: [] }

  onFormSubmit = (evt) => {
    //NOTE: The way we are accessing the input from our form!
    const name = this.refs.name.value; 
    //we use the spread operator to avoid [[name, nameB], newName]
    const names = [...this.state.names, name];
    this.setState({ names: names });
    evt.preventDefualt();
  }

  render(){
    return(){
      <div>
        <h1> Signing Sheet </h1>
        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Name" ref="name" />
          <input type="submit" />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((name,i)=><li key={i}>{name} </li>)}
          </ul>
        </div>
      </div>
    }
  }
}
```


NOTE: 
this.refs.x.value: We access our form input.
Form template: 
```
<form onSubmit={this.eventHandler}>
  <input ref="namingVariableRef" />
  <input type="submit" />
</form>
```


