import React from 'react';

export type SongType = {
    id: string,
    title: string,
    author: string
}

export type SongTitleType = SongType & {
    isActive: boolean,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type SongProps = {
    key: string
    children: React.ReactNode,
}
export type SongComponentProps = Omit<ControlBarProps, 'onButtonClick'> & {
    onTitleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type ControlBarProps = {
    currentSong: SongType,
    onButtonClick: (e: React.MouseEvent<HTMLDivElement>, id: string) => void
}


