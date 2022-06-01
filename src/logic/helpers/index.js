export const productPath = (product) =>
  "/product/" +
  product.id +
  "/" +
  product.name.replaceAll(" ", "-").toLowerCase();

// maybe better a hook
export const idleConsequences = (consequence) => {
  let t;
  let times = 1;
  const SECONDS = 60 * 60; // 60 min
  const TIME = SECONDS * 1000; // time in milliseconds

  const inactivityEffect = () => {
    console.log(`Inactive for more than ${times * SECONDS}s 😬`);
    times += 1;
    resetTimer(); // or do not

    if (consequence) {
      return consequence();
    }
  };

  const resetTimer = () => {
    clearTimeout(t);
    t = setTimeout(inactivityEffect, TIME);
  };

  window.onload = resetTimer;
  window.onclick = resetTimer; // catches touchpad clicks as well
  window.onkeydown = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer; // catches touchscreen presses as well
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well
  window.addEventListener("scroll", resetTimer, true);

  console.log(`Idle consequences function is running rn 🤪`);
};

export const capitalize = (text) =>
  text?.replace(/^\w/, (c) => c.toUpperCase());

export const updateProps = (state, { props }) => ({ ...state, ...props });
