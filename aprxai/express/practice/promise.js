let promise = new Promise(function(resolve, reject) {
  console.log("I am inside Promise");
  resolve();
});

console.log("hello Apexa team");

setTimeout(function() {
  console.log("ater 2 sec thank you team");
}, 2000);

console.log("in this why promise works ");