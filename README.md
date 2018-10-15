# Write to file plugin for webpack(v4)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a simple webpack plugin for writing data to file.

# Installation
`npm install --save-dev write-to-file-webpack`

# Usage
The data to be written can be either a simple javascript variable, or a function which returns some data. 

```javascript
const WriteToFilePlugin = require('write-to-file-webpack');

module.exports = {
   ...
   plugins: [
      new WriteToFilePlugin({ 
         filename: 'path/to/write/file', 
         data: function () {
            return "console.log('write to file')"
         }
     })
   ]
   ...
}
```


```javascript
const WriteToFilePlugin = require('write-to-file-webpack');

module.exports = {
  ...
  plugins: [
     new WriteToFilePlugin({ 
        filename: 'path/to/write/file', 
        data: 'console.log("write to file")'
      })
  ]
  ...
}
```

# Support
`node >= 6` and `webpack >= 4`

# List of options:
- filename
- data