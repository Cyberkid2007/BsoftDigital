// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal-container');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    
    // Create the terminal show button
    const showBtn = document.createElement('button');
    showBtn.className = 'terminal-show-btn';
    showBtn.textContent = '> Terminal';
    showBtn.style.position = 'fixed';
    showBtn.style.bottom = '70px';
    showBtn.style.left = '20px';
    showBtn.style.background = 'rgba(0, 0, 0, 0.7)';
    showBtn.style.color = '#33ff33';
    showBtn.style.border = '1px solid #33ff33';
    showBtn.style.borderRadius = '5px';
    showBtn.style.padding = '5px 10px';
    showBtn.style.fontFamily = '"Courier New", monospace';
    showBtn.style.cursor = 'pointer';
    showBtn.style.zIndex = '9';
    showBtn.style.opacity = '0';
    showBtn.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(showBtn);
    
    // Set up responsive positioning for the show button (matches terminal media queries)
    function updateButtonPosition() {
        if (window.innerWidth <= 480) {
            showBtn.style.left = '50%';
            showBtn.style.transform = 'translateX(-50%)';
            showBtn.style.bottom = '80px';
        } else if (window.innerWidth <= 768) {
            showBtn.style.left = '10px';
            showBtn.style.transform = '';
            showBtn.style.bottom = '80px';
        } else if (window.innerHeight <= 500 && window.innerWidth > window.innerHeight) {
            // Landscape mode
            showBtn.style.left = '20px';
            showBtn.style.transform = '';
            showBtn.style.bottom = '60px';
        } else {
            showBtn.style.left = '20px';
            showBtn.style.transform = '';
            showBtn.style.bottom = '70px';
        }
    }
    
    // Update position on resize
    window.addEventListener('resize', updateButtonPosition);
    updateButtonPosition(); // Initial positioning
    
    // Show terminal when button is clicked
    showBtn.addEventListener('click', function() {
        terminal.style.opacity = '1';
        terminal.style.visibility = 'visible';
        terminal.style.transform = terminal.style.transform.includes('translateX') ? 
                                   'translateX(-50%)' : ''; // Maintain horizontal centering if needed
        showBtn.style.opacity = '0';
        resetAutoHideTimer();
        
        // Focus the input after showing terminal
        setTimeout(() => {
            terminalInput.focus();
        }, 300);
    });
    
    let hideTimeout;
    
    // Function to start/reset the auto-hide timer
    function resetAutoHideTimer() {
        // Clear any existing timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        // Set new timeout - hide after 5 seconds
        hideTimeout = setTimeout(function() {
            // Hide terminal
            terminal.style.opacity = '0';
            
            // Add transform based on screen size
            if (window.innerWidth <= 480) {
                // Small mobile - maintain horizontal centering
                terminal.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                // Regular transform for other sizes
                terminal.style.transform = 'translateY(20px)';
            }
            
            terminal.style.visibility = 'hidden';
            
            // Show the button after terminal is hidden
            setTimeout(function() {
                showBtn.style.opacity = '1';
            }, 500);
        }, 5000); // 5 seconds
    }
    
    // Reset timer on any interaction with the terminal
    terminal.addEventListener('mousemove', resetAutoHideTimer);
    terminal.addEventListener('click', resetAutoHideTimer);
    terminal.addEventListener('touchstart', resetAutoHideTimer, { passive: true });
    
    // Prevent auto-hide when typing
    terminalInput.addEventListener('focus', function() {
        // Clear timeout while input is focused
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
    });
    
    terminalInput.addEventListener('blur', function() {
        // Resume auto-hide when input loses focus
        resetAutoHideTimer();
    });
    
    // Handle terminal input commands
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            processCommand(command);
            terminalInput.value = '';
            resetAutoHideTimer(); // Reset timer after command
        }
    });
    
    // Function to process terminal commands
    function processCommand(command) {
        // Add the command to the output
        terminalOutput.textContent += '\n' + command;
        
        // Process command (you can add your custom command handling here)
        let response;
        
        switch(command.toLowerCase()) {
            case 'help':
                response = 'Available commands:\nhelp - Show this help\nabout - About me\nclear - Clear terminal\nprojects - List projects';
                break;
            case 'about':
                response = 'BsoftDigital - Building scalable & efficient software solutions.';
                break;
            case 'clear':
                terminalOutput.textContent = 'root@commander:~#';
                return;
            case 'projects':
                response = 'Projects:\n1. Security Management System\n2. Blog and news site';
                break;
            default:
                response = `Command not found: ${command}`;
        }
        
        // Add response with a slight delay for realistic effect
        setTimeout(() => {
            terminalOutput.textContent += '\n' + response + '\nroot@commander:~# ';
            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 300);
    }
    
    // Initial timer setup
    resetAutoHideTimer();
});