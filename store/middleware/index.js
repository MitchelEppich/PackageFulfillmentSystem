import actions from "../actions";

const imports = [];

const middleware = [
  // Log
  store => {
    return next => {
      return action => {
        const result = next(action);
       
        return result;
      };
    };
  }
];

export default [...middleware, ...imports];
