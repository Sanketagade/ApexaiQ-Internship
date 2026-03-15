function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  console.log("Wait for 2 seconds...");
  await sleep(2000);
  console.log("Done!");
}

start();