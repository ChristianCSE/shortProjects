import React from 'react';

class Portfolio extends React.Component {
  render(){
    return (
      <div>
        <Menu />
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Additional />
        <Contact />
      </div>
    );
  }
}
//wrapper: wraps around a single object to 
//provide more functionality and interface to it
//container: structures that contain more than one element
class Menu extends React.Component {
  render(){
    return(<h1></h1>)
  }
}

class Home extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class About extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class Skills extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class Experience extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class Projects extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class Additional extends React.Component {
  render(){
    return(<h1>h</h1>

    )
  }
}

class Contact extends React.Component {
  render(){
    return(<h1>h</h1>)
  }
}


export default Portfolio;
