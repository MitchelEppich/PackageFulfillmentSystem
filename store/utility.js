/*******************************************/
/*This function combines two objects.
  It is used in the reducers to take the
  old state and combine it with a new one.*/
/******************************************/

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};
