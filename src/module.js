console.log("Module");

async function start() {
   return await Promise.resolve("Async");
}


start().then(e => console.log(e));
