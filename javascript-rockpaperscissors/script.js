let userWinCount = 0;
let botWinCount = 0;

document.querySelector("#rock_flag_svg").addEventListener("click", () => {playRound(1);})
document.querySelector("#paper_flag_svg").addEventListener("click", () => {playRound(2);})
document.querySelector("#scissors_flag_svg").addEventListener("click", () => {playRound(3);})

//document.querySelector("#user_move").addEventListener("animationend", () => {documentUserMove.innerText = getEmoji(userMove); documentUserMove.style.removeProperty("animation");});
//document.querySelector("#bot_move").addEventListener("animationend", () => {documentBotMove.innerText = getEmoji(botMove); documentBotMove.style.removeProperty("animation"); updateWinCount(userWinCount, botWinCount);});

function getRandomMove() {
  return Math.floor(Math.random() * 3 + 1);
}

function getEmoji(moveId){
    switch (moveId) {
      case 1:
        return "✊";
      case 2:
        return "🖐️";
      case 3:
        return "✌️";
      default:
        console.error("invalid move id");
        return;
  }
  console.error("invalid move id");
  return;
}

function renderGame(userMove, botMove) {
  let documentUserMove = document.querySelector("#user_move");
  let documentBotMove = document.querySelector("#bot_move");

  documentUserMove.innerText = "✊";
  documentBotMove.innerText = "✊";

  documentUserMove.addEventListener("animationend", () => {documentUserMove.innerText = getEmoji(userMove); documentUserMove.style.removeProperty("animation");});
  documentBotMove.addEventListener("animationend", () => {documentBotMove.innerText = getEmoji(botMove); documentBotMove.style.removeProperty("animation"); updateWinCount(userWinCount, botWinCount);});


  documentUserMove.style.animation="user_animation 0.5s ease-in-out 3"
  documentBotMove.style.animation="bot_animation 0.5s ease-in-out 3"
  return;
}

function playRound(userMove) {
  let botMove = getRandomMove();
  console.log("userMove: " + userMove)
  console.log("botMove: " + botMove)
  if (userMove == botMove) {
    console.log("tie");
  } else if (userMove == 1 && botMove == 2 || userMove == 2 && botMove == 3 || userMove == 3 && botMove == 1) {
    console.log("bot win");
    botWinCount++;
  } else {
    console.log("user win");
    userWinCount++;
  }
  renderGame(userMove, botMove);
  return;
}

function updateWinCount(userWinCount, botWinCount) {
  let victory_points = document.querySelectorAll(".victory_point");
  victory_points.forEach((element) => {element.querySelector("path").setAttribute("fill", "#d9d9d9")})
  if ((userWinCount + botWinCount) > 5) {
    console.error("win count exceeds limit")
    return;
  }
  let pos = 0;
  while (userWinCount != 0) {
    victory_points[pos].querySelector("path").setAttribute("fill", "#ffb800")
    pos++;
    userWinCount--;
  }
  pos = 4;
  while (botWinCount != 0) {
    victory_points[pos].querySelector("path").setAttribute("fill", "#433838")
    pos--;
    botWinCount--;
  }
}
