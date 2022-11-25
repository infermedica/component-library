const getArgs = () => (process.argv.slice(2).reduce((args, arg) => {
  const [
    key,
    value,
  ] = arg.split('=');
  return {
    ...args,
    [key.replace('--', '')]: value,
  };
}, {}));

export default getArgs;
