const logger = new LogTalk();

// Default methods
// You can use it just like `console.log`
logger.debug('This is debug');
logger.info('This is info', { message: 'Hello' });
logger.success('This is success');
logger.warn('This is warn');
logger.error('This is error', new Error('There is something wrong'));

// Define your own method
logger.setMethod({ name: 'foo', color: 'yellow' });
logger.foo('Foo');

// You also can override default methods
logger.setMethod({ name: 'info', color: 'red' });
logger.info('Now the label is red');

// Observe log messages
logger.onMatch(/bar/, function() {
  logger.debug('matched');
});

logger.debug('foo bar baz');
