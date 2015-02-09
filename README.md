A pre-configured logger based on [Winston](https://github.com/winstonjs/winston) that includes a [POSIX-based syslog](https://github.com/AntonNguyen/winston-posix-syslog) transport and the standard `stdout` console. 

```javascript
var logger = (new LF('Other')).logger;
    logger.transports.posixSyslog.level = 'debug';
    
logger.info('This is my object %j', {obj: null});
```