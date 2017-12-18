
//structure it so the root is at the top
//hierarchy structure 
/*
Finalizing Hierarchical Structure. 
1. Make a static app
2. Determine statefulness & props
3. Inverse data flow (function calls)
 */

//After investigating the entirity of the app 
//we come to determine this the COMMON OWNER COMPONENT 
//for certain sub-components (children components)
class TimerDashboard extends React.Component {
  //NOTE: State belongs to this component
  state = {
    timers : [
      {
        title: 'Practice squats', 
        project: 'Gym Chores', 
        id: uuid.v4(), 
        elapsed: 12345, 
        runningSince: Date.now()
      }, 
      {
        title: 'Baking',
        project: 'Kitchen', 
        id: uuid.v4(),
        elpased: 12345, 
        runningSince: null
      }
    ]
  };
  //DESIGN PATTERN: Seperation of Concern(s) being only concerned 
  //on one action; hence, we call have a handlerAction() & action()
  //NOTE: we pass as props (to children components) the handler functions rather
  //than the immediate action method!
  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  }

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  }

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  }

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  }

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  }

  createTimer = (timer) => {
    const newTimer = helpers.newTimer(timer);
    //concat constructs a new array of arrays => still immutable
    this.setState({ timers: this.state.concat(newTimer) });
  }

  updateTimer = (attrs) => {
    this.setState({
      timers : this.state.timers.map( (timer) => {
        if(timer.id === attrs.id) {
          //create a new object, give it all these properties, but change these
          return Object.assign({}, timer, {
            title: attrs.title, 
            project: attrs.project
          });
        } else {
          return timer;
        }
      })
    });
  }

  deleteTimer = (timerId) => {
    this.setState({ 
      timers : this.state.timers.filter( (timer) => timer.id !== timerId) 
    });
  }

  startTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers : this.state.timers.map( (timer) => {
        if(timer.id === timerId){
          return Object.assign({}, timer, {
            runningSince: now
          });
        } else {
          return timer;
        }
      })
    });
  }

  stopTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map( (timer) => {
        if(timer.id === timerId){
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    });
  }

  //onFormSubmit() is created in this componentn and from here on out, flows downward!
  //we send the method downstream BUT when an event is triggered we do 
  //COMPONENT EVENT BUBBLING where we send the event all the way up to the owner
  //Remember these methods cause re-rendering and everything below (in the hierarchy model)
  //will re-render as well
  render() {
    return (
      <div className='ui three column centered grid'> 
        <div className='column'>
        <EditableTimerList 
          timers={this.state.timers} 
          onFormSubmit={this.handleEditFormSubmit}
          onTrashClick={this.handleTrashClick}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
        <ToggleableTimerForm
          onFormSubmit={this.handleCreateFormSubmit}
        />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TimerDashboard />. 
  document.getElementById('content');
);