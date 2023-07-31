//let array = [];
//array.push(1);
//array.push(2);
//array.push(3);
//array.push(4);
//array.push(5);
//console.log(array);

//let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
//for(let i=0;i<array.length;i++) {
//  array[i]=1;
//}
//console.log(array);

//function a1(p) {
//    return p + 1;
//  }
//  console.log(a1(2));
//  console.log('_____________');
    

  
  //This code works for integer value input
  //let price = 123457890;
  function comma(price) {
  let sprice = price.toString();
  let slength = sprice.length;
  let sub_sprice = ''; 
  if (slength <= 3) {
    sub_sprice = sprice;
    //console.log(sub_sprice);
    }
  else {
    const commaCount = Math.floor((slength-1)/3);
    console.log(commaCount);
    for (i=0; i < commaCount; i++) {
    sub_sprice =  ',' + sprice.substring(slength-3*(i+1),slength-3*(i)) + sub_sprice;
    }
    sub_sprice = sprice.substring(0,slength-3*(i)) + sub_sprice;
    //console.log(sub_sprice);
    }
  return sub_sprice;
  } 
  
  console.log(comma(123457890));
  //console.log(comma(1000));



  //console.log(slength);
  //console.log(sub_sprice);
//  function comma(price) {
//    price = '1000'
//    return '1,000'
//  }
  //console.log(comma(1000));
  //console.log(comma(100000));