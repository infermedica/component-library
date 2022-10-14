const fs = require('fs');
const path = require('path');

const pathComponentsApiFile = path.resolve(__dirname, '../components-api-lock.json');

const getApiFromDevelop = async () => {
  try {
    const response = await fetch('https://github.com/infermedica/component-library/raw/develop/components-api-lock.json');
    const api = await response.json();
    return api['components-api'];
  } catch (err) {
    console.log('Api fetch error', err);
    return [];
  }
};
const isElementsEqual = (el1, el2) => JSON.stringify(el1) === JSON.stringify(el2);
const getLoggerObject = (type, keys, changes) => ({
  type,
  keys,
  changes,
});
const logger = (diffs) => {
  const colors = {
    removed: '\x1b[31m',
    added: '\x1b[32m',
    changed: '\x1b[33m',
  };
  Object.keys(diffs).forEach((name) => {
    console.log();
    diffs[name].forEach(({
      type, keys, changes,
    }) => {
      const getKeys = Array.isArray(keys) ? keys.join(' ➡️ ') : keys;
      const getChanges = Array.isArray(changes)
        ? `from ${JSON.stringify(changes[0])} to ${JSON.stringify(changes[1])}`
        : JSON.stringify(changes) || '';
      console.log(colors[type], `${name} ${type}: ${getKeys} ${getChanges}`);
    });
  });
};
const getArrayDiffs = (currArr, prevList, compareByKey) => {
  const isEqual = (el1, el2) => (typeof currArr[0] === 'object'
    ? isElementsEqual(el1[compareByKey], el2[compareByKey])
    : isElementsEqual(el1 === el2));
  const added = currArr.filter((currEl) => !prevList.some(
    (prevEl) => isEqual(currEl, prevEl),
  )).map((currEl) => currEl[compareByKey]);
  const removed = prevList.filter((prevEl) => currArr.every(
    (currEl) => !isEqual(currEl, prevEl),
  )).map(((currEl) => currEl[compareByKey]));
  const changed = currArr.filter((currEl) => !prevList.some(
    (prevEl) => JSON.stringify(currEl) === JSON.stringify(prevEl),
  ) && !added.includes(currEl[compareByKey]));
  return {
    added,
    removed,
    changed,
  };
};
const compareElements = (currEl, prevEl, keys = []) => {
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
      const getChangedPrevEl = prevEl.find((changedPrevEl) => currChangedEl.name === changedPrevEl.name);
      diffs.push(...compareElements(currChangedEl, getChangedPrevEl, [
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
        diffs.push(...compareElements(currEl[key], prevEl[key], [
          ...keys,
          key,
        ]));
      }
    });
    const removedKeys = Object.keys(prevEl).filter((key) => !currentKeys.includes(key));
    removedKeys.forEach((key) => setDiff('removed', prevEl[key]));
  } else if ((type1 !== type2 || currEl !== prevEl)) {
    setDiff('changed', [
      prevEl,
      currEl,
    ]);
  }
  return diffs;
};

const compareApi = async (callback) => {
  const developApi = await getApiFromDevelop();
  const currentApi = JSON.parse(fs.readFileSync(pathComponentsApiFile, 'utf8') || '{}')['components-api'];
  let diffs = {};
  const {
    added, removed, changed,
  } = getArrayDiffs(currentApi, developApi, 'displayName');
  removed.forEach((name) => {
    diffs[name] = [ getLoggerObject('removed', 'component') ];
  });
  added.forEach((name) => {
    diffs[name] = [ getLoggerObject('added', 'component') ];
  });
  changed.forEach((currentComponent) => {
    const getDevelopComponent = developApi.find(
      (developComponent) => developComponent.displayName === currentComponent.displayName,
    );
    if (JSON.stringify(currentComponent) !== JSON.stringify(getDevelopComponent)) {
      diffs[currentComponent.displayName] = compareElements(currentComponent, getDevelopComponent);
    }
  });
  if (callback && typeof callback === 'function') {
    diffs = callback(diffs);
  }
  logger(diffs);
};

module.exports = compareApi;

if (require.main === module) {
  compareApi();
}
