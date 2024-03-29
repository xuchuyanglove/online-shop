let arr = new Array(100).fill(0).map((v,i,a)=>{
    return i
})
arr.sort((a,b)=>{
    return Math.random()-0.5
})
console.log(arr);
if(0){
    console.log(false);
}