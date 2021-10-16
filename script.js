// Abdulrazzak Jouhar 2021

var item1 = document.getElementById("item1")
var item2 = document.getElementById("item2")
var item3 = document.getElementById("item3")
var item4 = document.getElementById("item4")
var item5 = document.getElementById("item5")
var item6 = document.getElementById("item6")
var item7 = document.getElementById("item7")
var item8 = document.getElementById("item8")
var item9 = document.getElementById("item9")
var button = document.getElementById("button")
var again = document.getElementById("again")
var gameover = document.getElementById("gameover")

var grid = [1,1,1,1,1,1,1,1,1]
let numbers = [0,1,2,3,4,5,6,7,8]
var main  = [0,0,0,0,0,0,0,0,0]
var items = [item1,item2,item3,item4,item5,item6,item7,item8,item9]
let mesure = 1

gameover.style.display = "none"

button.addEventListener("click", play)

again.style.display = "none"
again.addEventListener("click", () => {
    window.location.reload()
})

function handle(n)
{
    if (grid[n] == 0) return
    var j = "O"
    turn(n,j,true)
}

function play()
{
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click", () => {
            handle(i)
        })
        element.style.cursor = "pointer"
    }
    var r = Math.floor(Math.random() * 9)
    turn(r,"X",false)
    button.removeEventListener("click", play)
    button.style.display = "none"
    again.style.display = "block"
}

function turn(n,j,m)
{
    items[n].innerText = j
    items[n].style.cursor = "default"
    if (j == "X") items[n].style.color = "blue"
    else items[n].style.color = "red"
    grid[n] = 0
    main[n] = j
    const index = numbers.indexOf(n);
    numbers.splice(index,1)
    console.log(main)
    if (check("player","green")) return

    if (m) {
        const random = block()
        console.log(random)
        console.log(numbers)
        cturn(numbers[random],"X")
    }
}

function cturn(n,j)
{
    items[n].innerText = j
    items[n].style.cursor = "default"
    items[n].style.color = "blue"
    grid[n] = 0
    main[n] = j
    const index = numbers.indexOf(n);
    numbers.splice(index,1)

    console.log(numbers)
    console.log(main)
    check("computer","red")
}

function check(w,c)
{
    var draw = false
    var con1 = (main[0] == main[1] && main[1] == main[2] && main[0] != 0) || (main[3] == main[4] && main[4] == main[5] && main[3] != 0) || (main[6] == main[7] && main[7] == main[8] && main[6] != 0)
    var con2 = (main[0] == main[3] && main[3] == main[6] && main[0] != 0) || (main[1] == main[4] && main[4] == main[7] && main[1] != 0) || (main[2] == main[5] && main[5] == main[8] && main[2] != 0)
    var con3 = (main[0] == main[4] && main[4] == main[8] && main[0] != 0) || (main[2] == main[4] && main[4] == main[6] && main[2] != 0)
    if (!con1 && !con2 && !con3) {
        if (numbers.length == 0) {
            draw = true
            c = "green"
        }
        else return false
    }
    gameover.style = "display: block; margin-top: 100px; position: absolute; font-size: 1.5em; left: 0; right: 0; margin-left: auto; margin-right: auto; width: fit-content"
    if (!draw) gameover.innerText = w + " won"
    else gameover.innerText = "DRAW"
    gameover.style.color = c
    grid = [0,0,0,0,0,0,0,0,0]

    return true
}

function block()
{
    return Math.floor(Math.random() * numbers.length)
}