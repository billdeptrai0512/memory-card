/* eslint-disable react/prop-types */
const Header = ({RickAndMortyLogo, switchPage, score, bestScore}) => {
    return (
        <header>
            {/* header -> logo stand at return to startPage | best score state & current score state*/}
            <div className='headerContainer'>
                <img src={RickAndMortyLogo} alt="Rick and Morty Logo" className='logo' onClick={switchPage}/>
                <div className='scoreBoard'>
                    <div>Score: {score}</div>
                    <div>Best score: {bestScore}</div>
                </div>
            </div>
        </header>
    )
}

export default Header