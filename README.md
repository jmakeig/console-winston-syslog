A pre-configured logger based on [Winston](https://github.com/winstonjs/winston) that includes a [POSIX-based syslog](https://github.com/AntonNguyen/winston-posix-syslog) transport and the standard `stdout` console. 

```javascript
var LoggerFactory = require('console-winston-syslog').LoggerFactory;
var logger = (new LoggerFactory('Other')).logger;
    logger.transports.posixSyslog.level = 'debug';
    
logger.info('This is my object %j', {obj: null});
```