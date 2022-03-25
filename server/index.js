const fs = require("fs")
const os = require("os")
const { v4: uuidv4 } = require('uuid');
const cors = require("cors")
const express = require("express")
const { spawn } = require('child_process');

const { NodeVM, VMScript } = require('vm2');

const PORT = 80
const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.post("/python", (req, res) => {
  const filePath = `${os.tmpdir()}/${uuidv4()}.py`
  fs.writeFileSync(filePath, req.body.code)
  const vm = new NodeVM({
    require: {
      external: true,
    }
  });
  const script = new VMScript(`const filePath = "${filePath}"\n${fs.readFileSync(`${__dirname}/python-compiler.js`)}`);
  const result = vm.run(script)
  result((output) => {
    res.send(output)
  })
})

app.post("/javascript", async (req, res) => { //permission khatta
  const filePath = `${os.tmpdir()}/${uuidv4()}.js`
  const code = req.body.code.split('\n').filter(function(line){ 
    return line.indexOf( "require" ) == -1 && line.indexOf( "import " );
  }).join('\n')
  fs.writeFileSync(filePath, code)
  const vm = new NodeVM({
    require: {
      external: true,
      builtin: ['child_process'],
    }
  });
  const script = new VMScript(`
      const { spawn } = require('child_process');
      module.exports = (callback) => {
        const process = spawn('node', ['${filePath}']);
        let output = ''
        process.stdout.on('data', (data) => {
          output += data
        });
        
        process.stderr.on('data', (data) => {
          output += data
        });
        
        process.on('close', (code) => {
          callback(output)
        });
      }
  `);
  const result = vm.run(script)
  result((output) => {
    res.send(output)
  })
})
