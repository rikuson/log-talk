# log-talk

Simple logger designed for browser and node.

- Line number where a bug occured (only for browser console now)
- Timestamp when a bug occured
- Highlight
- Observe log message
- Customizable

## Usage

```JavaScript
const LogTalk = require('log-talk');
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
```

<!-- Screenshot -->

## Log level

You can hide low level log by doing like this.

```JavaScript
const LogTalk = require('log-talk');
const minLevel = 3;
const logger = new LogTalk(minLevel);
```

So logger only displays logs which is level 3 or more.

### Default log level

| name    | level |
|:--------|------:|
| debug   |     1 |
| info    |     2 |
| success |     3 |
| warn    |     4 |
| error   |     5 |

## How to highlight

To highlight, you can do this.

```JavaScript
const LogTalk = require('log-talk');
const logger = new LogTalk();
logger.setMethod({ name: 'foo', color: 'yellow' });
logger.foo('This log should be yellow.');
```

**NOTE: IE ignores color.**

### Default color

These are defined colors.

| name    | color   |
|:--------|:--------|
| debug   | default |
| info    | blue    |
| success | green   |
| warn    | yellow  |
| error   | red     |

It's not flexible and few though.  
I will improve it soon.

## How to handle error message

Here's good example.  
Google Maps API throw error by using `console.error` when you use api more than limit.  
So you can do this.

```JavaScript
var tmp = console.error;
console.error = function() {
  logger.error(arguments);
  tmp.apply(this, arguments);
}

logger.onMatch(/api-billing/, function() {
  // Do something
});
```

## Browser Support

- IE@11
- Edge
- Firefox
- Chrome
- Safari

