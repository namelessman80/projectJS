let a = {
    name : '홍길동'
  }
  
  let b = Object.assign({}, a) //create a shallow copy (b) of an object a. Initially b = {} 
    //Object.assign(target, ...sources): This is a built-in method in JavaScript that is used to copy the values of all enumerable properties from one or more source objects (...sources) into a target object (target). The method returns the modified target object.
    //the {} is an empty object literal, which serves as the target object b. Object.assign({}, a) will copy all enumerable properties from a into the new empty object {} and store the result in b
    //a and b are separate objects in memory. Only top level properties of the object a are copied to the object b. If a contains nested objects, changes to the nested objects will be reflected in both a and b.
  console.log(a.name)
  console.log(b.name)
  
  a.name = 'Jason'
  b.name = 'Jason'
  
  console.log(a.name)
  console.log(b.name)