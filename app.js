let interations = 100;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    interations = 25;
  }
  

const generateArt = () => {
  let [width, height, left, top, background, deg, radius] = [
    100,
    100,
    100,
    100,
    randomPalette(),
    360,
    50,
  ];

  //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
  //To add a delay between generating 'stars'

  //The timer runs after every genertation
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const load = async () => {
    for (let i = 0; i < interations; i++) {
      const star = document.createElement("div");
      star.setAttribute("id", `star-${i}`);


      

      const newDiv = document.createElement("div");
      background = randomPalette();
      let startConGrad = background[random(5)];

      let choices = {};
      choices.width = random(width);
      choices.height = random(height);
      choices.left = random(left);
      choices.top = random(top);
      choices.background = `conic-gradient(${startConGrad},${
        background[random(5)]
      }, ${background[random(5)]}, ${background[random(5)]}, ${startConGrad})`;
      choices.radius = "50%";
      choices.rotate = random(deg);

      choices.reduction = (random(2)+8)/10 ;

      newDiv.style.width = choices.width + "px";
      newDiv.style.height = choices.height + "px";

      newDiv.style.position = "absolute";

      newDiv.style.left = choices.left + "%";
      newDiv.style.top = choices.top + "%";

      newDiv.style.background = choices.background;
      newDiv.style.borderRadius = choices.radius;

      newDiv.style.rotate = choices.rotate + "deg";
      newDiv.style.animation = 'spin 75s infinite linear';

      let buildMore = false;
      if (random(15) > 0) {
        buildMore = true;
      }

      if (buildMore) {
        let child = buildChild(choices);
        newDiv.appendChild(child);
      }

      star.appendChild(newDiv)
      canvas.appendChild(star);
      await timer(25);
    }
  };

  load();
};

const buildChild = (choices) => {
  //I want longer chains so lets increase the odds!
  let buildMore = false;
  if (random(15) > 0) {
    buildMore = true;
  }

  const child = document.createElement("div");

  child.style.width = choices.width * choices.reduction + "px";
  child.style.height = choices.height * choices.reduction + "px";

  choices.width = choices.width* choices.reduction;
  choices.height = choices.height* choices.reduction;

  child.style.position = "absolute";

  child.style.left = choices.left * choices.reduction + "%";
  child.style.top = choices.top * choices.reduction + "%";
  
  choices.left = choices.left*choices.reduction;
  choices.top = choices.top*choices.reduction;

  child.style.background = choices.background;
  child.style.borderRadius = choices.radius;

  child.style.rotate = choices.rotate + "deg";

  child.style.boxShadow = "0px 0px 5px 5px rgba(0, 0, 0, 0.5)";
  child.style.animation = 'spin 75s infinite linear';

  if (buildMore) {
    let newChild = buildChild(choices);
    child.appendChild(newChild);
  }

  return child;
};

const regenerateArt = () => {
  canvas.innerHTML = "";
  setTimeout(generateArt, "1000");
};

const random = (max) => {
  //from 0 - max
  return Math.floor(Math.random() * (max + 1));
};

const randomColor = () => {
  return `rgba(${random(255)},${random(255)},${random(255)}, 1)`;
};

const randomPalette = () => {
  return [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ];
};

const canvas = document.querySelector("div");

const button = document.getElementById("regen");
button.addEventListener("click", regenerateArt);

generateArt();
