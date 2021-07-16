
const miModulo = (() => {
    'use strict';

    
    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias del HTML
    const bntPedir = document.querySelector('#bntPedir'),
          bntNuevo = document.querySelector('#bntNuevo'),
          bntDetener = document.querySelector('#bntDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('Small');

    //esta funcion inicializa el juego
    const iniciarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0 ); 
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        bntPedir.disabled = false;
        bntDetener.disabled = false;

    }
    

    // Esta funcion cre auna nueva baraja
    const crearDeck = () => {
        
        deck = [];
        for( let i =2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo );
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo );
            } 
        }

        return _.shuffle( deck );

    }

    //Esta funcion me permite pedir una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();

    }


    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
        
    }

    // Turno: 0 primer jugadora y el ultimo será la computadora
    const acumularPuntos = ( carta, turno ) =>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta ); //sumo los puntos
        puntosHTML[turno].innerText = puntosJugadores[turno]; //aparecen en el titulo
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );   

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora ] = puntosJugadores;
        setTimeout(() => {

            if( puntosComputadora === puntosMinimos ) {
                alert('Empate, nadie gana');
            } else if ( puntosMinimos > 21 ) {
                alert('La computadora ganó!');
            } else if( puntosComputadora > 21 ) {
                alert('Ganaste!!!');
            } else if ( puntosComputadora > puntosMinimos ){
                alert('La computadora ganó!');
            }

        }, 1000 );    
    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntosComputadora = 0;
        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 );

            crearCarta( carta, puntosJugadores.length -1)


        } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }




    // Eventos
    //pedir carta
    bntPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        crearCarta (carta, 0);

        // puntosJugador = puntosJugador + valorCarta( carta ); //sumo los puntos

        // puntosHTML[0].innerText = puntosJugador; //aparecen en el titulo

        //<img class="carta" src="assets/cartas/2H.png" alt=""></img>
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${ carta }.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append( imgCarta );

        if ( puntosJugador > 21 ) {
            console.warn('Perdiste!!');
            bntPedir.disabled = true;
            bntDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial');
            bntPedir.disabled = true;
            bntDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    });

    //detener juego

    bntDetener.addEventListener('click', () => {
        bntPedir.disabled = true;
        bntDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    });

    //nuevo juego

    bntNuevo.addEventListener('click', () => {
        
        iniciarJuego();
 
    });

    return {
        nuevoJuego: iniciarJuego
    };

})();















