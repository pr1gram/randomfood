export default function Navbar() {
    return(
<nav className="bg-white flex align-middle justify-center border-2 text-center z-20  ">
  <div className="flex justify-center">
    <div className=" border-r-2 w-20 text-center py-2 border-slate-900">
        <a href="/">Home</a>
    </div>
    <div className="  w-20 text-center py-2 border-slate-900">
        <a href="/search">Search</a>
    </div>
    <div className=" border-l-2 w-20 text-center py-2 border-slate-900">
        <a href="https://github.com/pr1gram/randomfood" target="_Blank">Github</a>
    </div>
    
  </div>
</nav>
    )



}