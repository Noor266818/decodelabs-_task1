
// MOODSPACE DASHBOARD - INTERACTIVE CORE LOGIC (THEMES, TIMER, & TO-DO)
document.addEventListener("DOMContentLoaded", () => {
    
    /* 
     THEME VIBE SWITCHER LOGIC */
    const themeButtons = document.querySelectorAll(".theme_buttons button");
    const body = document.body;

    const resetThemes = () => {
        body.classList.remove("nature-theme", "rain-theme", "cyberpunk-theme");
    };

    if (themeButtons[0]) {
        themeButtons[0].addEventListener("click", () => { resetThemes(); body.classList.add("nature-theme"); });
    }
    if (themeButtons[1]) {
        themeButtons[1].addEventListener("click", () => { resetThemes(); body.classList.add("rain-theme"); });
    }
    if (themeButtons[2]) {
        themeButtons[2].addEventListener("click", () => { resetThemes(); body.classList.add("cyberpunk-theme"); });
    }

    /* 
        (Start, Pause, Reset Buttons)
    */
    const timerDisplay = document.querySelector(".timer_digits");
    const timerControlButtons = document.querySelectorAll(".timer_button button");
    
    let countdown;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isRunning = false;

    // Display formatted time (MM:SS)
    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Start Button Function
    const startTimer = () => {
        if (isRunning) return; // Pehle se chal raha ho to kuch na karein
        isRunning = true;
        
        countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(countdown);
                isRunning = false;
                alert("Time's up! Take a short break. ✨");
            }
        }, 1000);
    };

    // Pause Button Function
    const pauseTimer = () => {
        clearInterval(countdown);
        isRunning = false;
    };

    // Reset Button Function
    const resetTimer = () => {
        clearInterval(countdown);
        isRunning = false;
        timeLeft = 25 * 60; // Wapas 25 mins par set
        updateDisplay();
    };

    // Button event listeners 
    if (timerControlButtons[0]) timerControlButtons[0].addEventListener("click", startTimer);  // Start
    if (timerControlButtons[1]) timerControlButtons[1].addEventListener("click", pauseTimer);  // Pause
    if (timerControlButtons[2]) timerControlButtons[2].addEventListener("click", resetTimer);  // Reset

    // Initial load pe standard timing display show ho
    updateDisplay();


    
  //TO-DO LIST LOGIC (Add Task & Delete Feature)

    const todoInput = document.querySelector(".todo_cards input[type='text']");
    const todoAddBtn = document.querySelector(".todo_cards button");
    const todoList = document.querySelector(".todo_cards ul");

    const addTask = () => {
        const taskText = todoInput.value.trim();
        
        if (taskText === "") {
            alert("Kuch to likho boss! Empty task add nahi ho sakta.");
            return;
        }

        
        const li = document.createElement("li");
        li.textContent = taskText;

        // Task par click karne se usay complete strike effect dene ke liye (Optional)
        li.addEventListener("click", () => {
            li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
            li.style.opacity = li.style.opacity === "0.5" ? "1" : "0.5";
        });

        
        li.addEventListener("dblclick", () => {
            todoList.removeChild(li);
        });

        
        todoList.appendChild(li);
        todoInput.value = "";
    };

    // Click trigger for Add Button
    if (todoAddBtn) {
        todoAddBtn.addEventListener("click", addTask);
    }

    // Input box Logic
    if (todoInput) {
        todoInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                addTask();
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const moodButtons = document.querySelectorAll(".mood-btn");
    const quoteBox = document.getElementById("mood-quote");

    // Mood data 
    const moodData = {
        happy: {
            quote: "Aww, seeing you happy makes the dashboard glow! Keep riding this positive wave and smash those tasks today! ✨",
            theme: "nature-theme" // Green vibrant vibes
        },
        sad: {
            quote: "It's completely okay to not be okay. Take a deep breath, don't pressure yourself. Just do what you can. 🌊",
            theme: "rain-theme" // Calm blue vibes
        },
        tired: {
            quote: "Your energy is valuable. If you're burnt out, consider setting the timer to a short 5-minute break right now. Reset. 🥱",
            theme: "rain-theme" // Relaxing tones
        },
        focused: {
            quote: "Deep work mode engaged. Eliminate distractions, lock in, and let's turn intentions into reality. You've got this. 🧠",
            theme: "cyberpunk-theme" // Cyber/Tech focus mode
        },
        motivated: {
            quote: "Absolute powerhouse energy! 🔥 Channel this fire straight into your top To-Do task right now. Nothing can stop you!",
            theme: "cyberpunk-theme" // High energy synthwave vibes
        }
    };

    moodButtons.forEach(button => {
        button.addEventListener("click", () => {
            //  Remove active status from other emoji buttons
            moodButtons.forEach(btn => btn.classList.remove("active"));
            
            //  Add active class to clicked emoji
            button.classList.add("active");

            // Get mood type
            const selectedMood = button.getAttribute("data-mood");

            // Update the quote 
            quoteBox.style.opacity = 0;
            setTimeout(() => {
                quoteBox.textContent = moodData[selectedMood].quote;
                quoteBox.style.opacity = 1;
            }, 200);

            // 5. AUTO-THEME CHANGE: Automatically matches the body theme with the mood
            document.body.className = ""; // Purani saari themes reset
            document.body.classList.add(moodData[selectedMood].theme);
        });
    });
});