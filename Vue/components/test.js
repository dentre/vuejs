function test (numbers) {
   for (let i = 0 ; i<numbers.length; i ++){
       if(numbers[i]<numbers[i+1]){
           numbers.splice(i)
       }
};

let numbers = [1, -28, 88, 200, 7]

test(numbers)