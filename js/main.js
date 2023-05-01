(() => {
  const listElems = document.querySelectorAll(".list-item");
  const panelItemElems = document.querySelectorAll(".panel-item");
  const numberOfPanels = 11;
  const panelSize = 600;
  // const unitAngle = 360 / numberOfPanels;
  const unitAngle = (2 * Math.PI) / numberOfPanels;
  const angle = 360 / numberOfPanels;
  const observerElems = document.querySelectorAll(".observer");
  const panelListElem = document.querySelector(".panel-list");
  let prevPageYOffset;
  let scrollDirection;
  let currentIndex; //현환 프로젝트 번호

  //panel rotate,translate
  function setPanelItems() {
    const distance = panelSize / 2 / Math.tan(unitAngle / 2);
    console.log(distance);

    for (let i = 0; i < panelItemElems.length; i++) {
      panelItemElems[i].style.transform = `rotateY(${
        -angle * i
      }deg) translateZ(${-distance - 200}px)`;
    }
  }
  setPanelItems();

  function panelRotate() {
    panelListElem.style.transform = ` translateZ(${
      numberOfPanels * 100
    }px) rotateY(${currentIndex * angle}deg)`;
  }
  // intersectionObserver
  const io = new IntersectionObserver((entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        console.log(entries[i].target.dataset.index * 1);
        if (entries[i].target.classList.contains("observe-start")) {
          currentIndex = 0;
          panelRotate();
          continue;
        }
        const projectIndex = entries[i].target.dataset.index * 1;
        if (projectIndex >= 0) {
          if (scrollDirection === "down") {
            currentIndex = projectIndex;
          } else {
            currentIndex = projectIndex + 1;
          }
          if (currentIndex > numberOfPanels - 1) {
            currentIndex = numberOfPanels - 1;
          }
          panelRotate();
        }
      }
    }
  });
  observerElems.forEach((elem, i) => {
    io.observe(elem);
  });

  window.addEventListener("scroll", () => {
    if (prevPageYOffset > window.scrollY) {
      scrollDirection = "up";
    } else {
      scrollDirection = "down";
    }
    prevPageYOffset = window.scrollY;
  });
})();
