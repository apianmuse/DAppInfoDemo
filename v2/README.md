# README

web3 1.0版本

ganache



因为浏览器不支持nodejs的require，需要对index.js进行一下转换

```
npm install -g browserify
browserify index.js -o dist.js
```

html中引入dist.js

