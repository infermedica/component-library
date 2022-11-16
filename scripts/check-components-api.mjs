import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import printCustomTable from './helpers/custom-table.mjs';
import getArgs from './helpers/get-args.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathComponentsApiFile = path.resolve(dirname, '../components-api-lock.json');
const args = getArgs();

const getApiFromBranch = async (branchName) => {
  try {
    const branch = args.branch || branchName || 'develop';
    const response = await fetch(`https://github.com/infermedica/component-library/raw/${branch}/components-api-lock.json`);
    const api = await response.json();
    return api['components-api'];
  } catch (err) {
    console.log('Api fetch error', err);
    return [];
  }
};
const saveDiffsInJsonFile = (diffs, outputPath, branchName, release) => {
  const outputFilePath = release
    ? '../components-api-lock.json'
    : `../${args.outputFile || outputPath || 'components-api-diffs.json'}`;
  const branch = args.branch || branchName || 'develop';
  const jsonPath = path.resolve(dirname, outputFilePath);
  if (!fs.existsSync(jsonPath)) {
    fs.appendFileSync(jsonPath, '');
  }
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8') || '{}');
  if (release) {
    content.release = {
      ...content.release,
      [`v${release}`]: diffs,
    };
  } else {
    content[`${branch}-branch`] = diffs;
  }
  fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2));
};
const isElementsEqual = (el1, el2) => JSON.stringify(el1) === JSON.stringify(el2);
const stringify = (el) => (typeof el === 'object' ? JSON.stringify(el) : el);
const getLoggerObject = (type, keys, changes) => ({
  type,
  keys,
  changes,
});
const groupDiffs = (diffs) => {
  const groupedDiffs = {};
  Object.keys(diffs).forEach((componentName) => {
    groupedDiffs[componentName] = diffs[componentName].reduce((acc, {
      type, changes, keys,
    }) => {
      const [
        apiKey,
        apiElement,
        ...restKeys
      ] = keys;
      const isChanged = type === 'changed';
      const diff = {};
      diff.name = apiElement || (isChanged ? apiKey : changes);
      diff.type = type;
      if (apiElement || isChanged) {
        const getChanges = Array.isArray(changes)
          ? `from ${stringify(changes[0])} to ${stringify(changes[1])}`
          : stringify(changes);
        const getKeys = restKeys.length ? `${restKeys.join(', ')}: ` : '';
        diff.description = `${getKeys}${getChanges || ''}`;
      }
      return {
        ...acc,
        [apiKey]: [
          ...(acc[apiKey] || []),
          diff,
        ],
      };
    }, {});
  });
  return groupedDiffs;
};
const print = (diffs) => {
  Object.keys(diffs).forEach((componentName) => {
    console.log(`► ${componentName}\n`);
    Object.keys(diffs[componentName]).forEach((apiEl) => {
      console.log(`▷ ${apiEl}`);
      const printDiffList = diffs[componentName][apiEl].map((diff) => ({
        ...diff,
        name: diff.name || apiEl,
      }));
      printCustomTable(printDiffList);
    });
  });
  console.log('🚀 Components API compared successfully');
};
const getArrayDiffs = (currArr, prevArr, compareByKey) => {
  const isEqual = (el1, el2) => (typeof currArr[0] === 'object'
    ? isElementsEqual(el1[compareByKey], el2[compareByKey])
    : isElementsEqual(el1, el2));
  const added = currArr.filter((currEl) => !prevArr.some(
    (prevEl) => isEqual(currEl, prevEl),
  )).map((currEl) => currEl[compareByKey]);
  const removed = prevArr.filter((prevEl) => currArr.every(
    (currEl) => !isEqual(currEl, prevEl),
  )).map(((currEl) => currEl[compareByKey]));
  const changed = currArr.filter((currEl) => !prevArr.some(
    (prevEl) => JSON.stringify(currEl) === JSON.stringify(prevEl),
  ) && !added.includes(currEl[compareByKey]));
  return {
    added,
    removed,
    changed,
  };
};
const getDiffs = (currEl, prevEl, keys = []) => {
  const diffs = [];
  const type1 = typeof currEl;
  const type2 = typeof prevEl;
  const hasArrayElements = Array.isArray(currEl) && Array.isArray(prevEl);
  const hasObjectElements = type1 === 'object' && type2 === 'object';
  const setDiff = (type, changes, keyList = keys) => {
    diffs.push(getLoggerObject(type, keyList, changes));
  };
  if (hasArrayElements) {
    const {
      added, removed, changed,
    } = getArrayDiffs(currEl, prevEl, 'name');
    added.forEach((name) => setDiff('added', name));
    removed.forEach((name) => setDiff('removed', name));
    changed.forEach((currChangedEl) => {
      const getChangedPrevEl = prevEl.find(({ name }) => currChangedEl.name === name);
      diffs.push(...getDiffs(currChangedEl, getChangedPrevEl, [
        ...keys,
        currChangedEl.name,
      ]));
    });
  } else if (hasObjectElements) {
    const currentKeys = Object.keys(currEl);
    currentKeys.forEach((key) => {
      if (!Object.hasOwn(prevEl, key)) {
        setDiff('added', currEl[key], [
          ...keys,
          key,
        ]);
      } else if (!isElementsEqual(currEl[key], prevEl[key])) {
        diffs.push(...getDiffs(currEl[key], prevEl[key], [
          ...keys,
          key,
        ]));
      }
    });
    const removedKeys = Object.keys(prevEl).filter((key) => !currentKeys.includes(key));
    removedKeys.forEach((key) => setDiff('removed', prevEl[key], [
      ...keys,
      key,
    ]));
  } else {
    setDiff('changed', [
      prevEl,
      currEl,
    ]);
  }
  return diffs;
};
const compareApi = async (branchName, outputPath, callback, release = '') => {
  const branchApi = await getApiFromBranch(branchName);
  const currentApi = JSON.parse(fs.readFileSync(pathComponentsApiFile, 'utf8') || '{}')['components-api'];
  let diffs = {};
  const {
    added, removed, changed,
  } = getArrayDiffs(currentApi, branchApi, 'displayName');
  removed.forEach((name) => {
    diffs[name] = [ getLoggerObject('removed', [ 'component' ]) ];
  });
  added.forEach((name) => {
    diffs[name] = [ getLoggerObject('added', [ 'component' ]) ];
  });
  changed.forEach((currentComponent) => {
    const getBranchComponent = branchApi.find(
      ({ displayName }) => displayName === currentComponent.displayName,
    );
    if (!isElementsEqual(currentComponent, getBranchComponent)) {
      diffs[currentComponent.displayName] = getDiffs(currentComponent, getBranchComponent);
    }
  });
  diffs = groupDiffs(diffs);
  if (callback && typeof callback === 'function') {
    diffs = callback(diffs);
  }
  if (release ? !release : !('silent' in args)) {
    print(diffs);
  }
  saveDiffsInJsonFile(diffs, outputPath, branchName, release);
  return diffs;
};

export default compareApi;

if (process.argv[1] === filename) {
  compareApi();
}
