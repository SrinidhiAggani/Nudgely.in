const iconCheck = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

const quizFlow = {
    q1: {
        title: "What is your current education level?",
        subtitle: "This helps us recommend the most relevant paths for you.",
        options: [
            { value: 'school', label: "I'm still in school" },
            { value: 'inter', label: "I'm doing / finished my intermediate" },
            { value: 'college', label: "I'm in college" },
            { value: 'exploring', label: "I'm simply looking for something exciting to learn", disabled: true }
        ],
        next: (val) => val === 'school' ? 'q2s' : val === 'inter' ? 'q2i' : val === 'college' ? 'q2c' : null
    },
    // SCHOOL
    q2s: {
        title: "Which grade are you currently in?",
        options: [
            { value: '8_below', label: "Grade 8 or below" },
            { value: '9_10', label: "Grade 9 or 10" },
            { value: '11_12', label: "Grade 11 or 12" }
        ],
        next: () => 'q3s'
    },
    q3s: {
        title: "Which stream are you in or planning to choose?",
        options: [
            { value: 'pcm', label: "Science (PCM)" },
            { value: 'pcb', label: "Science (PCB)" },
            { value: 'commerce', label: "Commerce" },
            { value: 'arts', label: "Arts / Humanities" },
            { value: 'undecided', label: "I haven't decided yet" }
        ],
        next: () => 'shared_journey'
    },
    // INTER
    q2i: {
        title: "Which stream did you study in intermediate?",
        options: [
            { value: 'pcm', label: "Science (PCM)" },
            { value: 'pcb', label: "Science (PCB)" },
            { value: 'commerce', label: "Commerce" },
            { value: 'arts', label: "Arts / Humanities" }
        ],
        next: () => 'shared_journey'
    },
    // COLLEGE
    q2c: {
        title: "What are you currently studying?",
        options: [
            { value: 'engineering', label: "Engineering / Technology" },
            { value: 'medicine', label: "Medicine / Life Sciences" },
            { value: 'business', label: "Commerce / Business" },
            { value: 'arts', label: "Arts / Design / Humanities" },
            { value: 'law', label: "Law" },
            { value: 'other', label: "Other" }
        ],
        next: () => 'shared_journey'
    },
    // SHARED
    shared_journey: {
        title: "Where are you in your career journey?",
        options: [
            { value: 'no_idea', label: "I have no idea where to start", emoji: "🌫️" },
            { value: 'some_idea', label: "I have some thoughts but I'm not sure", emoji: "🤔" },
            { value: 'need_clarity', label: "I have a direction, I just need clarity", emoji: "🎯" }
        ],
        next: () => 'shared_tech'
    },
    shared_tech: {
        title: "Do you prefer working with tools, systems and ideas — or with people, teams and strategy — or both?",
        options: [
            { value: 'tech', label: "Tools, systems and ideas (technical)" },
            { value: 'people', label: "People, teams and strategy (management)" },
            { value: 'both', label: "Both equally" }
        ],
        next: (val, state) => state.shared_journey === 'no_idea' ? 'noidea_q1' : 'someidea_q1'
    },
    // NO IDEA
    noidea_q1: {
        title: "It's a free Saturday with no plans. Which sounds most like you?",
        options: [
            { value: '1', label: "Tinkering with something or building a side project" },
            { value: '2', label: "Hanging out with people and having deep conversations" },
            { value: '3', label: "Reading, researching or learning something new" },
            { value: '4', label: "Making something — art, writing, music, content" },
            { value: '5', label: "Thinking up a business idea or planning something big" }
        ],
        next: () => 'noidea_q2'
    },
    noidea_q2: {
        title: "When you're working on something difficult, what's your natural first move?",
        options: [
            { value: '1', label: "Break it into steps and make a plan" },
            { value: '2', label: "Talk it through with someone I trust" },
            { value: '3', label: "Just start building and figure it out" },
            { value: '4', label: "Sketch ideas until something clicks" },
            { value: '5', label: "Find who can help and bring them together" }
        ],
        next: () => 'noidea_q3'
    },
    noidea_q3: {
        title: "Which of these problems would you actually enjoy solving?",
        options: [
            { value: '1', label: "Designing or building a system that works really well" },
            { value: '2', label: "Helping someone navigate a tough personal situation" },
            { value: '3', label: "Finding patterns in messy data or information" },
            { value: '4', label: "Creating something that looks or sounds beautiful" },
            { value: '5', label: "Growing a team or an idea into something big" }
        ],
        next: () => 'noidea_q4'
    },
    noidea_q4: {
        title: "Imagine your ideal workday 5 years from now. Which feels most like you?",
        options: [
            { value: '1', label: "Deep in code, research or technical problem solving" },
            { value: '2', label: "In conversations, meetings or helping people all day" },
            { value: '3', label: "Analyzing, strategizing and making data-driven decisions" },
            { value: '4', label: "Creating, designing or producing something from scratch" },
            { value: '5', label: "Leading a team or running my own thing" }
        ],
        next: () => 'noidea_q5'
    },
    noidea_q5: {
        title: "Which of these have ever made you lose track of time?",
        options: [
            { value: '1', label: "Coding, math, science experiments or building things" },
            { value: '2', label: "Talking to people, volunteering or understanding emotions" },
            { value: '3', label: "Reading case studies, watching documentaries or researching" },
            { value: '4', label: "Drawing, writing, photography, music or performing" },
            { value: '5', label: "Planning events, leading groups or pitching ideas" }
        ],
        next: () => 'noidea_q6'
    },
    noidea_q6: {
        title: "What would make you feel most proud at the end of a workday?",
        options: [
            { value: '1', label: "I shipped something that actually works" },
            { value: '2', label: "I genuinely helped someone today" },
            { value: '3', label: "I figured out what nobody else could" },
            { value: '4', label: "I made something beautiful or meaningful" },
            { value: '5', label: "My team moved closer to the goal" }
        ],
        next: () => 'noidea_q7'
    },
    noidea_q7: {
        title: "How do you learn best?",
        options: [
            { value: '1', label: "Watching videos and following tutorials" },
            { value: '2', label: "Doing it hands-on and learning by trial and error" },
            { value: '3', label: "Reading in depth and taking notes" },
            { value: '4', label: "Having a mentor or someone to guide me" },
            { value: '5', label: "Teaching others or being part of a study group" }
        ],
        next: () => 'noidea_q8'
    },
    noidea_q8: {
        title: "Which excites you more?",
        options: [
            { value: '1', label: "Stability and a clear path forward" },
            { value: '2', label: "Uncertainty with a big potential reward" },
            { value: '3', label: "Somewhere in between" }
        ],
        next: () => 'noidea_q9'
    },
    noidea_q9: {
        title: "At the end of a big project, what would you most want to show for your work?",
        options: [
            { value: '1', label: "Something I built or engineered" },
            { value: '2', label: "Someone I helped or a life I impacted" },
            { value: '3', label: "A problem I solved or an insight I uncovered" },
            { value: '4', label: "Something I created that people love" },
            { value: '5', label: "A team or a business I grew" }
        ],
        next: () => 'noidea_q10'
    },
    noidea_q10: {
        title: "Even though you're unsure, is there any specific career or field you've secretly been considering?",
        options: [
            { value: 'yes', label: "Yes, I have something in mind" },
            { value: 'no', label: "No, I'm completely open" }
        ],
        next: (val) => val === 'yes' ? 'noidea_text' : 'result'
    },
    noidea_text: {
        title: "What specific career or field have you been considering?",
        subtitle: "Just type the career name (e.g. Software Engineer, Product Manager)",
        type: 'text',
        next: () => 'result'
    },
    // SOME IDEA SET
    someidea_q1: {
        title: "What specific career or field are you leaning toward?",
        subtitle: "Just type the career name (e.g. Software Engineer, Product Manager)",
        type: 'text',
        next: () => 'someidea_q2'
    },
    someidea_q2: {
        title: "Have you started learning or exploring anything in this field yet?",
        options: [
            { value: '1', label: "Yes, I've done courses, projects or internships" },
            { value: '2', label: "I've watched videos and read about it casually" },
            { value: '3', label: "Not yet, I'm still figuring it out" }
        ],
        next: () => 'someidea_q3'
    },
    someidea_q3: {
        title: "What is your main goal right now?",
        options: [
            { value: '1', label: "Get an internship or job in this field" },
            { value: '2', label: "Build a project or portfolio" },
            { value: '3', label: "Start something of my own" },
            { value: '4', label: "Just understand the field better before committing" }
        ],
        next: () => 'someidea_q4'
    },
    someidea_q4: {
        title: "How many hours a week can you realistically commit?",
        options: [
            { value: '1', label: "Less than 2 hours" },
            { value: '2', label: "2 to 5 hours" },
            { value: '3', label: "5 to 10 hours" },
            { value: '4', label: "More than 10 hours" }
        ],
        next: () => 'someidea_q5'
    },
    someidea_q5: {
        title: "Where do you usually get stuck when learning something new?",
        options: [
            { value: '1', label: "When it gets too technical or complex" },
            { value: '2', label: "When I don't see results quickly enough" },
            { value: '3', label: "When I feel like I'm learning alone with no support" },
            { value: '4', label: "When I'm not sure if I'm learning the right things" },
            { value: '5', label: "I usually push through and figure it out" }
        ],
        next: () => 'someidea_q6'
    },
    someidea_q6: {
        title: "How do you learn best?",
        options: [
            { value: '1', label: "Watching videos and following tutorials" },
            { value: '2', label: "Doing it hands-on and learning by trial and error" },
            { value: '3', label: "Reading in depth and taking notes" },
            { value: '4', label: "Having a mentor or someone to guide me" },
            { value: '5', label: "Teaching others or being part of a study group" }
        ],
        next: () => 'someidea_q7'
    },
    someidea_q7: {
        title: "Which excites you more?",
        options: [
            { value: '1', label: "Stability and a clear path forward" },
            { value: '2', label: "Uncertainty with a big potential reward" },
            { value: '3', label: "Somewhere in between" }
        ],
        next: () => 'someidea_q8'
    },
    someidea_q8: {
        title: "At the end of a big project, what would you most want to show for your work?",
        options: [
            { value: '1', label: "Something I built or engineered" },
            { value: '2', label: "Someone I helped or a life I impacted" },
            { value: '3', label: "A problem I solved or an insight I uncovered" },
            { value: '4', label: "Something I created that people love" },
            { value: '5', label: "A team or a business I grew" }
        ],
        next: () => 'result'
    }
};

let currentStep = 'q1';
let historyStack = [];
const state = {};

document.addEventListener('DOMContentLoaded', () => {
    // Check for reset parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        localStorage.removeItem('nudgeQuizData');
        localStorage.removeItem('nudgeQuizFinished');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Load state from local storage if it exists
    const savedData = localStorage.getItem('nudgeQuizData');
    const isFinished = localStorage.getItem('nudgeQuizFinished');

    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            Object.assign(state, parsed.state);
            historyStack = parsed.historyStack || [];
            currentStep = parsed.currentStep || 'q1';
        } catch (e) {
            console.error("Could not load saved state", e);
        }
    }

    if (isFinished === 'true') {
        // If they already finished the quiz, jump straight to results
        document.getElementById('quiz-container').style.display = 'none';
        showResults();
    } else {
        // Initial Render from wherever they left off
        renderStep(currentStep);
        updateProgressBar();
    }
    
    // Bind Next button
    document.getElementById('next-btn').addEventListener('click', () => {
        const stepDef = quizFlow[currentStep];
        
        // Save text answer if it's a text input
        if (stepDef.type === 'text') {
            const val = document.getElementById('text-answer').value.trim();
            if (val) state[currentStep] = val;
        }

        const nextStepId = stepDef.next(state[currentStep], state);
        if (nextStepId) {
            historyStack.push(currentStep);
            
            if (nextStepId === 'result') {
                localStorage.setItem('nudgeQuizFinished', 'true');
                localStorage.setItem('nudgeQuizData', JSON.stringify({ state, historyStack, currentStep: 'result' }));
                showLoading();
            } else {
                localStorage.setItem('nudgeQuizData', JSON.stringify({ state, historyStack, currentStep: nextStepId }));
                transitionToStep(nextStepId);
            }
        }
    });

    // Bind Back button
    document.getElementById('back-btn').addEventListener('click', () => {
        if (historyStack.length > 0) {
            const prevStep = historyStack.pop();
            localStorage.setItem('nudgeQuizData', JSON.stringify({ state, historyStack, currentStep: prevStep }));
            transitionToStep(prevStep, true);
        }
    });
});

function transitionToStep(stepId, isBack = false) {
    const container = document.getElementById('quiz-container');
    
    // Apply slide out animation
    container.classList.remove('slide-in', 'slide-in-reverse');
    container.classList.add(isBack ? 'slide-out-reverse' : 'slide-out');
    
    setTimeout(() => {
        currentStep = stepId;
        renderStep(stepId);
        updateProgressBar();
        
        // Apply slide in animation
        container.classList.remove('slide-out', 'slide-out-reverse');
        container.classList.add(isBack ? 'slide-in-reverse' : 'slide-in');
    }, 300); // 300ms matches the CSS animation duration
}

function renderStep(stepId) {
    const stepDef = quizFlow[stepId];
    
    document.getElementById('q-title').textContent = stepDef.title;
    
    const subtitleEl = document.getElementById('q-subtitle');
    if (stepDef.subtitle) {
        subtitleEl.textContent = stepDef.subtitle;
        subtitleEl.style.display = 'block';
    } else {
        subtitleEl.style.display = 'none';
    }

    const optionsGrid = document.getElementById('options-grid');
    const textContainer = document.getElementById('text-input-container');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    
    // Show back button if not first step
    backBtn.style.display = historyStack.length > 0 ? 'inline-block' : 'none';

    // Render Options vs Text
    if (stepDef.type === 'text') {
        optionsGrid.style.display = 'none';
        textContainer.style.display = 'block';
        
        const textArea = document.getElementById('text-answer');
        textArea.value = state[stepId] || '';
        
        textArea.oninput = () => {
            nextBtn.disabled = textArea.value.trim().length === 0;
        };
        nextBtn.disabled = textArea.value.trim().length === 0;
        
    } else {
        optionsGrid.style.display = 'grid';
        textContainer.style.display = 'none';
        
        optionsGrid.innerHTML = '';
        let hasSelection = false;

        stepDef.options.forEach(opt => {
            const card = document.createElement('div');
            card.className = `option-card ${state[stepId] === opt.value ? 'active' : ''} ${opt.disabled ? 'disabled' : ''}`;
            if (state[stepId] === opt.value) hasSelection = true;
            
            // Generate icon block if emoji provided
            const iconHTML = opt.emoji ? `<div class="option-icon" style="font-size: 1.2rem; font-style: normal;">${opt.emoji}</div>` : '';

            card.innerHTML = `
                ${iconHTML}
                <div class="option-content">
                    <h3>${opt.label}</h3>
                </div>
                <div class="check-icon">
                    ${iconCheck}
                </div>
            `;
            
            if (!opt.disabled) {
                card.addEventListener('click', () => {
                    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    state[stepId] = opt.value;
                    nextBtn.disabled = false;
                });
            }
            optionsGrid.appendChild(card);
        });
        
        nextBtn.disabled = !hasSelection;
    }
}

function updateProgressBar() {
    // Determine path length for accurate progress tracking
    let totalSteps = 14; 
    if (state.q1 === 'school') totalSteps = 15;
    
    // Smooth progress approximation
    let progress = Math.min(100, Math.round(((historyStack.length + 1) / totalSteps) * 100));
    document.querySelector('.progress-bar').style.width = progress + '%';
    document.querySelector('.progress-indicator').textContent = `Step ${historyStack.length + 1}`;
}

function showLoading() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('loading-container').classList.remove('hidden');
    document.getElementById('loading-container').style.display = 'flex';
    document.querySelector('.progress-bar').style.width = '100%';
    document.querySelector('.progress-indicator').textContent = 'Analyzing...';
    
    setTimeout(() => {
        document.getElementById('loading-container').style.display = 'none';
        showResults();
    }, 2500);
}

function showResults() {
    document.getElementById('results-container').classList.remove('hidden');
    document.getElementById('results-container').style.display = 'block';
    document.querySelector('.progress-indicator').textContent = 'Your Matches';
    
    // Fire confetti pop!
    setTimeout(() => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 60,
                spread: 50,
                origin: { y: 0.55 },
                colors: ['#e8735a', '#6c5ce7', '#a29bfe', '#74b9ff', '#ff7675'], // Twilight/Jewel palette
                ticks: 80,
                gravity: 1.5,
                scalar: 0.8
            });
        }
    }, 150);
    
    // Dynamic Match Logic
    let field = 'tech';
    if (state.q2c === 'medicine' || state.q3s === 'pcb' || state.q2i === 'pcb') field = 'medicine';
    else if (state.q2c === 'business' || state.q3s === 'commerce' || state.q2i === 'commerce') field = 'business';
    else if (state.q2c === 'arts' || state.q3s === 'arts' || state.q2i === 'arts') field = 'arts';
    else if (state.q2c === 'law') field = 'law';
    
    let techPref = state.shared_tech || 'both';
    
    const careerDB = {
        medicine: {
            tech: [
                { title: "Biomedical Engineer", desc: "Designing equipment and devices to solve clinical problems.", score: 94 },
                { title: "Clinical Researcher", desc: "Leading trials to discover new medical treatments.", score: 88 },
                { title: "Radiologist", desc: "Using advanced imaging technology to diagnose diseases.", score: 81 }
            ],
            people: [
                { title: "Cardiac Surgeon", desc: "Performing life-saving procedures and leading surgical teams.", score: 96 },
                { title: "Pediatrician", desc: "Providing medical care and building relationships with children.", score: 89 },
                { title: "Psychiatrist", desc: "Diagnosing and treating mental health disorders through therapy.", score: 84 }
            ],
            both: [
                { title: "General Physician", desc: "Providing primary healthcare and diagnosing patient illnesses.", score: 92 },
                { title: "Hospital Administrator", desc: "Managing medical facilities and optimizing healthcare delivery.", score: 87 },
                { title: "Neurologist", desc: "Treating complex disorders of the nervous system.", score: 82 }
            ]
        },
        business: {
            tech: [
                { title: "Quantitative Analyst", desc: "Using math and statistics to inform financial trading decisions.", score: 95 },
                { title: "Financial Architect", desc: "Designing complex financial systems and models.", score: 88 },
                { title: "Operations Manager", desc: "Optimizing supply chains and business systems.", score: 83 }
            ],
            people: [
                { title: "Marketing Director", desc: "Leading campaigns and understanding consumer psychology.", score: 94 },
                { title: "HR Business Partner", desc: "Aligning human capital with strategic business goals.", score: 89 },
                { title: "Sales Executive", desc: "Building relationships and closing high-value deals.", score: 82 }
            ],
            both: [
                { title: "Management Consultant", desc: "Solving complex business problems for enterprise clients.", score: 93 },
                { title: "Investment Banker", desc: "Advising corporations on mergers, acquisitions, and capital.", score: 87 },
                { title: "Entrepreneur", desc: "Building and scaling your own business from scratch.", score: 84 }
            ]
        },
        arts: {
            tech: [
                { title: "UX/UI Designer", desc: "Designing beautiful, functional digital experiences.", score: 95 },
                { title: "Technical Writer", desc: "Translating complex technical concepts into clear documentation.", score: 87 },
                { title: "3D Animator", desc: "Using software to create lifelike animations and models.", score: 82 }
            ],
            people: [
                { title: "Creative Director", desc: "Leading creative teams to produce compelling media.", score: 94 },
                { title: "Public Relations Manager", desc: "Shaping public perception and managing media communications.", score: 89 },
                { title: "Journalist", desc: "Investigating stories and interviewing people to uncover truth.", score: 83 }
            ],
            both: [
                { title: "Product Designer", desc: "Balancing user needs, aesthetics, and business goals.", score: 92 },
                { title: "Brand Strategist", desc: "Developing the visual and psychological identity of a brand.", score: 88 },
                { title: "Art Director", desc: "Guiding the visual style and design of publications or products.", score: 81 }
            ]
        },
        law: {
            tech: [
                { title: "Intellectual Property Lawyer", desc: "Protecting patents, trademarks, and technological innovations.", score: 93 },
                { title: "Cybersecurity Analyst", desc: "Protecting networks and advising on digital compliance.", score: 88 },
                { title: "Legal Tech Founder", desc: "Building software to disrupt the legal industry.", score: 82 }
            ],
            people: [
                { title: "Criminal Defense Attorney", desc: "Advocating for individuals in the justice system.", score: 94 },
                { title: "Family Lawyer", desc: "Helping clients navigate sensitive domestic legal matters.", score: 87 },
                { title: "Human Rights Advocate", desc: "Fighting for justice and policy changes on a global scale.", score: 84 }
            ],
            both: [
                { title: "Corporate Lawyer", desc: "Advising businesses on complex transactions and compliance.", score: 95 },
                { title: "Judge", desc: "Presiding over court proceedings and upholding the law.", score: 86 },
                { title: "Policy Advisor", desc: "Researching and drafting legislation for government bodies.", score: 81 }
            ]
        },
        tech: {
            tech: [
                { title: "Software Engineer", desc: "Writing code and building technical solutions from scratch.", score: 96 },
                { title: "Data Scientist", desc: "Analyzing complex datasets to find actionable insights.", score: 90 },
                { title: "Cloud Architect", desc: "Designing scalable cloud infrastructure for massive apps.", score: 85 }
            ],
            people: [
                { title: "Product Manager", desc: "Leading teams and building systems that solve real problems.", score: 94 },
                { title: "Scrum Master", desc: "Facilitating agile development and removing team blockers.", score: 88 },
                { title: "Developer Advocate", desc: "Bridging the gap between engineering and the developer community.", score: 83 }
            ],
            both: [
                { title: "Engineering Manager", desc: "Leading technical teams while staying close to the architecture.", score: 95 },
                { title: "Technical Co-founder", desc: "Building the MVP and leading product strategy for a startup.", score: 89 },
                { title: "Solutions Architect", desc: "Designing complex software systems for enterprise clients.", score: 82 }
            ]
        }
    };

    let recs = careerDB[field][techPref];

    const resultsGrid = document.getElementById('results-grid');
    
    // Top 3 Matches
    let html = `
        <h3 style="margin-top: 1rem; margin-bottom: 1.5rem; text-align: left;">Section 1 — Your Top Matches</h3>
        <div class="result-card slide-in">
            <h3>${recs[0].title}</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">${recs[0].desc}</p>
            <div class="result-match-percent">${recs[0].score}%</div>
            <div class="match-progress-bg"><div class="match-progress-fill" style="width: ${recs[0].score}%;"></div></div>
            <button class="btn btn-outline" onclick="startExploration('${recs[0].title}', ${recs[0].score})">Explore what it takes to become a ${recs[0].title}</button>
        </div>
        <div class="result-card slide-in" style="animation-delay: 0.1s;">
            <h3>${recs[1].title}</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">${recs[1].desc}</p>
            <div class="result-match-percent">${recs[1].score}%</div>
            <div class="match-progress-bg"><div class="match-progress-fill" style="width: ${recs[1].score}%;"></div></div>
            <button class="btn btn-outline" onclick="startExploration('${recs[1].title}', ${recs[1].score})">Explore what it takes to become a ${recs[1].title}</button>
        </div>
        <div class="result-card slide-in" style="animation-delay: 0.2s;">
            <h3>${recs[2].title}</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">${recs[2].desc}</p>
            <div class="result-match-percent">${recs[2].score}%</div>
            <div class="match-progress-bg"><div class="match-progress-fill" style="width: ${recs[2].score}%;"></div></div>
            <button class="btn btn-outline" onclick="startExploration('${recs[2].title}', ${recs[2].score})">Explore what it takes to become a ${recs[2].title}</button>
        </div>
    `;

    // Dream Career (if they typed one in)
    let dreamInput = state.someidea_q1 || state.noidea_text;
    if (dreamInput && dreamInput.trim().length > 0) {
        let careerName = dreamInput.trim();
        
        // Clean up user input in case they wrote a long sentence
        // 1. Split by punctuation (period, comma, newline)
        careerName = careerName.split(/[\.,;\n]/)[0];
        // 2. Split by "because" or "since"
        careerName = careerName.split(/because|since|as I|which/i)[0].trim();
        // 3. Limit to max 4-5 words just to be safe
        let words = careerName.split(' ');
        if (words.length > 5) {
            careerName = words.slice(0, 5).join(' ');
        }

        // Capitalize the career name nicely
        careerName = careerName.replace(/\b\w/g, l => l.toUpperCase());

        // Arbitrary score logic for prototype
        let dreamScore = Math.min(74, Math.max(45, careerName.length * 3 + 30));
        
        html += `
            <h2 style="margin-top: 3.5rem; margin-bottom: 1.5rem; text-align: left; font-size: 2rem;">Section 2 — Your Dream Career</h2>
            <div class="result-card dream-card slide-in" style="animation-delay: 0.3s;">
                <h3 style="font-size: 1.8rem; color: var(--accent-primary);">${careerName}</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 1.1rem;">Strong match on ambition, gap in hands-on technical experience.</p>
                <div class="result-match-percent" style="font-size: 1.5rem;">${dreamScore}%</div>
                <div class="match-progress-bg"><div class="match-progress-fill" style="width: ${dreamScore}%;"></div></div>
                <button class="btn btn-outline" onclick="startExploration('${careerName}', ${dreamScore})">Explore what it takes to become a ${careerName}</button>
            </div>
        `;
    }

    resultsGrid.innerHTML = html;
}

// EXPLORATION LOGIC
let exploreCareer = '';
let exploreStepIndex = 0;

const exploreQuestions = [
    {
        title: "How comfortable are you with structured learning?",
        options: ["Very comfortable", "I prefer hands-on", "I need a mentor"]
    },
    {
        title: "How much time can you realistically commit per week?",
        options: ["Less than 5 hours", "5-10 hours", "More than 10 hours"]
    },
    {
        title: "What is your biggest fear about this path?",
        options: ["Not being smart enough", "Failing after trying hard", "Losing interest"]
    }
];

function startExploration(careerName, score) {
    exploreCareer = careerName;
    exploreStepIndex = 0;

    document.getElementById('results-container').style.display = 'none';
    
    if (score > 75) {
        showRoadmap();
    } else {
        document.getElementById('quiz-container').style.display = 'flex';
        document.getElementById('back-btn').style.display = 'none';
        
        // Replace next button to avoid old listeners
        const actionsDiv = document.querySelector('#quiz-container .onboarding-actions');
        actionsDiv.innerHTML = `<button class="btn btn-primary continue-btn" id="explore-next-btn" disabled>Next</button>`;
        
        renderExploreQuestion();
    }
}

function renderExploreQuestion() {
    if (exploreStepIndex >= exploreQuestions.length) {
        showRoadmap();
        return;
    }

    const q = exploreQuestions[exploreStepIndex];
    document.getElementById('q-title').textContent = q.title;
    document.getElementById('q-subtitle').style.display = 'none';
    document.querySelector('.progress-indicator').textContent = `Deeper Dive: Q${exploreStepIndex + 1}`;
    
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.style.display = 'grid';
    document.getElementById('text-input-container').style.display = 'none';
    optionsGrid.innerHTML = '';
    
    const nextBtn = document.getElementById('explore-next-btn');
    nextBtn.disabled = true;

    // Clone and replace to prevent multiple listeners
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    q.options.forEach(optText => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerHTML = `
            <div class="option-content">
                <h3>${optText}</h3>
            </div>
            <div class="check-icon">
                ${iconCheck}
            </div>
        `;
        card.addEventListener('click', () => {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            newNextBtn.disabled = false;
        });
        optionsGrid.appendChild(card);
    });

    newNextBtn.addEventListener('click', () => {
        exploreStepIndex++;
        renderExploreQuestion();
    });
}

function showRoadmap() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.querySelector('.progress-indicator').textContent = 'Your Roadmap';
    
    document.getElementById('results-container').querySelector('.question-header').innerHTML = `
        <h2>Roadmap to ${exploreCareer}</h2>
        <p>Here is an honest look at what it takes to get there. It's a marathon, not a sprint.</p>
    `;

    const resultsGrid = document.getElementById('results-grid');
    resultsGrid.innerHTML = `
        <div class="roadmap-container slide-in">
            <div class="roadmap-card">
                <h3>Key Skills to Build</h3>
                <ul>
                    <li>Deep analytical thinking and problem structuring</li>
                    <li>Communication and stakeholder management</li>
                    <li>Technical fundamentals (system design, basic workflows)</li>
                </ul>
            </div>
            <div class="roadmap-card" style="animation-delay: 0.1s;">
                <h3>Recommended Starting Points</h3>
                <ul>
                    <li>Take a foundational course to understand the landscape</li>
                    <li>Build a small portfolio project tackling a real-world problem</li>
                    <li>Find a mentor or join a peer group for accountability</li>
                </ul>
            </div>
            <div class="roadmap-card" style="animation-delay: 0.2s;">
                <h3>Honest Timeline</h3>
                <p style="color: var(--text-muted); line-height: 1.6;">With consistent effort, you could be job-ready in <strong>18 to 24 months</strong>.</p>
            </div>
        </div>
        <div class="onboarding-actions" style="margin-top: 3rem; text-align: center; display: flex; justify-content: center; gap: 1rem;">
            <button class="btn btn-outline" onclick="localStorage.removeItem('nudgeQuizFinished'); localStorage.removeItem('nudgeQuizData'); window.location.reload();">Retake Quiz</button>
            <button class="btn btn-primary" onclick="window.location.href='dashboard.html'">Return to Dashboard</button>
        </div>
    `;
}
