const container = document.getElementById("container");
let speed = 4000 - document.getElementById("speed").value;
let hideWarning = false;
let inOrder = false;
let blockWidth = 100;

function createBlock(num) {
  if (num < 0) {
    return;
  }

  let elem = document.createElement("div");
  elem.id = "item";
  elem.style.height = `${num > 25 ? 1.65 * num : 25}px`;
  elem.style.width = `${blockWidth}px`;
  elem.innerText = num;
  elem.innerHTML.style =
    "display:inline;vertical-align: middle; text-align:center;line-hight:100px;";
  elem.style.textAlign = "center";
  elem.className = "block";
  container.appendChild(elem);
}

function init() {
  if (screen.width < 600) {
    let blockCountSlider = document.getElementById("size");
    blockCountSlider.setAttribute("min", "15");
    alert("This program works best on larger screens.");
  }
  for (let i = 0; i < 10; i++) {
    createBlock(Math.floor(Math.random() * 400));
  }
}

function resize(n) {
  container.innerHTML = "";
  for (let i = 0; i < n; i++) {
    createBlock(Math.floor(Math.random() * 400));
  }
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

function updateHeight(arr, i) {
  arr[i].style.height = `${
    parseInt(arr[i].innerText) > 25 ? 2 * parseInt(arr[i].innerText) : 25
  }px`;
}

async function greenify(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.background = "green";
  }
}

function shuffle() {
  function _shuffle(arr) {
    inOrder = false;
    for (let i = 0; i < arr.length; i++) {
      // With another element in the array, swap their value
      let index = Math.floor(Math.random() * i);

      let temp = parseInt(arr[i].innerText);
      arr[i].innerText = parseInt(arr[index].innerText);
      arr[index].innerText = temp;

      updateHeight(arr, i);
      updateHeight(arr, index);
      arr[i].style.background = "white";
      arr[index].style.background = "white";
    }
  }

  let blocks = document.body.getElementsByClassName("block");
  _shuffle(blocks);
}

async function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    await sleep();
    arr[0].style.background = "green";

    let j = i - 1;
    while (
      j >= 0 &&
      parseInt(arr[j + 1].innerText) < parseInt(arr[j].innerText)
    ) {
      arr[j].style.background = "red";
      arr[j + 1].style.background = "lightblue";

      await sleep();
      let temp = parseInt(arr[j].innerText);
      arr[j].innerText = parseInt(arr[j + 1].innerText);
      arr[j + 1].innerText = temp;

      updateHeight(arr, j);
      updateHeight(arr, j + 1);

      j -= 1;

      await sleep();
    }

    arr[j + 1].style.background = "green";
  }
  greenify(arr);
}

async function merge(arr) {
  async function divide(arr, left, right) {
    if (left < right) {
      let mid = left + Math.floor((right - left) / 2);
      await divide(arr, left, mid);
      await divide(arr, mid + 1, right);
      await conquer(arr, left, mid, right);
    }
  }

  async function conquer(arr, left, mid, right) {
    let lside = Array(mid - left + 1);
    let rside = Array(right - mid);

    for (let i = 0; i < lside.length; i++) {
      lside[i] = parseInt(arr[i + left].innerText);
    }

    for (let i = 0; i < rside.length; i++) {
      rside[i] = parseInt(arr[i + mid + 1].innerText);
    }

    let i = 0,
      j = 0,
      k = left;

    while (i < lside.length && j < rside.length) {
      arr[i + left].style.background = "lightblue";
      arr[j + mid + 1].style.background = "red";

      await sleep();

      if (lside[i] < rside[j]) {
        arr[k].innerText = lside[i];
        arr[i + left].style.background = "white";
        i += 1;
      } else {
        arr[k].innerText = rside[j];
        arr[j + mid + 1].style.background = "white";
        j += 1;
      }

      updateHeight(arr, k);
      arr[k].style.background = "green";
      k += 1;

      if (i < lside.length) {
        arr[i + left].style.background = "white";
      } else {
        arr[lside.length - 1].style.background = "white";
      }
      if (j < rside.length) {
        arr[j + mid + 1].style.background = "white";
      } else {
        arr[rside.length - 1].style.background = "white";
      }

      await sleep();
    }

    while (i < lside.length) {
      arr[i + left].style.background = "lightblue";
      arr[k].innerText = lside[i];
      updateHeight(arr, k);
      arr[k].style.background = "green";
      await sleep();
      arr[i + left].style.background = "white";
      i += 1;
      k += 1;
    }

    while (j < rside.length) {
      arr[j + mid + 1].style.background = "red";
      arr[k].innerText = rside[j];
      updateHeight(arr, k);
      arr[k].style.background = "green";
      await sleep();
      arr[j + mid + 1].style.background = "white";
      j += 1;
      k += 1;
    }

    for (let i = left; i <= right; i++) {
      arr[i].style.background = "green";
    }

    await sleep();

    for (let i = left; i <= right; i++) {
      arr[i].style.background = "white";
    }
  }

  enableDisable();
  await divide(arr, 0, arr.length - 1);
  greenify(arr);
  enableDisable();
}

async function quick(arr) {
  async function conquer(arr, left, right) {
    let pivot = parseInt(arr[right].innerText);
    await sleep();
    arr[right].style.background = "green";
    let j = left;

    for (let i = left; i < right; i++) {
      arr[i].style.background = "red";
      await sleep();
      if (parseInt(arr[i].innerText) < pivot) {
        arr[j].style.background = "lightblue";

        let temp = parseInt(arr[i].innerText);
        arr[i].innerText = parseInt(arr[j].innerText);
        arr[j].innerText = temp;

        updateHeight(arr, i);
        updateHeight(arr, j);

        j += 1;
      }
      arr[i].style.background = "white";
    }
    let temp = parseInt(arr[j].innerText);
    arr[j].innerText = parseInt(arr[right].innerText);
    arr[right].innerText = temp;

    updateHeight(arr, j);
    updateHeight(arr, right);

    arr[j].style.background = "green";

    await sleep();

    return j;
  }
  async function partition(arr, left, right) {
    if (left < right) {
      let mid = await conquer(arr, left, right);
      await partition(arr, left, mid - 1);
      await partition(arr, mid + 1, right);
    }
  }
  enableDisable();
  await partition(arr, 0, arr.length - 1);
  enableDisable();
  greenify(arr);
}

async function bubble(arr) {
  enableDisable();
  let swapped = true;
  let j = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < j; i++) {
      arr[i].style.background = "lightblue";
      arr[i + 1].style.background = "red";
      await sleep();

      if (parseInt(arr[i].innerText) > parseInt(arr[i + 1].innerText)) {
        arr[i + 1].style.background = "red";

        let temp = parseInt(arr[i].innerText);
        arr[i].innerText = parseInt(arr[i + 1].innerText);
        arr[i + 1].innerText = temp;

        swapped = true;

        updateHeight(arr, i);
        updateHeight(arr, i + 1);

        await sleep();
      }

      arr[i].style.background = "white";
    }

    arr[j].style.background = "green";
    j -= 1;
  }

  await sleep();
  greenify(arr);
  enableDisable();
}

async function selection(arr) {
  enableDisable();

  for (var i = 0; i < arr.length; i++) {
    await sleep();
    var min = i;
    arr[i].style.background = "lightblue";

    for (var j = i + 1; j < arr.length; j++) {
      arr[j].style.background = "red";
      await sleep();
      if (parseInt(arr[min].innerText) > parseInt(arr[j].innerText)) {
        if (i < arr.length - 1) {
          arr[j].style.background = "green";
          await sleep();
        }
        arr[min].style.background = min == i ? "lightblue" : "white";
        min = j;
      } else {
        arr[j].style.background = "white";
      }
    }

    let temp = parseInt(arr[i].innerText);
    arr[i].innerText = parseInt(arr[min].innerText);
    arr[min].innerText = temp;

    updateHeight(arr, i);
    updateHeight(arr, min);

    arr[min].style.background = "white";
    arr[i].style.background = "green";
  }
  enableDisable();
}

async function heap(arr) {
  function getMinIndex(i) {
    if (
      i * 2 + 2 >= arr.length ||
      parseInt(arr[i * 2 + 1].innerText) < parseInt(arr[i * 2 + 2].innerText)
    ) {
      return i * 2 + 1;
    } else {
      return i * 2 + 2;
    }
  }

  async function percDown(i) {
    while (i * 2 + 1 < arr.length) {
      let minIndex = getMinIndex(i);
      arr[minIndex].style.background = "lightblue";
      arr[i].style.background = "red";

      await sleep();

      if (parseInt(arr[i].innerText) > parseInt(arr[minIndex].innerText)) {
        let temp = parseInt(arr[i].innerText);
        arr[i].innerText = parseInt(arr[minIndex].innerText);
        arr[minIndex].innerText = temp;

        updateHeight(arr, i);
        updateHeight(arr, minIndex);

        await sleep();
      }
      i = minIndex;

      arr[minIndex].style.background = "white";
      arr[i].style.background = "white";
    }
  }

  async function heapify(arr) {
    let i = Math.floor(arr.length / 2);
    while (i >= 0) {
      await percDown(i);
      i -= 1;
    }
    await sleep();
  }

  enableDisable();
  await heapify(arr);
  greenify(arr);
  enableDisable();
}

function enableDisable() {
  if (document.getElementById("size").disabled) {
    document.getElementById("size").disabled = false;
    document.getElementById("algos").disabled = false;
    document.getElementById("shuffle").disabled = false;
    document.getElementById("go").disabled = false;
  } else {
    document.getElementById("size").disabled = true;
    document.getElementById("algos").disabled = true;
    document.getElementById("shuffle").disabled = true;
    document.getElementById("go").disabled = true;
  }
}

function lookup(name) {
  switch (name) {
    case "select":
      return selection;
    case "insert":
      return insertion;
    case "bubble":
      return bubble;
    case "merge":
      return merge;
    case "quick":
      return quick;
    case "heap":
      return heap;
    default:
      return selection;
  }
}

let speedController = document.getElementById("speed");
speedController.addEventListener("input", function(e) {
  speed = 4000 - e.target.value;
});

let sizeController = document.getElementById("size");
sizeController.addEventListener("input", function(e) {
  resize(e.target.value);
  document.getElementById("sizeLabel").innerText = sizeController.value;
});

let blockWidthController = document.getElementById("blockWidthController");
blockWidthController.addEventListener("input", function(e) {
  let blocks = document.body.getElementsByClassName("block");
  blockWidth = e.target.value;

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].style.width = blockWidth + "px";
  }
});

async function main() {
  let name = document.getElementById("algos").value;
  let algo = lookup(name);
  let blocks = document.body.getElementsByClassName("block");

  if (inOrder == true) {
    inOrder = false;
    resize(blocks.length);
  }

  speed = 4000 - document.getElementById("speed").value;
  hideWarning = document.getElementById("warning").checked ? true : false;

  if (
    window.innerWidth < document.getElementById("container").clientWidth &&
    hideWarning == false
  ) {
    alert(
      "Scroll horizontally to see the remaining blocks. Check 'Hide warning' to not see this message again."
    );
  }

  await algo(blocks);
  inOrder = true;
}
