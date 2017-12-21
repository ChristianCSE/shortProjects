//all these functions are making api requests to our backend
//self-executing anonymous function
//window is another word for global, 
//IOW window.client is just setting a global variable
//NOTE: the anon function only returns certain methods the ones 
//not returned are considered private IOW inacessible outside of the closure context
window.client = (function(){
  function getTimers(success) {
    //make an api call, check the response, parse it, we invoke the method we sent
    const headers = {Accept : 'application/json'}
    return fetch('/api/timers', {headers})
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
  }

  function createTimer(data) {
    //fetch returns a promise; hence, we have access to then() function
    //NOTE: our payload contains data as json type, we are also specifying that
    //we want a json response
    return fetch('/api/timers', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(checkStatus);
  }

  function updateTimer(data) {
    return fetch('api/timers', {
      method: 'put', 
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus);
  }

  function deleteTimer(data) {
    return fetch('/api/timers', {
      method: 'delete', 
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus);
  }

  function startTimer(data) {
    return fetch('api/timers/start', {
      method: 'post', 
      body: JSON.stringify(data);
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus);
  }

  function stopTimer(data) {
    return fetch('/api/timers/stop', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) return response; 
    else {
      const error = new error(`HTTP ERROR: ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.err(error);
      throw error;
    }
  }

  function parseJSON(response){
    return response.json();
  }

  //what we have provided ourselves access to. everything else is private
  return {
    getTimers, 
    createTimer,
    updateTimer,
    startTimer,
    stopTimer, 
    deleteTimer
  };
  
}());