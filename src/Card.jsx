/* eslint-disable react/prop-types */
import { useState , useEffect} from 'react';
import Banner from '../assets/newbanner.png'
import BehindBanner from '../assets/newbehindbanner.png'

const Card = ({character, isClicked, selectCard}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    })

    useEffect(() => {
        if (!isHovered) {
            setStyle({
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                transition: "transform 0.3s ease-out",
            });
        };
    }, [isHovered])

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        const rotateX = (mouseY / (rect.height / 2)) * 15; // Adjust sensitivity
        const rotateY = (-mouseX / (rect.width / 2)) * 15;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
            transition: "transform 0.1s linear",
        });
    };
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className={`title ${isHovered ? 'hovered' : ''}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={`card ${isClicked ? `flipped` : ``}` } onClick={() => selectCard(character)}>
                <div className='card-inner'>
                    <div className='card-front'>
                        <div className='card-content'>
                            <img src={character.image} alt={character.name} className='character-image' />
                            <div className='name'>{character.name}</div>
                        </div>
                        <img src={Banner} alt='Banner' className='banner' />
                    </div>
                    <div className='card-back'>
                        <img src={BehindBanner} alt='BehindBanner' className='behindbanner'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Card