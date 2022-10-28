const getArgs = () => (process.argv.slice(2).reduce((acc, arg) => {
  const [
    key,
    value,
  ] = arg.split('=');
  return {
    ...acc,
    [key.replace('--', '')]: value,
  };
}, {}));

module.exports = getArgs;
