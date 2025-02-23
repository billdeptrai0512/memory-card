/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react'
import Card from './Card'

//TOFIX : still create 2 duplicate image.
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const shuffleCards = (characters, alreadySelectedCharacters, numberOfCard) => {
    let unselected = characters.filter(c => !alreadySelectedCharacters.some(a => a.name === c.name));
    
    if (unselected.length === 0) unselected = [...characters]; // Reset if all are selected
    
    const selected = new Set();
    selected.add(shuffle(unselected)[0]); // Ensure at least one new character

    shuffle(characters).forEach(c => {
        if (selected.size < numberOfCard) selected.add(c);
    });

    return [...selected];  // Return instead of updating state
};

const CardPanel = ({ characters, numberOfCard, increaseScore, resetScore, increaseRound, resetRound, setIsEnd, isClicked, setIsClicked}) => {
    const [selectedCharacters, setSelectedCharacters] = useState(shuffle(characters).slice(0, numberOfCard));
    const [alreadySelectedCharacters, setAlreadySelectedCharacters] = useState([]);
    // const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {

        if (!isClicked) {
            setSelectedCharacters(shuffleCards(characters, alreadySelectedCharacters, numberOfCard));
        }
        
    }, [isClicked])

    function selectCard(character) {

        if (isClicked) return

        if (alreadySelectedCharacters.some(item => item.name === character.name)) {
            resetScore();
            resetRound();
            setAlreadySelectedCharacters([]);
            return setIsEnd(true)
        }

        setIsClicked(true)

        setAlreadySelectedCharacters([...alreadySelectedCharacters, character])
        increaseRound();
        increaseScore();
        setTimeout(() => {
            setIsClicked(false); 
        }, 750);

    }

    return (
        <div className='cardPanel'>
            {selectedCharacters.map((character, index) => (
                <Card key={index} character={character} isClicked={isClicked} selectCard={selectCard} />
            ))}
        </div>
    );
};


export default CardPanel