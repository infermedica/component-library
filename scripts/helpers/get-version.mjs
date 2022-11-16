import { readFileSync } from 'fs';

const fileUrl = new URL('../../package.json', import.meta.url);
const packageJSON = JSON.parse(readFileSync(fileUrl));

const getVersion = (releaseType = 'patch') => {
  const { version } = packageJSON;
  const releaseTypes = [
    'major',
    'minor',
    'patch',
  ];
  const typeIndex = releaseTypes.indexOf(releaseType);
  const newVersion = version.split('.').map(
    (value, index) => {
      if (index === typeIndex) return parseInt(value, 10) + 1;
      if (index > typeIndex) return 0;
      return value;
    },
  ).join('.');

  return {
    current: version,
    new: newVersion,
  };
};

export default getVersion;
