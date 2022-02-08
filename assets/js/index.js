
const elem = document.getElementById('1');

window.addEventListener('resize', reportWindowSize);
function reportWindowSize() {
    console.log(elem.offsetWidth);
    console.log(elem.offsetWidth/elem.offsetWidth);
}
