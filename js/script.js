const pages = document.querySelectorAll(".vt-page");
const buttons = document.querySelectorAll(".vt-navigation button");

buttons.forEach((button) => {

  button.addEventListener("click", () => {

    const targetPage = button.dataset.page;

    pages.forEach((page) => {
      page.classList.remove("is-active");
    });

    buttons.forEach((button) => {
      button.classList.remove("is-active");
    });

    const pageToShow = document.querySelector(
      `.vt-page[data-page="${targetPage}"]`
    );

    pageToShow.classList.add("is-active");

    button.classList.add("is-active");

  });

});