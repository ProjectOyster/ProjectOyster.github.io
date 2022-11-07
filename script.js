
//Hover image link
/*
const linkText = document.querySelector('.link-text');
const linkImage = document.querySelector('.link-image');

function showImgContent(e) {
  x = e.clientX;
  y = e.clientY;
  linkImage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  linkText.style.setProperty('--x',(x)+'px');
  linkText.style.setProperty('--y',(y)+'px');
}

document.addEventListener('mousemove', showImgContent);
*/


// Highlight text mode
const highlight = document.getElementById("highlight-style");
const mode = document.getElementById("mode");

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".text-highlight").forEach((highlight) => {
  ScrollTrigger.create({
    trigger: highlight,
    start: "-100px center",
    onEnter: () => highlight.classList.add("active")
  });
});

const setHighlightStyle = (value) =>
  document.body.setAttribute("data-highlight", value);

mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);

highlight.addEventListener("change", (e) => setHighlightStyle(e.target.value));

setHighlightStyle(highlight.value);

//button 6
$(function() {  
  $('.btn-6')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });
});

$("ul a .button_top .btn-6").on("click", function (e) {
  // 1
  e.preventDefault();
  // 2
  const href = $(this).attr("href");
  // 3
  $("html, body").animate({ scrollTop: $(href).offset().top }, 800);
});

document.addEventListener("mousemove", e => {
  document.documentElement.style.setProperty("--mouse-x", e.clientX +'px');
  document.documentElement.style.setProperty("--mouse-y", e.clientY +'px');
});



// Circular rotating text
const degreeToRadian = (angle) => {
  return angle * (Math.PI / 180);
};

const radius = 150;
const diameter = radius * 2;

const circle = document.querySelector("#circular-text");
circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.dataset.text;
const characters = text.split("");

const deltaAngle = 360 / characters.length;
const characterOffsetAngle = 8;
let currentAngle = -90;

characters.forEach((character, index) => {
  const span = document.createElement("span");
  span.innerText = character;
  const xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
  const yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

  const transform = `translate(${xPos}px, ${yPos}px)`;
  const rotate = `rotate(${(index * deltaAngle) + characterOffsetAngle}deg)`;
  span.style.transform = `${transform} ${rotate}`;

  currentAngle += deltaAngle;
  circle.appendChild(span);
});

const infoCardsLarge = document.querySelectorAll('.info-card-L')

infoCardsLarge.forEach((card) => {
    card.addEventListener('click', () => {
        const description = card.querySelector('.description')
        
        if (!description.hasAttribute('style') && description.scrollHeight > 24) {
        description.setAttribute('style', `height: ${description.scrollHeight}px`)
        card.classList.add('-expanded')
        } else {
        description.removeAttribute('style')
        card.classList.remove('-expanded') 
        }
        
    })
})

const infoCardsMedium = document.querySelectorAll('.info-card-M')

infoCardsMedium.forEach((card) => {
    card.addEventListener('click', () => {
        const description = card.querySelector('.description')
        
        if (!description.hasAttribute('style') && description.scrollHeight > 24) {
        description.setAttribute('style', `height: ${description.scrollHeight}px`)
        card.classList.add('-expanded')
        } else {
        description.removeAttribute('style')
        card.classList.remove('-expanded') 
        }
        
    })
})




