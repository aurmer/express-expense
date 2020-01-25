

export const oneDepthObjectEqual = (obj1,obj2) => {
  var props1 = Object.getOwnPropertyNames(obj1)
  var props2 = Object.getOwnPropertyNames(obj2)

  if (props1.length !== props2.length) {
      return false
  }

  for(let idx = 0; idx < props1.length; idx++) {
    let thisProperty = props1[idx]
    if(( typeof obj1[thisProperty] !== "object" ) && obj1[thisProperty] !== obj2[thisProperty]) {
      return false
    }
  }
  return true
}



export const deepCopy = (oldObject) => {
  return JSON.parse(JSON.stringify(oldObject))
}
