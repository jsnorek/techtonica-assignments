import { Button } from "primereact/button";
import { Card } from "primereact/card";

function GameDetailsModal({ setGameDetailsVisible, gameDetails }) {

    // Hide game details
    const turnGameDetailsVisibleOff = () => {
        setGameDetailsVisible(false);
    };

    // Making sure gameDetails exists for testing
    const details = gameDetails && gameDetails.length > 0 ? gameDetails[0] : null;

    console.log('clicked game details array', gameDetails);
    console.log('clicked game details object', details);

    return (
        <div className="gameDetailsModal" data-testid="game-details-modal">
            <h2>Game Details</h2>
            <div className="game-details-card">
                <Card>
                    {details ? (
                        <>
                            <p>Title: {details.title}</p>
                            <p>Genre: {details.genre}</p>
                            <p>Platform: {details.platform}</p>
                            <p>Release Date: {new Date(details.release_date).toLocaleDateString()}</p>
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