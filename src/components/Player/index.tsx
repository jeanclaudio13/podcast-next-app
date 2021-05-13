

import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        setIsPlaying,
    } = useContext(PlayerContext)//Passa o player pro app.provider
    
    useEffect(() => {
        if(!audioRef.current) {
            return;
        }

        if(isPlaying) {
            audioRef.current.play();
        }else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className = {styles.playerContainer}>
            <header>
                <img src ="/transmissao.png" alt="Tocando agora" 
                width="50" height="50"
                />
                <strong>Tocando agora</strong>
            </header>

            { episode? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast pra ouvir</strong>
                </div>
            ) }
            

            <footer className={!episode? styles.empty: ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#04d361'}}//Barra progresso
                                railStyle={{ backgroundColor: '#9f75ff'}}//Barra sem progresso
                                handleStyle={{ borderColor: '#04d361', borderWidth: 3}}//Bolinha de arrastar
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        ) }
                    </div>
                    <span>00:00</span>
                </div>


                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                )}


                <div className={styles.buttons}>
                    
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.png" alt="Embaralhar" width="42" height="42"/>
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/anterior.png" alt="Tocar anterior" width="42" height="42"/>
                    </button>

                    <button 
                        type="button" 
                        className ={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        { isPlaying
                            ? <img src="/botao-de-pausa.png" alt="Tocar" width="42" height="42"/>
                            : <img src="/botao-play.png" alt="Tocar" width="42" height="42"/> 
                        }
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/botao-pular.png" alt="Tocar próxima" width="42" height="42"/>
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/repetir.png" alt="Repetir" width="42" height="42"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}