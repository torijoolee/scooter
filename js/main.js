(() => {
  const listElems = document.querySelectorAll(".list-item");
  const header = document.querySelector("header");
  let panelItemElems = document.querySelectorAll(".panel-item");
  const numberOfPanels = 11;
  const panelSize = 600;
  // const unitAngle = 360 / numberOfPanels;
  const unitAngle = (2 * Math.PI) / numberOfPanels;
  const angle = 360 / numberOfPanels;
  const observerElems = document.querySelectorAll(".observer");
  const panelListElem = document.querySelector(".panel-list");
  const panels = document.querySelector(".panels");
  const scrollTopBtn = document.querySelector(".scrollTop");
  let prevPageYOffset;
  let scrollDirection;
  let currentIndex; //현환 프로젝트 번호
  let currentShowPanel;

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

  function inactivate() {
    if (currentShowPanel) {
      currentShowPanel.classList.remove("active");
    }
  }

  function setCurrentPanel() {
    inactivate();
    currentShowPanel = panelItemElems[currentIndex];
    currentShowPanel.classList.add("active");
  }
  function panelRotate() {
    panelListElem.style.transform = ` translateZ(${
      numberOfPanels * 100
    }px) rotateY(${currentIndex * angle}deg)`;
    setCurrentPanel();
  }

  // intersectionObserver
  const io = new IntersectionObserver((entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        if (entries[i].target.classList.contains("observe-start")) {
          currentIndex = 0;
          panelRotate();
          continue;
        }
        const projectIndex = entries[i].target.dataset.index * 1;
        if (projectIndex >= 0) {
          if (scrollDirection === "up") {
            currentIndex = projectIndex + 1;
          } else {
            currentIndex = projectIndex;
          }
          if (currentIndex < numberOfPanels) {
            panelRotate();
          }
        }
        if (
          scrollDirection === "up" &&
          entries[i].target.classList.contains("header-content")
        ) {
          panelListElem.style.transform = `translateZ(0) rotateY(0)`;
          inactivate();
        }
        if (
          scrollDirection === "down" &&
          entries[i].target.classList.contains("observe-end")
        ) {
          panels.classList.add("static-position");
        }
        if (scrollDirection === "up" && currentIndex == numberOfPanels - 1) {
          panels.classList.remove("static-position");
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

  window.addEventListener("scroll", () => {
    if (scrollY > header.offsetHeight) {
      scrollTopBtn.classList.add("On");
    } else {
      scrollTopBtn.classList.remove("On");
    }
  });
})();
