import {createLogger, transports, format} from 'winston';
const {combine, timestamp, printf} = format;

const mapArgToString = (arg: any) => {
  if (arg instanceof Object) {
    return JSON.stringify(arg);
  }
  return arg;
}

const myFormat = printf(({ level, message, timestamp, file, ...data }) => {
  // https://github.com/Microsoft/TypeScript/issues/24587#issuecomment-460650063
  const spath: string = Symbol.for('splat') as unknown as string;
  const args = data[spath];
    const stringArgs = args ? args.map(mapArgToString).join(' ') : '';
    return `${timestamp} [${level.toUpperCase()}] ${message} ${stringArgs}(${file || 'unknown'})`;
  });

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
      new transports.Console(),
    ]
});

export default logger;