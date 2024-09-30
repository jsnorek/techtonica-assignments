import { Button } from "primereact/button";
import { Card } from "primereact/card";

function GameDetailsModal({ setGameDetailsVisible, gameDetails }) {

    const turnGameDetailsVisibleOff = () => {
        setGameDetailsVisible(false);
    };

    const details = gameDetails && gameDetails.length > 0 ? gameDetails[0] : null;

    console.log('clicked game details array', gameDetails);
    console.log('clicked game details object', details);

    return (
        <div className="gameDetailsModal">
            <h2>Game Details</h2>
            <div className="game-details-card">
                <Card>
                    {details ? (
                        <>
                            <p>Title: {details.title}</p>
                            <p>Genre: {details.genre}</p>
                            <p>Platform: {details.platform}</p>
                            <p>Release Date: {details.release_date}</p>
                            <p>Developer: {details.developer}</p>
                        </>
                    ) : (
                        <p>No game details available</p>
                    )}

                </Card>
                <Button label="Back" onClick={turnGameDetailsVisibleOff}/>
            </div>
        </div>
    )
};
export default GameDetailsModal;