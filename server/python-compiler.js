const PythonShell = require("python-shell").PythonShell

module.exports = (callback) => {
    PythonShell.run(
        filePath,
        {
          mode: "text",
          pythonOptions: ["-u"],
        },
        (err, results) => {
          let output
          if(err) {
            output = err.message
          } else {
            output = results
          }
    
          output = Array.isArray(output) ? output.join('\n') : output
          callback(output)
        }
      )
}