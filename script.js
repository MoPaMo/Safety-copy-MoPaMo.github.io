document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
  //https://api.github.com/users/MoPaMo/events
  fetch("https://api.github.com/users/MoPaMo/events", {
    method: "get",
  })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      let data = jsonData.filter((a) => a.type == "PushEvent");
      let parent = document.getElementById("col"); //.innerHTML=data
      console.log(data)
      for (let i = 0; i < 3; i++) {
        let b = data[i].payload.commits[0],
          c = parent.children[i].children[0];
        c.innerHTML = b.message;
      }
    })
    .catch((err) => {
      //error block
    });
});
