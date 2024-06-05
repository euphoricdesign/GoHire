function LoginButton() {
    return (
      <button className="w-full bg-purple-600">
        <a href="/api/auth/login" className="font-medium">
          Login
        </a>
      </button>
    )
  }
  
  export default LoginButton