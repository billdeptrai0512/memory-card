/* eslint-disable react/prop-types */
import {useState} from 'react'
import RickAndMortyLogo from '../assets/Rick&Morty_Logo.png'
import Lose from '../assets/resultLose.png'
import Win from '../assets/resultWin.png'
import Restart from '../assets/restart.png'

import Header from './Header';
import CardPanel from './CardPanel';
import Round from './Round';


function PlayPage({switchPage, chooseMode ,mode, characters}) {

    const numberOfUniqueCard = mode === 'easy' ? 9 : 15
    const numberOfCard = mode === 'easy' ? 3 : 5
    const numberOfRound = mode === 'easy' ? 5 : 10

    const UniqueCharater = characters.slice(0, numberOfUniqueCard)
    
    const [round, setRound] = useState(0)
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [isEnd, setIsEnd] = useState(false)
    const [isWin, setIsWin] = useState(null)
    const [isClicked, setIsClicked] = useState(false);

    const restartGame = () => {

        chooseMode(mode)

        setIsClicked(true)

        setIsEnd(false)

        setTimeout(() => {
            setIsClicked(false); 
        }, 750);

    }

    const increaseScore = () => {

        setScore(score + 1)

        if (bestScore === score) {
            saveBestScore(score + 1)
        }

        if (score + 1 === numberOfRound) {
            resetScore()
            resetRound()
            setIsEnd(true)
            return setIsWin(true)
        }
    }

    function increaseRound() {

        if (round > numberOfRound) return
        setRound(round + 1)
    }

    function resetRound() {
        setRound(0)
    }

    function resetScore() {
        setScore(0)
    }

    function saveBestScore(score) {
        setBestScore(score)
    }

    //TODO: Win/Lose screen - restart button

    const ResultBoard = ({isWin}) => {

        return (
            <>  
                {isWin ? 
                        <div className='endGame' style={{opacity: 1}}>
                            <img src={Win} alt="winning" className='win'/> 
                        </div>
                        :
                        <div className='endGame' style={{opacity: 1}}>
                            <img src={Lose} alt="winning" className='lose'/>
                            <img src={Restart} alt="winning" className='restart' onClick={restartGame}/>
                        </div> 
                }

                <div className='overlay' style={{opacity: 0.6}}></div>

            </>
        )

    }

    return (
        <>  
            <Header 
                RickAndMortyLogo ={RickAndMortyLogo}
                switchPage = {switchPage}
                score = {score}
                bestScore = {bestScore}
            />
            <div className='playPage'>
                <CardPanel
                    characters={UniqueCharater}
                    numberOfCard={numberOfCard}
                    score={score}
                    increaseScore={increaseScore}
                    resetScore={resetScore}
                    round={round}
                    increaseRound={increaseRound}
                    resetRound={resetRound}
                    setIsEnd={setIsEnd}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}/>
                {/* isEnd === true then show up Result Board */}
                {isEnd ? <ResultBoard isWin={isWin} /> : null}
                <Round 
                    round={round} 
                    numberOfRound={numberOfRound}
                />
            </div>
        </>

    )
}

export default PlayPage