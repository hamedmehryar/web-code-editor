import Logo from './logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function Navbar({langs, changeLang, runCode}) {
  const handleChange = (value, selectOptionSetter) => {
    selectOptionSetter(value)
  }

  return (
    <nav className="h-50 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <a href className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
        </a>
        <div className="sm:block sm:w-auto sm:block sm:w-auto align-middle" id="mobile-menu">
          <ul className="flex flex-row sm:flex-row sm:space-x-8 sm:mt-0 sm:text-sm sm:font-medium">
            <li>
              <div className="inline-block relative w-32 mr-5">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={e => handleChange(e.target.value, changeLang)}>
                  { langs.map((item) => <option value={item.key}>{item.value}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </li>
            <li>
              <button className="block py-2 pr-4 pl-3 text-white rounded dark:text-white bg-brand hover:bg-brandDark"onClick={runCode} ><FontAwesomeIcon icon={faPlay} /> Run</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
