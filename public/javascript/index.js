let width = document.getElementById("mySidebar").style.width = '0px'
document.getElementById("main").style.marginLeft = '0px'

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = '250px';
    document.getElementById("main").style.marginLeft = '250px';
    width = '250px';
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = '0px';
    document.getElementById("main").style.marginLeft = '0px';
    width = '0px';
  }

  function toggleNav() {
    if(width === "0px") {
        openNav();
    }else if(width === "250px") {
        closeNav();
    };
  };