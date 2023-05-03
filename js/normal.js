(() => {
  const scrollTopBtn = document.querySelector(".scrollTop");
  const prevBtn = document.querySelector(".image-btn.prev");
  const nextBtn = document.querySelector(".image-btn.next");
  const imgElems = document.querySelectorAll(".img-wrap");
  let current = 0;
  const viewMoreBtn = document.querySelector(".view-more-btn");
  const readMoreCon = document.querySelector(".read-more");

  function remove() {
    imgElems[current].classList.remove("On");
  }
  function nextPage() {
    remove();
    if (current == 0) {
      current++;
      imgElems[current].classList.add("On");
    } else {
      current = 0;
      imgElems[current].classList.add("On");
    }
  }
  function prevPage() {
    remove();
    if (current > 0) {
      current--;
      imgElems[current].classList.add("On");
    } else {
      current = imgElems.length - 1;
      imgElems[current].classList.add("On");
    }
  }
  function showPage() {
    viewMoreBtn.classList.toggle("On");
    if (viewMoreBtn.classList.contains("On")) {
      readMoreCon.style.maxHeight = readMoreCon.scrollHeight + "px";
      readMoreCon.style.transition = "1s";
    } else {
      readMoreCon.style.maxHeight = null;
    }
  }
  viewMoreBtn.addEventListener("click", showPage);
  prevBtn.addEventListener("click", prevPage);
  nextBtn.addEventListener("click", nextPage);
  window.addEventListener("scroll", () => {
    if (scrollY > header.offsetHeight) {
      scrollTopBtn.classList.add("On");
    } else {
      scrollTopBtn.classList.remove("On");
    }
  });
})();
