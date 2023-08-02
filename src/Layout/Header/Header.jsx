import "./Header.css"

export default function Header (){
    return(
        <header className="flex p-4 justify-between">
            <img src="https://i.ibb.co/YQHSXJX/GAMEFINDER.png" alt="" />
            <input type="text" placeholder="Search games..." class="w-50 rounded-md"/>
        </header>
    )
}