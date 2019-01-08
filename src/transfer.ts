import fs from 'fs-extra';
import path from 'path';

export default async ()=> {
  try{

    const files = await fs.readdir(path.join('data'))

    const folderName = `record-${files.length}`;

    await fs.move(
      path.join('output'), 
      path.join('data', folderName)
    );

    return folderName;

  } catch (e) {
    console.log(e);
    return false;
  }
}