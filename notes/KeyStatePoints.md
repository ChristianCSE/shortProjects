IMPORTANT TO HAVING SETSTATE WORK AS YOU EXPECT TO WORK!!!!

AVOID THIS PRACTICE  
```
//state.count === 0
this.setState({ count: state.count + 1});
```
For sake of ease , we call it 3 times. 
Remember, `this.setState()`` is `enqueing` the request to change the property 
value!
state.count could essentially equal 0 for all 3 requests 
resulting in our queue. At the end of our re-renders we would 
have `state.count===1`. 

`HERE COMES THE SIGNATUE: (prevState, props) => newState`

Again, setState() doesn't immediately mutate `this.state`, 
rather it creates a PENDING transition. 
Hence we this second form of `setState()` that accepts a function rather than 
an object. 

`CORRECT:`
```
this.setState((prevState, props) => {
  return {counter : prevState.counter + 1};
 });
```

Look at the function we insert inside `setState()`
```
setState(handler, callback)
//hander function is below, we place it inside 
//setState() rather than giving it an object. 
(prevState, props) => { return {count :  prevState.count + 1} }
```

The syntax is similar to that of the `reducer((prevState, current))`

```
let queue = [{increment: 1}, {increment: 1}, {increment: 1}];
let state = queue.reduce((prevState, props)=>
 ({ counter: prevState.counter + props.increment })
,{counter: 0})
```


There are 2 ways to declare a component
`Stateful Component`
```
class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: this.props.initialValue};
  }
}
```

`Stateless Functional Component`
```
const CounterWrapper = props => (
  <div> 
    <Counter initialValue={125} /> 
  </div>
);
```
Stateless: they don't have an internal state & 
functional: they are written as a plain Js function


In some of the projects, you'll see that there are CSS imports:
` import from '../Switch.css' ` this is only due to using a webpack loader
that allows us to import the CSS.