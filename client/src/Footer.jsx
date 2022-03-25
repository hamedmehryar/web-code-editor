import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="bg-gray-200 h-50 text-center lg:text-left">
      <div className="text-gray-700 text-center p-4">
        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Copyright: 
        <a className="text-gray-800" href="https://tailwind-elements.com/"> Ubility</a>
      </div>
    </footer>
  );
}

export default Footer;
