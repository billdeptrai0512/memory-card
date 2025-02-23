/* eslint-disable react/prop-types */
import RickAndMortyLogo from '../assets/Rick&Morty_Logo.png'
import Title from '../assets/Title.png'
import Easy from '../assets/easy.png'
import Hard from '../assets/hard.png'

function StartPage({switchPage, chooseMode}) {

    return ( 
      <div className='startPage'>

        <img src={RickAndMortyLogo} alt="Rick and Morty Logo" className='logo' />
        <img src={Title} alt="Memory Game" className='game' />

        <div className='mode'>
          <img src={Easy} onClick={() => {switchPage; chooseMode('easy')}} className='easy'/>
          <img src={Hard} onClick={() => {switchPage; chooseMode('hard')}} className='hard'/>
        </div>
      </div>
    )
  
}

export default StartPage