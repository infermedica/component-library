import { readFileSync } from 'fs';

const fileUrl = new URL('../../package.json', import.meta.url);
const packageJSON = JSON.parse(readFileSync(fileUrl));

const getVersion = (releaseType) => {
  const { version } = packageJSON;
  const releaseTypes = [
    'major',
    'minor',
    'patch',
  ];
  const index = releaseTypes.indexOf(releaseType);
  const newVersion = version.split('.');
  if (index !== -1) {
    newVersion[index] = parseInt(newVersion[index], 10) + 1;
  }
  return {
    current: version,
    new: newVersion.join('.'),
  };
};

export default getVersion;
