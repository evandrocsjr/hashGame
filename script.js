// Dados

let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}


let warning = ''
let play = ''
let playing = false

reset()
// Eventos
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(event => {
    event.addEventListener('click', (e) =>{
        let loc = e.target.getAttribute('data-area')

        if(playing && quadro[loc] === ''){
            quadro[loc] = play
            renderQuadro()
            togglePlayer()
        }
    })
})

// Funções

function reset(){
    warning = ''

    // setar jogador que irá iniciar
    let random = Math.floor(Math.random() * 2)
    play = random === 0 ? 'x' : 'o'

    // limpar quadro
    for(let i in quadro){
        quadro[i] = ''
    }

    renderQuadro()
    renderInfo()

    playing = true
}

function renderQuadro(){
    for(let i in quadro){
        let item = document.querySelector(`div[data-area="${i}"]`)
        if(quadro[i] !== ''){
            item.innerHTML = quadro[i]
        }else{
            item.innerHTML = ''
        }
    }
    checkGame()
    renderInfo()
}

function renderInfo(){
    document.querySelector('.infoCorpoResultado').innerHTML = warning
    document.querySelector('.infoCorpoVez').innerHTML = play
}

function togglePlayer(){
    play = play === 'x' ? 'o' : 'x'
    renderInfo()
}

function checkGame(){
    if( checkWinner('x') ){
        warning = 'O "x" venceu.'
        playing = false
    }else if( checkWinner('o') ){
        warning = 'O "o" venceu.'
        playing = false
    }else if(isFull()){
        warning = 'Deu empate.'
        playing = false
    }
}

function checkWinner(e){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let i in pos){
        let posArray = pos[i].split(',')
        let hasWon = posArray.every( option => quadro[option] === e)
        if(hasWon) return true
    }
    return false
}

function isFull(){
    
    for(let i in quadro){
        if(quadro[i] === ''){
            return false
        }
    }
    return true
}