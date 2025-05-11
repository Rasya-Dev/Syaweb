document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const heartsContainer = document.getElementById('heartsContainer');
    const persuasionText = document.getElementById('persuasionText');
    const bgMusic = document.getElementById('bgMusic');
    const creatorName = document.getElementById('creatorName');
    
    let escapeCount = 0;
    let musicPlaying = false;
    
    // Set creator name from URL parameter or default
    const urlParams = new URLSearchParams(window.location.search);
    creatorName.textContent = urlParams.get('name') || 'Kamu';
    
    // Create initial floating hearts
    createHearts(8);
    
    // Music toggle on first interaction
    document.body.addEventListener('click', function initMusic() {
        if (!musicPlaying) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
            musicPlaying = true;
        }
        document.body.removeEventListener('click', initMusic);
    }, { once: true });
    
    noBtn.addEventListener('mouseover', function() {
        escapeCount++;
        
        // Make button escape to random position
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate maximum possible positions
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        // Generate random position within container
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Create more hearts when trying to escape
        createHearts(5);
        
        // Make button smaller each escape attempt
        const currentSize = parseFloat(getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = (currentSize * 0.8) + 'px';
        
        // After 3 escape attempts, disable the "No" button
        if (escapeCount >= 3) {
            noBtn.style.display = 'none';
            persuasionText.style.display = 'block';
            
            // Create celebration hearts
            createHearts(15);
        }
    });
    
    yesBtn.addEventListener('click', function() {
        // Create celebration hearts before redirecting
        createHearts(20);
        
        // Change button text temporarily
        yesBtn.textContent = 'Yeyyy! 💖';
        yesBtn.style.backgroundColor = '#e91e63';
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.location.href = `https://wa.me/6289521644380?text=Aku%20mau%20jadi%20pacarmu%20💖%20-%20${encodeURIComponent(creatorName.textContent)}`;
        }, 1500);
    });
    
    function createHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Random position in container
                const containerRect = document.querySelector('.container').getBoundingClientRect();
                const x = Math.random() * containerRect.width;
                const y = containerRect.height + 20;
                
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.style.animationDelay = (Math.random() * 2) + 's';
                heart.style.opacity = '0.8';
                heart.style.width = (15 + Math.random() * 20) + 'px';
                heart.style.height = heart.style.width;
                
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 100);
        }
    }
});