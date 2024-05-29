import "./../../utils/Navbar.css";

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  style?: React.CSSProperties & { "--i"?: number };
}

const Navbar: React.FC = () => {
  return (
    <header className="header py-4 px-10">
      <div className="flex items-center">
        <a href="#" className="logo mr-10">
          Logo
        </a>

        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i id="menu-icon" className="icon">
            &#9776;
          </i>
          <i id="close-icon" className="icon">
            &#10005;
          </i>
        </label>
        <nav className="navbar">
          <a className="text-sm" href="#" style={{ "--i": 0 }} {...({} as AnchorProps)}>
            Home
          </a>
          <a className="text-sm" href="#" style={{ "--i": 1 }} {...({} as AnchorProps)}>
            Jobs
          </a>
          <a className="text-sm" href="#" style={{ "--i": 2 }} {...({} as AnchorProps)}>
            Blog
          </a>
          <a className="text-sm" href="#" style={{ "--i": 3 }} {...({} as AnchorProps)}>
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <div className="hidden md:flex md:items-center">
          <a className="">Sign in</a> <div className="w-px h-4 bg-gray-600 mx-1.5"></div>{" "}
          <a>Dashboard</a>
        </div>
        <button className="mt-0 mb-5 text-sm border-none w-28 p-2.5 h-10 rounded text-white font-medium bg-[#5049E5] cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-80 md:mb-0 md:block hidden">
          Post a job
        </button>
      </div>
    </header>
  );
};

export default Navbar;
