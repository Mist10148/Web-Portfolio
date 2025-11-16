document.addEventListener('DOMContentLoaded', () => {
    // Define the color map for the body background
    const colorMap = {
        'profile': '#BBC863',         
        'skills-section': '#F0E491',  
        'projects-section': '#FCE6FF', 
        'hobbies-section': '#D4AF37', 
        'background-section': '#87A3B0' 
    };

    const body = document.body;
    const sections = document.querySelectorAll('#profile, #skills-section, #projects-section, #hobbies-section, #background-section');
    const navLinks = document.querySelectorAll('.nav-link'); 
    
    const updateActiveState = (sectionId) => {
        const newColor = colorMap[sectionId];
        
        if (newColor) {
            body.style.backgroundColor = newColor; 

            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`a[data-section-id="${sectionId}"]`).classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('data-section-id');
            updateActiveState(sectionId);
        });
    });

    // Define the Intersection Observer Options
    const options = {
        root: null, 
        rootMargin: '-100px 0px -60% 0px', 
        threshold: 0 
    };

    // Create the Observer Callback Function
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveState(sectionId);
            }
        });
    }, options);

    // Start Observing Each Section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    if (sections.length > 0) {
        updateActiveState(sections[0].id);
    }
});