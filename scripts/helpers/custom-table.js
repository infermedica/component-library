const { Console } = require('node:console');
const { Transform } = require('node:stream');

const printCustomTable = (input) => {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk); } });
  const logger = new Console({ stdout: ts });
  logger.table(input);
  const table = (ts.read() || '').toString();
  let result = '';
  table.split(/[\r\n]+/).forEach((row) => {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  });
  console.log(result);
};

module.exports = printCustomTable;

if (require.main === module) {
  printCustomTable();
}
