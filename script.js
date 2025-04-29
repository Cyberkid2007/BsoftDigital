window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

document.getElementById("terminal-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let input = this.value.toLowerCase();
        let outputDiv = document.getElementById("terminal-output");
        let response = "[ERROR] Unknown command";

        if (input === "ls") response = "Desktop  Documents  Downloads  Pictures";
        else if (input === "whoami") response = "root@yourname:~# You are a badass software engineer 🚀";
        else if (input === "cd") response ="sorry the comand is not yet available"
        else if (input ==="clear") response ="we are upgrading on that please wait "
        else if (input ==="hello")response ="Hello ther im cyberverse"
        else if (input === "exit") response = "Closing terminal...";

        outputDiv.innerHTML += `<p>> ${input}</p><p>${response}</p>`;
        this.value = "";
    }
});
