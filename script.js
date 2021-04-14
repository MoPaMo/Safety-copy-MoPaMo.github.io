const getD = (previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  console.log(previous);
  console.log(new Date(previous));
  var elapsed = new Date() - new Date(previous);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
};

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
      // console.log(jsonData);
      let data = jsonData.filter((a) => a.type == "PushEvent");
      let parent = document.getElementById("col"); //.innerHTML=data
      console.log(data);
      for (let i = 0; i < 3; i++) {
        let b = data[i].payload.commits[0],
          c = parent.children[i].children[0],
          a = `<span class="icon-text is-size-7 has-text-weight-bold">
          <span class="icon">
            <i class="fas fa-book"></i>
          </span>
          ${
            data[i].created_at
              ? getD(data[i].created_at)
              : "no date provided :("
          }
          <span>${data[i].repo.name}</span>
        </span><br/><div class="is-size-6 is-size-5-widescreen">${
          b.message
        }</div>`;
        console.log(a);
        c.innerHTML = a.toString();
      }
    })
    .catch((err) => {
      //error block
    });
});
