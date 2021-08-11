// Inicial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = ''
let warning = ''
let playing = false

reset()

// Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item =>{ // PERCORRE TODAS CLASSES E ADICIONA EVENTO EM TODAS
    item.addEventListener('click', itemClick )
})

// Functions
function itemClick(event){
    let item = event.target.getAttribute('data-area')
    if(playing && square[item] === ''){
        square[item] = player
        renderSquare()
        togglePlayer()
   }
}

function reset(){
    warning = ''

    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'x' : 'o'

    
    for(let i in square){
        square[i] = ''
    }

    playing = true

    renderSquare()
    renderInformation()
}

function renderSquare(){
    for(let i in square){
        let position = document.querySelector(`div[data-area="${i}"]`)
        if(square[i] !== '') {
            position.innerHTML = square[i];
        } else {
            position.innerHTML = '';
        }
        checkGame()
    }
}

function renderInformation(){ // PARA EXIBIR NA TELA
    document.querySelector('.infoCorpoVez').innerHTML = player
    document.querySelector('.infoCorpoResultado').innerHTML = warning

}

function togglePlayer(){ // ALTERNA ENTRE OS PLAYERS
    player = player === 'x' ? 'o' : 'x'
    renderInformation()
}

function checkGame(){
    if(checkWinnerGame('x')){
        warning = 'O "x" venceu.'
        playing = false
    }else if(checkWinnerGame('o')){
        warning = 'O "o" venceu.'
        playing = false
    }else if(isFull()){
        warning = 'Deu empate'
        playing = false
    }
}

function checkWinnerGame(player){
    let pos = [
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let i in player){
        let pArray = pos[i].split(',')
        let hasWon = pArray.every( option => square[option] === player)
        if(hasWon){
            return true
        }
    }

    return false
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false
        }
    }

    return true
}