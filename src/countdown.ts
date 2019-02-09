import readline from 'readline';

export default async function countdown (time:number) {
  const stream = process.stdout;

  let $time = time;

  readline.cursorTo(stream, 0);
  stream.write($time.toString());
  readline.clearLine(stream, 1);
  $time--;

  const t = setInterval(()=>{
    readline.cursorTo(stream, 0);
    stream.write($time.toString());
    readline.clearLine(stream, 1);
    $time--;
  }, 1000)

  
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      readline.cursorTo(stream, 0);
      readline.clearLine(stream, 1);
      clearInterval(t);
      resolve(true);
    }, time * 1000);
  });


}