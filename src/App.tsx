import React, {useState} from 'react';
import './App.css';
import {ControlBarProps, SongComponentProps, SongProps, SongTitleType, SongType} from './types.ts';
import {songs} from './defaults.ts';




const SongTitle = ({title, author, isActive, onClick, id}: SongTitleType) =>
{

    return <div style={{color: isActive ? 'lightcoral' : '', cursor: 'pointer'}}>
        <div key={id}
             data-testId={id}
             onClick={onClick}>{title}</div>
        <p>{author}</p>
    </div>;
};

const usePlayerContext = () =>
{
    const [currentSong, setCurrentSong] = useState<SongType>();

    const onTitleClick = (e: React.MouseEvent<HTMLDivElement>) =>
    {
        const currentClickedSongId = e.currentTarget.getAttribute('data-testId');
        const currentSong = songs.find(song => song.id === currentClickedSongId);
        setCurrentSong(currentSong);
    };


    const onButtonClick = (e: React.MouseEvent<HTMLDivElement>, songId: string) =>
    {
        const songIndex = songs.findIndex(song => song.id === songId);

        const nextSong = songs.find((_song, index) => index === songIndex + 1);
        const prevSong = songs.find((_song, index) => index === songIndex - 1);


        const buttonRef = e.target as HTMLDivElement;
        const buttonType = buttonRef.getAttribute('data-testid');

        switch (buttonType)
        {
            case 'next':
                if (nextSong)
                {
                    setCurrentSong(nextSong);
                }

                break;
            case 'previous':
                if (prevSong)
                {
                    setCurrentSong(prevSong);
                }
                break;

            default:
                break;

        }
    };

    return {
        currentSong,
        onTitleClick,
        onButtonClick
    };
};

const Song: React.FC<SongProps> = ({key, children}) =>
{
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        border: '1px solid blue'
    }}
                key={key}>{children}</div>;

};
const ControlBar: React.FC<ControlBarProps> = ({currentSong, onButtonClick}) => <div style={{
    marginTop: '50px'
}}

                                                                                     onClick={(e) => onButtonClick(e, currentSong?.id)}>
    <div style={{
        margin: '10px'
    }}><strong>{currentSong?.title}</strong> - <i>{currentSong?.author}</i></div>
    <button data-testId="previous">Previous
    </button>
    <button data-testId="next">Next
    </button>
    <button data-testId="replay">Replay</button>
</div>;


const Songs: React.FC<SongComponentProps> = ({onTitleClick, currentSong}) => songs.map((song) =>
{
    return <Song key={song.id}>
        <SongTitle id={song.id}
                   title={song.title}
                   onClick={onTitleClick}
                   author={song.author}
                   isActive={currentSong?.id === song.id}
        />
    </Song>;
});

const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({children}) => children;

function App()
{
    const {currentSong, onTitleClick, onButtonClick} = usePlayerContext();

    return (
        <PlayerProvider>
            <Songs onTitleClick={onTitleClick}
                   currentSong={currentSong as SongType}/>
            <ControlBar currentSong={currentSong as SongType}
                        onButtonClick={onButtonClick}/>
        </PlayerProvider>
    );
}

export default App;
