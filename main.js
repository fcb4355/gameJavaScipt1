const starBtn = document.querySelector(".star span");
const strDiv = document.querySelector(".star")
const prsn = document.querySelector(".persone span")
const back = document.querySelectorAll(".back")
const count = document.querySelector(".count-down");
const blocksParent = document.querySelector(".memory-game-blocks");
const arrayBlock = Array.from(blocksParent.children);
const keyBlock = [...arrayBlock.keys()];
const tries = document.querySelector(".tries span");
const time = document.querySelector(".time span");
let duration = 500;

starBtn.addEventListener("click", () => {
  var namePlayer = prompt("what is your name ?")
  if (namePlayer == null || namePlayer == "") {
    prsn.innerHTML = "unknown"
  } else {
    prsn.innerHTML = namePlayer
  }
  strDiv.classList.add("remove")
  function calc() {
    var upTime = setInterval(() => {
      time.innerHTML = +time.innerHTML + 1
    }, 1000)
  }

  let down = setInterval(() => {
    +count.innerHTML--
    if (+count.innerHTML === 0) {
      clearInterval(down)
    }
  }, 1000)
  rmmbr()
  setTimeout(() => {
    calc()
  }, (+count.innerHTML * 1000))
})


function rmmbr() {
  blocksParent.classList.add("remember")
  setTimeout(() => {
    blocksParent.classList.remove("remember")
  }, (+count.innerHTML * 1000))
}


shuffle(keyBlock)


function shuffle(arr) {
  let lengthBlock = arr.length,
    temp,
    random;
  while (lengthBlock > 0) {
    random = Math.floor(Math.random() * lengthBlock)
    lengthBlock--;
    temp = arr[lengthBlock];
    arr[lengthBlock] = arr[random];
    arr[random] = temp
  }
  return arr
}



arrayBlock.forEach((block, index) => {
  block.style.order = keyBlock[index]
  block.addEventListener("click", () => {
    check(block)
    win()
  })
})



function check(selectBlock) {
  selectBlock.classList.add("flip");
  let lengthBlockHasFlipClass = arrayBlock.filter(block => block.classList.contains("flip"))
  if (lengthBlockHasFlipClass.length == 2) {
    stopClicking()
    test(lengthBlockHasFlipClass[0], lengthBlockHasFlipClass[1])
  }
}


function stopClicking() {
  blocksParent.classList.add("event-none");
  setTimeout(() => {
    blocksParent.classList.remove("event-none");
  }, duration)
}


function test(block1, block2) {
  if (block1.dataset.technology === block2.dataset.technology) {
    block1.classList.replace("flip", "fliped")
    block2.classList.replace("flip", "fliped")
  } else {
    setTimeout(() => {
      block1.classList.remove("flip")
      block2.classList.remove("flip")
    }, duration)

    setTimeout(() => {
      counterTries()
    }, duration)
  }
}



function counterTries() {
  tries.innerHTML = +tries.innerHTML + 1
}


function win() {
  let lengthBlockHasFlipClassfinal = arrayBlock.filter(block => block.classList.contains("fliped"))
  if (lengthBlockHasFlipClassfinal.length === arrayBlock.length) {
    window.localStorage.setItem(prsn.innerHTML, `tries:${tries.innerHTML} -&- time:${time.innerHTML}s`);
    alert(`you win  
                    more details:
    tries:${tries.innerHTML} -&- time:${time.innerHTML}s
          thanks for playing
          `)
    window.location.reload()
  }
}
