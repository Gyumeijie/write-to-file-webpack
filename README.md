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
- override          
`<boolean> Default: true`, if set to false, no data will be written to an exsited file 
- encoding     
`<string> | <null> Default: 'utf8'`
- mode       
`<integer> Default: 0o666`
- flag        
`<string> Default: 'w'`

For more information about `encoding`, `mode`, and `flag` please refer to [node writeFile](https://nodejs.org/docs/latest-v9.x/api/fs.html#fs_fs_writefilesync_file_data_options).