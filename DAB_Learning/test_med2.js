//let array = [4,8,7,5,6,1,2,3]
//function sort(array) {
//  //정렬해서 return 하세요
//  return [1,2,3,4,5,6,7,8]
//}

//referenced example - https://webmini.tistory.com/1130
//Used Quick Sort scheme

function sort(array) {
  if (array.length <= 1) {  //this base case is a condition checked at the beginning of each recursive call.
  return array; //return the array if it has one or zero element.
  }             //array with one or zero element can cause infinite recursion.

  let pivot = array[0]; //pivot datapoint
  let leftArray = [];  //divide Left/Right array sets = divide and conquer
  let rightArray = [];
  for(i=1; i<array.length; i++){  //should start from i=1. i.e. pivot should be excluded. if start from i=0, array[0] (=pivot) will be added to rightArray.
                                  //This makes rightArray not empty and the for loop continues. The elements of the array are never distributed into leftArray and rightArray. 
                                  //This leads to infinite recursion, which eventually results in a 'Maximum call stack size exceeded' error. 
    if (array[i] < pivot){         
        leftArray.push(array[i]);  //leftArray stores value smaller than pivot value
    }
    else {
        rightArray.push(array[i]); //rightArray stores value equal to/greater than pivot value
    }
    }
    return [...sort(leftArray),pivot,...sort(rightArray)]; //... javascript spread syntax to merge array
    //return [...leftArray,pivot,...rightArray];   //debug to check 1st execution result
  }
let array = [4,8,7,5,6,1,2,3];
console.log(sort(array));
//execution step
//1st - Pivot 4, leftArray [1,2,3], rightArray [8,7,5,6] - Result [1,2,3,4,8,7,5,6]
//2nd - Recursive sort function with leftArray [1,2,3]    
//      Pivot 1, leftArray [], rightArray [2,3] -> leftArray meets base case condition (array.length<=1) and return array [];   
//               in the same way, rightArray [2,3] also stop recursion by next call.                    
//2nd - Recursive sort function with rightArray [8,7,5,6] 
//      Pivot 8, leftArray [7,5,6], rightArray [] - Result [1,2,3,4,7,5,6,8]
//               
//3rd - Recursive sort function with leftArray [7,5,6] only
//      Pivot 7, leftArray [5,6], rightArray [] - Result [1,2,3,4,5,6,7,8]


//When the sort() function is called, it checks if the array length is one or zero. If this condition is true, it means the array is already sorted (as there's nothing to sort), so the function immediately returns the array.
//However, if the length of the array is greater than 1, the function proceeds with the sorting process. It chooses a pivot element, partitions the array into two sub-arrays (leftArray and rightArray), and then recursively calls the sort() function on both sub-arrays.
//During the recursive calls, the function follows the same process: it checks the length of each sub-array and determines if it needs to perform further sorting or if it can return the array directly using the base case.
//The recursion continues until all sub-arrays have a length of one or zero, at which point they are considered sorted, and the sorted sub-arrays are combined back together during the backtracking phase of the recursion. This process ensures that the sorting happens in a divide-and-conquer manner, and the recursion naturally stops when the base case is met.