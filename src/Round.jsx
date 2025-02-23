/* eslint-disable react/prop-types */


const Round = ({round, numberOfRound}) => {

    return (
        <div className='round'>
            {round} / {numberOfRound}
        </div>
    )
}

export default Round