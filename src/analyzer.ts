import fs from 'fs-extra';
import path from 'path';
import _ from 'underscore';

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

function countBy(arr: any[], iteratee: (obj: any) => any): { [key: string]: number } {
  return arr.map(iteratee).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

export default async function analyzer (FOLDER:string) {

  // TODO: The files retrieval and concatenation should be split somewhere else


  const PATH = path.join('data', FOLDER);

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

  return {rollCount, colorCount} 

}