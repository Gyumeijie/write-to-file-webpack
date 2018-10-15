var path = require('path');
var fs = require('fs');

/*
 * Credits to https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
 * Create directory recursively and support node < v10.12, from which version fs.mkdir support natively 
 * `recursive` option
 */ 
var mkdir = function (targetDir) {
   var sep = path.sep;
   var initDir = path.isAbsolute(targetDir) ? sep : '';

   return targetDir.split(sep).reduce(function (parentDir, childDir) {
      var curDir = path.resolve(parentDir, childDir);

      try {
         fs.mkdirSync(curDir);
      } catch (err) {
         // If curDir already exists!
         if (err.code === 'EEXIST') { 
            return curDir;
         }

         // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
         if (err.code === 'ENOENT') { 
            // Throw the original parentDir error on curDir `ENOENT` failure.
            throw new Error('EACCES: permission denied, mkdir' +  parentDir);
         }

         var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
         if (!caughtErr || caughtErr && targetDir === curDir) {
            // Throw if it's just the last created dir.
            throw err; 
         }
      }
        
      return curDir;
   }, initDir);
}


var WriteToFilePlugin = (function () {

   function WriteToFilePlugin(options) {
      if (typeof options !== 'object') {
         throw new Error('options should be an object!');
      }

      if (options.filename === undefined) {
         throw new Error('filename is required!');
      }

      var basename = path.basename(options.filename);
      if ( basename === '.' || basename === '..' || basename === '') {
         throw new Error('illegal operation on a directory!');
      }

      this.options = options;
   }

   WriteToFilePlugin.prototype.apply = function(compiler) {
      var that = this;

      compiler.hooks.done.tap('Write To File Plugin', function() {
         var data = that.options.data;
         var dir = path.dirname(that.options.filename);

         if (!fs.existsSync(dir)) {
             mkdir(dir);
         }

         if (typeof data === 'function') {
            fs.writeFileSync(that.options.filename, data());
         } else {
            fs.writeFileSync(that.options.filename, data);
         }
      });
   }

   return WriteToFilePlugin;
 }());
 
 module.exports = WriteToFilePlugin;