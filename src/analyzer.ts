import fs from 'fs-extra';
import path from 'path';
import _ from 'underscore';

const FOLDER = 'test1';

const PATH = path.join('data', FOLDER);

const types = [
  50,
  5,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  5,
  2,
  5,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  5,
  2,
  5,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  5,
  2,
  5,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  5,
  2,
  5,
  2,
  3,
  2,
  3,
  2,
  3,
  2,
  5
];

( async () => {

  let data : any[] = [];

  const files = await fs.readdir(PATH);

  for (const file of files) {
    const fileData = await fs.readJSON(path.join(PATH, file))
    data = data.concat(fileData);
  }

  // console.log(data.length);

  const rollCount = countBy(data, row => row[1]);
  const rollCountTypes = Object.keys(rollCount).map( k => [parseInt(k), rollCount[k], types[parseInt(k)]]);
  const colorGroups = _.groupBy(rollCountTypes, row => row[2])
  const colorCount = Object.keys(colorGroups).map( k => [ 
    parseInt(k),
    colorGroups[k].reduce( (acc, row) => acc + row[1] , 0) 
  ])

  console.log(colorCount);

})();





function countBy(arr: any[], iteratee: (obj:any) => any): { [key: string]: number } {
  return arr.map(iteratee).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

function countByArr(arr: any[], iteratee: () => any ): Array<Array<string | number>> {
  const temp: { [key: string]: number } = arr
    .map(iteratee)
    .reduce((acc:{ [key: string]: number }, val:(number|string)) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  return Object.keys(temp).map(key => [key, temp[key]])
}