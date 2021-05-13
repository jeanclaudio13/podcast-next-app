/*_document fica por fora de toda aplicação.
o _app também, porém recarrega a cada rota
para as fontes, não queremos esse recarregamento
então usamos o _document
*/

import Document, { Html, Head, Main, NextScript } from 'next/Document';

//Padrão Next é usar Document como class
export default class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}