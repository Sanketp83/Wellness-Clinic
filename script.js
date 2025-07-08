const burgerBtn = document.getElementById("burger-btn");
const navLinks = document.querySelector(".nav-links");

burgerBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent immediate close
  navLinks.classList.toggle("active");
});

// ✅ Close nav menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinks.contains(e.target);
  const isClickOnBurger = burgerBtn.contains(e.target);

  if (!isClickInsideMenu && !isClickOnBurger) {
    navLinks.classList.remove("active");
  }
});

// ===== LOGO TEXT ANIMATION =====
function breakTheText() {
  const h1 = document.querySelector(".logo h1");
  const h1Text = h1.textContent.trim();
  const words = h1Text.split(" "); // ["Pandikar", "Clinic"]
  let clutter = "";

  words.forEach((word, wordIndex) => {
    const className = wordIndex === 0 ? "a" : "b";
    word.split("").forEach((letter) => {
      clutter += `<span class="${className}">${letter}</span>`;
    });
    clutter += `<span class="space">&nbsp;</span>`;
  });

  h1.innerHTML = clutter;
}

breakTheText();

// ===== GSAP Animation =====
gsap.from(".logo h1 .a", {
  y: -50,
  opacity: 0,
  duration: 0.6,
  delay: 0.5,
  stagger: -0.1,
});

gsap.from(".logo h1 .b", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  delay: 0.5,
  stagger: 0.1,
});

// ===== SWIPER GALLERY INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".carousel-gallery .swiper-container", {
    effect: "slide",
    speed: 900,
    slidesPerView: 5,
    spaceBetween: 20,
    simulateTouch: true,
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".carousel-gallery .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 5 },
      425: { slidesPerView: 2, spaceBetween: 10 },
      768: { slidesPerView: 3, spaceBetween: 20 },
    },
  });

  // Manual buttons
  document.querySelector(".swiper-prev").addEventListener("click", () => {
    swiper.slidePrev();
  });

  document.querySelector(".swiper-next").addEventListener("click", () => {
    swiper.slideNext();
  });

  // Fancybox overlay control
  Fancybox.bind("[data-fancybox='gallery']", {
    on: {
      reveal: () => {
        document.querySelector(".custom-nav").style.display = "flex";
      },
      closing: () => {
        document.querySelector(".custom-nav").style.display = "none";
      },
    },
  });
});

// DARK MODE TOGGLE
const darkToggle = document.getElementById("dark-toggle");
const body = document.body;

// 🔁 Load dark mode preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// 🌗 Toggle dark mode
darkToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Swap icon
  darkToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});
