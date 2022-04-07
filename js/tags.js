var squares = document.getElementsByClassName("tag");
var gameField = document.getElementById("tags_field");
var emptySquare = document.getElementById("square_epmpty");
var successfulPlacement = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "square_epmpty",
];
//перемешиваем наш массив, чтобы потом рандомно присвоить id и текст к кнопкам
function shuffle(array) {
  var temp;
  var j;
  var i = array.length;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
for (var i = 0; i < squares.length; i++) {
  squares[i].innerHTML = numbers[i];
  squares[i].setAttribute("id", numbers[i].toString());
}
//начало движения
function dragStart(ev) {
  ev.dataTransfer.setData("text", ev.target.getAttribute("id"));
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.setDragImage(ev.target, 100, 100); //это не
  return true;
}
function dragEnter(ev) {
  ev.preventDefault();
  return true;
}
function dragOver(ev) {
  ev.preventDefault();
}
function dragDrop(ev) {
  var data = ev.dataTransfer.getData("Text");
  if (canChange(document.getElementById(data))) {
    swap(document.getElementById(data));
    check_win();
  }
  ev.stopPropagation();
  ev.preventDefault();
}
//меняем местами два элемента
function swap(a, b) {
  var a2 = a.cloneNode(true);
  var b2 = emptySquare.cloneNode(true);
  gameField.replaceChild(b2, a);
  gameField.replaceChild(a2, emptySquare);
  emptySquare = document.getElementById("square_epmpty");
}
//проверка на выигрышь
function check_win() {
  var allBtns = gameField.getElementsByTagName("div");
  var currentPlacement = [];
  for (var i = 0; i < allBtns.length; i++) {
    currentPlacement.push(allBtns[i].getAttribute("id"));
  }
  //сравниваем текущее положение цифр с выиграшным
  var isSame =
    currentPlacement.length == successfulPlacement.length &&
    currentPlacement.every(function (element, index) {
      return element === successfulPlacement[index];
    });
  if (isSame) {
    alert("Вы выиграли!");
  }
}
//получить текущее положение элемента
function getPosition(elem) {
  var allBtns = gameField.getElementsByTagName("div");
  for (var i = 0; allBtns.length > i; i++) {
    if (allBtns[i] == elem) return i;
  }
}
//проверяем, можно ли поменять местами выбранные элементы
function canChange(elem) {
  var emptyPosition = getPosition(emptySquare);
  var elemPosition = getPosition(elem);
  if (
    emptyPosition - elemPosition == 4 ||
    emptyPosition - elemPosition == 1 ||
    elemPosition == emptyPosition + 1 ||
    elemPosition == emptyPosition + 4
  )
    return true;
  else return false;
}
