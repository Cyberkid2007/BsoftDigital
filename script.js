// Terminal effect script
document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Simulated commands and responses
    const commands = {
        'help': 'Available commands: help, about, skills, projects, clear, contact',
        'about': 'Software engineer specializing in full-stack development and problem-solving.',
        'skills': 'JavaScript, HTML/CSS, Python, Database Management, Git, Windows & Linux',
        'projects': 'Project 1: Security Management System\nProject 2: E-Commerce Platform',
        'clear': 'clear',
        'contact': 'Email: contact@bsoftdigital.com'
    };
    
    // Initial blinking cursor effect
    let cursor = '▋';
    let cursorVisible = true;
    
    setInterval(() => {
        cursorVisible = !cursorVisible;
        if (terminalOutput.innerHTML.endsWith(cursor)) {
            terminalOutput.innerHTML = terminalOutput.innerHTML.slice(0, -1);
        } else {
            terminalOutput.innerHTML += cursor;
        }
    }, 500);
    
    // Handle command input
    terminalInput.addEventListener('keydown', function(e) {
        // Remove cursor for clean output
        if (terminalOutput.innerHTML.endsWith(cursor)) {
            terminalOutput.innerHTML = terminalOutput.innerHTML.slice(0, -1);
        }
        
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalOutput.innerHTML += `\nroot@commander:~# ${command}`;
            
            if (command in commands) {
                if (command === 'clear') {
                    terminalOutput.innerHTML = 'root@commander:~#';
                } else {
                    terminalOutput.innerHTML += `\n${commands[command]}`;
                }
            } else if (command !== '') {
                terminalOutput.innerHTML += '\nCommand not found. Type "help" for available commands.';
            }
            
            terminalOutput.innerHTML += '\nroot@commander:~#';
            
            // Clear input and scroll to bottom
            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Make sure terminal is responsive to viewport changes
    function adjustTerminalHeight() {
        const viewportHeight = window.innerHeight;
        const terminalBody = document.querySelector('.terminal-body');
        
        // Adjust terminal height based on viewport height
        if (viewportHeight < 600) {
            terminalBody.style.minHeight = '150px';
        } else if (viewportHeight < 800) {
            terminalBody.style.minHeight = '200px';
        } else {
            terminalBody.style.minHeight = '300px';
        }
    }
    
    // Set initial height and listen for resize events
    adjustTerminalHeight();
    window.addEventListener('resize', adjustTerminalHeight);
    
    // Auto-focus terminal input when clicking anywhere in terminal body
    document.querySelector('.terminal-body').addEventListener('click', function() {
        terminalInput.focus();
    });
});
