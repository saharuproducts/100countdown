window.addEventListener("load", function() {
  let text = document.querySelector(".main-text");
  let deathDate = new Date("2020/03/21 00:00:00");
  let interval = 100;
  countdown = () => {
    let nowDate = new Date();
    let period = deathDate - nowDate;
    let addZero = function(n) {
      return ("0" + n).slice(-2);
    };
    let addZeroDay = function(n) {
      return ("0" + n).slice(-3);
    };
    if (period >= 0) {
      let day = Math.floor(period / (1000 * 60 * 60 * 24));
      period -= day * (1000 * 60 * 60 * 24);
      let showDay = addZeroDay(day);
      // text.innerHTML = "<p class='main-txt'>" + showDay + "</p>";
      text.setAttribute("value", showDay);

      setTimeout(countdown, 10);
    }
  };
  countdown();
});
