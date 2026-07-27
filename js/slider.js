/* Testimonial slider — used on index.html */
document.addEventListener("DOMContentLoaded", initTestimonialSlider);

function initTestimonialSlider(){
  const track = document.querySelector(".testimonial-track");
  if(!track || !track.children.length) return;

  const dotsWrapExisting = document.querySelector(".slider-dots");
  if(dotsWrapExisting) dotsWrapExisting.innerHTML = "";

  const slides = Array.from(track.children);
  const dotsWrap = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  let index = 0;
  let autoTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function update(){
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((d, i) => d.classList.toggle("active", i === index));
  }
  function goTo(i){
    index = (i + slides.length) % slides.length;
    update();
    restartAuto();
  }
  function restartAuto(){
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(index + 1), 5000);
  }

  prevBtn && prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn && nextBtn.addEventListener("click", () => goTo(index + 1));

  restartAuto();
}
