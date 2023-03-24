export function dynamicAscendingSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}


export function dynamicDescendingSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
      
      return result * sortOrder;
  }
}

export const getStudentList = (state, students) => {
  if (state === "all") return students.length;
  if (students.length) {
    return students.filter(student => student?.state === state)?.length
  }
  return 0;
}

export const filterStudentBasedOnState = (students, state) => {
  return students.filter(student => student.state === state)
}