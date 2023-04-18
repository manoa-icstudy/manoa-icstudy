/* Set width of all animated text to match container */
const parent = document.querySelectorAll('.animate-text');
for (let i = 0; i < parent.length; i++) {
  parent[i].style.width = `${parent[i].children[0].clientWidth}px`;
}

function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);
