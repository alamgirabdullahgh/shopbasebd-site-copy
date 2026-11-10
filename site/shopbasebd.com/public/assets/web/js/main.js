
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    window.addEventListener("scroll", function () {
      header.classList.toggle("sticky", window.scrollY > 50);
    });
  } else {
    header.classList.add("sticky");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
});



var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: false,
  /*autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    pauseonMouseHover: true,
  },*/
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 4
    }
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const serviceModal = document.getElementById("serviceModal");
  if (serviceModal) {
    serviceModal.addEventListener("show.bs.modal", function (event) {
      let card = event.relatedTarget;

      let title = card.getAttribute("data-title");
      let icon = card.getAttribute("data-icon");
      let details = card.getAttribute("data-details");

      serviceModal.querySelector("#serviceTitle").textContent = title;
      serviceModal.querySelector("#serviceIcon").className = icon;
      serviceModal.querySelector("#serviceDetails").textContent = details;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("mainProductImage");
  const zoomResult = document.getElementById("zoomResult");
  const lens = document.querySelector(".zoom-lens");
  const thumbnails = document.querySelectorAll(".thumb-img");
  const zoom = 2;

  if (!mainImage || !zoomResult || !lens) return;

  function updateZoomBackground() {
    zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    zoomResult.style.backgroundSize = `${mainImage.width * zoom}px ${mainImage.height * zoom}px`;
  }

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.dataset.src;

      thumbnails.forEach((img) => img.classList.remove("active"));
      thumb.classList.add("active");

      updateZoomBackground();
    });
  });

  mainImage.addEventListener("mouseenter", () => {
    lens.style.display = "block";
    zoomResult.style.display = "block";
    updateZoomBackground();
  });

  mainImage.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    zoomResult.style.display = "none";
  });

  mainImage.addEventListener("mousemove", moveLens);
  lens.addEventListener("mousemove", moveLens);

  function moveLens(e) {
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let lensX = x - lens.offsetWidth / 2;
    let lensY = y - lens.offsetHeight / 2;

    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > mainImage.width - lens.offsetWidth)
      lensX = mainImage.width - lens.offsetWidth;
    if (lensY > mainImage.height - lens.offsetHeight)
      lensY = mainImage.height - lens.offsetHeight;

    lens.style.left = lensX + "px";
    lens.style.top = lensY + "px";

    const bgX = -(lensX * zoom);
    const bgY = -(lensY * zoom);
    zoomResult.style.backgroundPosition = `${bgX}px ${bgY}px`;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const parallaxSections = document.querySelectorAll('.parallax-effects');
  const applyParallaxScale = () => {
    parallaxSections.forEach((section) => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (sectionPosition < screenHeight && sectionPosition > 0) {
        const scaleFactor = Math.min(1, 0.7 + (screenHeight - sectionPosition) / screenHeight * 0.4);

        section.style.opacity = 1;
        section.style.transform = `scale(${scaleFactor})`;
      } else if (sectionPosition < 0) {
        section.style.opacity = 1;
        section.style.transform = 'scale(1)';
      }
    });
  };
  window.addEventListener('scroll', applyParallaxScale);
  applyParallaxScale();
});



document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp-box");

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      
      if (/[^0-9]/.test(value)) {
        e.target.value = ""; // only allow digits
        return;
      }

      if (value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus(); // move to next input
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].focus(); // move to previous input
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData("text");
      const digits = pasteData.replace(/\D/g, "").slice(0, otpInputs.length);

      digits.split("").forEach((digit, idx) => {
        otpInputs[idx].value = digit;
      });

      if (digits.length === otpInputs.length) {
        otpInputs[otpInputs.length - 1].focus();
      } else {
        otpInputs[digits.length].focus();
      }
    });
  });
});


function labnolIframe(div) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    "https://www.youtube.com/embed/" + div.dataset.id + "?autoplay=1&rel=0"
    );
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    );
  div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideos() {
  var playerElements = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < playerElements.length; n++) {
    var videoId = playerElements[n].dataset.id;
    var div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    var thumbNode = document.createElement("img");
    thumbNode.src = "https://shopbasebd.com/public/apps/support.jpg".replace(
      "ID",
      videoId
      );
    div.appendChild(thumbNode);
    var playButton = document.createElement("div");
    playButton.setAttribute("class", "play");
    div.appendChild(playButton);
    div.onclick = function () {
      labnolIframe(this);
    };
    playerElements[n].appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", initYouTubeVideos);
