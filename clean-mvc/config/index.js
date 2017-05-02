//pick out the environemnt that you will be running on 
module.exports  = ((env)=>{
 const config = {};

 switch(env) {
  case "production":
   config = require('../env/production');
   break;
  case "development":
   config = require('../env/development');
   break;
  case "testing":
   config = require('../env/testing');
   break;
  case "staging": 
   config = require('../env/staging');
   break;
   default:
    console.error("ERR NODE_ENV var not set");
    process.exit(1);
  }
      return config;
});