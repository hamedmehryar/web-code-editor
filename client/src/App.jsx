import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './App.css'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/dracula.css'
import CodeMirror, {} from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import axios from 'axios' 

function App() {
  const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost' : ''
  const langs = [
    {key: 'javascript', value:'JavaScript'},
    {key: 'python', value: 'Python'},
  ]

  const [code, setCode] = useState('')
  const [lang, setLang] = useState(langs[0].key)
  const [output, setOutput] = useState()

  const changeLang = (value) => {
    setLang(value)
  }

  const runCode = () => {
    if (code) {
      if (lang === 'python') {
        processPython()
      } else if (lang === 'javascript') {
        processJavascript()
      } 
    } else {
      alert("empty code")
    }
    
  }

  const processPython = () => {
    axios
    .post(`${apiUrl}/python`, { code })
    .then(({ data }) => {
      setOutput(data)
    })
    .catch((err) => {
      console.err(err)
      alert("Unexpected error happened!")
    })
  }

  const processJavascript = () => {
    axios
    .post(`${apiUrl}/javascript`, { code })
    .then(({ data }) => {
      setOutput(data)
    })
    .catch((err) => {
      console.log(err)
      alert("Unexpected error happened!")
    })
  }

  const processOutput = (output) => {
    return String(output)?.split("\n").map(function(item, idx) {
      return (
        <span key={idx}>
            {item}
            <br/>
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar langs={langs} changeLang={changeLang} runCode={runCode}/>
      <div className="flex flex-col md:flex-row flex-grow bg-gray-200">
        <div className="md:w-1/2 bg-gray-300 m-5 rounded">
        <p className="p-2">Write your code here:</p>
          <div className="m-5">
            <CodeMirror
                  value={code}
                  options={{
                    theme: 'dracula',
                    keyMap: 'sublime',
                    mode: lang,
                  }}
                  onChange={(editor, data, value) => {
                    setCode(editor.getValue());
                  }}
                  extensions={[javascript({ jsx: true })]}
                  className="w-96 h-80"
                />
          </div>
        </div>
        <div className="md:w-1/2 bg-gray-300 m-5 rounded">
        <p className="p-2">You code result:</p>
          <div className="m-5 p-5 bg-transparent rounded">
          {
            Array.isArray(output)
            ? output.map((item) => {
              return processOutput(item)
            })
            : processOutput(output)
          }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
