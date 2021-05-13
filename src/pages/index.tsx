import { GetStaticProps, GetServerSideProps } from 'next';
import Image from 'next/image';

import { api } from '../services/api';
import Link from 'next/link';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {convertDurationToTimeString} from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

/*SPA - Single Page Application
   Infos não indexaveis, dados carregados somente no JS do browser
*/ 

// import { useEffect } from "react"

// export default function Home() {
//   useEffect(() => {// Dispara algo em efeito (o que, quando)
//     fetch('http://localhost:3333/episodes')
//       .then(response => response.json())
//       .then(data => console.log(data))
//   }, [])//Array vazio carrega useEffect 1x quando o componente for exibido em tela


//   return (
//    <h1>Index</h1>
//   )
// }


/*SSR - Server Side Rendering
 Não há requisição no browser, quando a página carrega, os dados já estão lá
  A req ocorre no Next-Server 
  É mais útil se há muita atualização dos dados
*/ 

// type Episode ={
//   id: string;
//   title: string;
//   thumbnail: string;
//   members: string;
//   publishedAt: string;
//   duration: Number;
//   durationAsString: string;
//   url: string;
// }

// type HomeProps = {
//   //episodes: Episode[]; // Ou Array<Episode>
//   latestEpisodes: Episode[];
//   allEpisodes: Episode[];
// }

// export default function Home({ latestEpisodes,  allEpisodes }: HomeProps) {
//   return (
//     <div className ={styles.homepage}>
//       <section className={styles.latestEpisodes}>
//         <h2>Últimos lançamentos</h2>

//         <ul>
//           {latestEpisodes.map(episode => {
//             return(
//               <li>
//                 <a href="">{episode.title}</a>
//               </li>
//             )
//           })}
//         </ul>

//       </section>
//       <section className={styles.allEpisodes}>

//       </section>
//     </div>    
//   )
// }

// export async function getServerSideProps() { //Roda o getProps e passa pra Home
//   //const response = await fetch('http://localhost:3333/episodes? _limit=12&_sort=published_at&_order=desc')
//   //const data = await response.json()

//   //Utilizando biblioteca Axios
//   const { data } = await api.get('episodes', {
//     params: {
//       _limit: 12,
//       _sort: 'published_at',
//       _order: 'desc'
//     }
//   }) 
  
//   const episodes = data.map(episode => {
//     return {
//       id: episode.id,
//       title: episode.title,
//       thumbnail: episode.thumbnail,
//       members: episode.mebers,
//       publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
//       duration: Number(episode.file.duration),
//       durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
//       description: episode.description,
//       url: episode.file.url,
//     };
//   })

//   const latestEpisodes = episodes.slice(0,2);
//   const allEpisodes = episodes.slice(2, episodes.lenght);

//   return {
//     props: {
//       episodes: episodes,
//     },
//   }   
// }


/*SSG - Static Site Generation
  Se não há muitas mudanças nos dados
  Serve o HTML gerado pelo para o primeiro usuário a todos os outros
  Não necessita de ir na API toda vez buscar os dados  
*/
type Episode ={
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  //episodes: Episode[]; // Ou Array<Episode>
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes,  allEpisodes }: HomeProps) {
  const { play } = useContext(PlayerContext)//Passa o player pro app.provider
  
  return (
    <div className ={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return(
              <li key={episode.id/*Map exige Key no 1º item da list*/}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`/*Carrega somente o que mudou na pag*/}>
                    <a>{episode.title}</a>
                  </Link>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => play(episode)} className ={styles.playButton} >
                  <img src="/botao-green.png" alt="Tocar episódio" width="42" height="42"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Datas</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td style={{width: 100}}>
                      <Image 
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`/*Carrega somente o que mudou na pag*/}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{width:100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                        <img src="/botao-green.png" alt="Tocar episódio" width="42" height="42" />
                      </button>
                    </td>
                  </tr>
                )
              })}   
            </tbody>
          </table>
      </section>
    </div>    
  )
}

export const getStaticProps: GetStaticProps = async() => { //Roda o getProps e passa pra Home
  //const response = await fetch('http://localhost:3333/episodes? _limit=12&_sort=published_at&_order=desc')
  //const data = await response.json()

  //Utilizando biblioteca Axios
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  }) 
  
  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes,

    },
    revalidate: 60*60*8, //Tempo em seg para gerar uma nova versão da page (8h)
  }   
}