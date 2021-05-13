import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <header className={styles.headerContainer}>
            <img src="/podcast.png" alt="Podcastr" 
            width="100" height="100"
            />

            <h1>ToCast do Raul</h1>

            <p>O podcast da Toca!</p>

            <span>{currentDate}</span>

        </header>
    );
}