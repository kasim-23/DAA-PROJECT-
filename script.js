function logStep(message) {
  let log = document.getElementById("step-log");
  log.innerHTML += message + "<br>";
}

function renderArray(arr) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  arr.forEach(value => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value + "px";
    const label = document.createElement("div");
    label.className = "label";
    label.innerText = value;
    bar.appendChild(label);
    container.appendChild(bar);
  });
}

// ---------------- SORTING -----------------
async function bubbleSort(arr) {
  logStep("Starting Bubble Sort...");
  renderArray(arr);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        logStep(`Swapped ${arr[j]} and ${arr[j+1]}`);
        renderArray(arr);
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
  logStep("Sorting Completed ✅");
}

// ---------------- HEAP -----------------
async function heapify(arr, n, i) {
  let largest = i;
  let left = 2*i + 1;
  let right = 2*i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    logStep(`Swapped ${arr[i]} and ${arr[largest]}`);
    renderArray(arr);
    await new Promise(r => setTimeout(r, 700));
    await heapify(arr, n, largest);
  }
}

async function buildHeap(arr) {
  logStep("Building Max Heap...");
  renderArray(arr);

  let n = arr.length;
  for (let i = Math.floor(n/2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }
  logStep("Heap Built ✅");
}

// ---------------- GRAPH BFS -----------------
async function bfs(graph, start) {
  logStep("Starting BFS Traversal...");
  const visited = {};
  const queue = [start];

  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited[node]) {
      visited[node] = true;
      logStep(`Visited Node ${node}`);
      highlightNode(node);
      await new Promise(r => setTimeout(r, 700));
      for (let neighbor of graph[node]) {
        if (!visited[neighbor]) queue.push(neighbor);
      }
    }
  }
  logStep("BFS Completed ✅");
}

function drawGraph() {
  const svg = document.getElementById("graph-container");
  svg.innerHTML = "";

  const nodes = {1:[150,150], 2:[300,80], 3:[300,220], 4:[450,150]};
  const edges = [[1,2],[1,3],[2,4],[3,4]];

  edges.forEach(([a,b])=>{
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", nodes[a][0]);
    line.setAttribute("y1", nodes[a][1]);
    line.setAttribute("x2", nodes[b][0]);
    line.setAttribute("y2", nodes[b][1]);
    svg.appendChild(line);
  });

  for (let key in nodes) {
    let [x,y] = nodes[key];
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 25);
    circle.setAttribute("id", "node"+key);
    svg.appendChild(circle);

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y+5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "black");
    text.setAttribute("font-size", "16px");
    text.textContent = key;
    svg.appendChild(text);
  }
}

function highlightNode(node) {
  let circle = document.getElementById("node"+node);
  if (circle) {
    circle.setAttribute("fill", "#f1c40f");
  }
}

// ---------------- MAIN -----------------
function startVisualization() {
  document.getElementById("step-log").innerHTML = "";
  document.getElementById("array-container").innerHTML = "";
  document.getElementById("graph-container").innerHTML = "";

  const algo = document.getElementById("algo").value;

  if (algo === "bubble") {
    bubbleSort([80, 40, 100, 60, 20]);
  } 
  else if (algo === "heap") {
    buildHeap([10, 20, 5, 6, 1, 8, 9]);
  } 
  else if (algo === "bfs") {
    drawGraph();
    bfs({1:[2,3], 2:[4], 3:[4], 4:[]}, 1);
  }
}
