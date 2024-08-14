import { AnchorProps } from "@/components/Navbar/Navbar"

function LoginButton() {
    return (
      <button>
        <a href="/api/auth/login" style={{ "--i": 6, "margin": 0 } as AnchorProps} className="text-[#05264E] mobile:font-[500] mobile:text-[1.1rem] desktop:font-normal desktop:text-base">
          Login
        </a>
      </button>
    )
  }
  
  export default LoginButton

  // color: #05264E;
  // font-weight: 500;
  // font-size: 1.1rem;