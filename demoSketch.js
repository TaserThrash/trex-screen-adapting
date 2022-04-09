var marks =[20,10,14,17,30]
var heights =[5.6,5,5.10,7,2,4,5.5]
var avg

//agerage of marks using 3 different method
len = marks.length
sum = marks[0]+marks[1]+marks[2]+marks[3]+marks[4]
avg = sum/len
console.log(avg)
sum =0

for (var i in marks){
  sum+=marks[i]
  console.log("sum="+sum)
}
avg = sum/marks.length
console.log(avg)

sum =0
for (var i=0; i<marks.length;i++){
  sum+=marks[i]
}
avg = sum/marks.length
console.log(avg)

//agerage of height
sum=0
for(var i=0;i<heights.length;i++){
  sum+=heights[i];
}
avg=sum/heights.length;
console.log(avg);

sum=0
for(var i=heights.length-1;i>=0;i--){
  sum+=heights[i];
  console.log(i)
}
avg=sum/heights.length;
console.log(avg);

sum=0
for(var i in heights){
  sum+=heights[i];
}
avg=sum/heights.length;
console.log(avg);
