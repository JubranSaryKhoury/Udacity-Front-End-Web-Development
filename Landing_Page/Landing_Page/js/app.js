document.addEventListener("DOMContentLoaded", function() {
  // List of sections
  const sections = ["france", "italy", "belgium", "romania"];
  const navList = document.getElementById('nav-list');

  // Create navigation buttons for each section
  sections.forEach(section => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'button';
    button.setAttribute('data-section', section);
    button.innerHTML = section.charAt(0).toUpperCase() + section.slice(1);
    li.appendChild(button);
    navList.appendChild(li);
  });

  const buttons = document.querySelectorAll(".button");

  // Add click event to each button for smooth scrolling
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const section = document.querySelector(`.${button.getAttribute('data-section')}`);
      section.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Highlight the active section button when scrolling
  window.addEventListener('scroll', function() {
    let fromTop = window.scrollY;

    document.querySelectorAll('.section').forEach(section => {
      let sectionTop = section.getBoundingClientRect().top + window.scrollY;
      let sectionHeight = section.offsetHeight;
      let sectionID = section.className.split(' ')[1];

      // Check if the section is in the view
      if (fromTop >= sectionTop - sectionHeight / 3 && fromTop < sectionTop + sectionHeight - sectionHeight / 3) {
        buttons.forEach(button => {
          button.classList.remove('active');
        });
        document.querySelector(`[data-section=${sectionID}]`).classList.add('active');
      }
    });
  });
});
