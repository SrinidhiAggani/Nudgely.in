document.addEventListener('DOMContentLoaded', () => {
    // Attempt to load saved results from onboarding
    const savedDataStr = localStorage.getItem('nudgeQuizData');
    if (savedDataStr) {
        try {
            const data = JSON.parse(savedDataStr);
            const state = data.state || {};
            
            // Re-run match logic to get the same results
            let field = 'tech';
            if (state.q2c === 'medicine' || state.q3s === 'pcb' || state.q2i === 'pcb') field = 'medicine';
            else if (state.q2c === 'business' || state.q3s === 'commerce' || state.q2i === 'commerce') field = 'business';
            else if (state.q2c === 'arts' || state.q3s === 'arts' || state.q2i === 'arts') field = 'arts';
            else if (state.q2c === 'law') field = 'law';
            
            let techPref = state.shared_tech || 'both';
            
            const careerDB = {
                medicine: {
                    tech: [{ title: "Biomedical Engineer", score: 94 }, { title: "Clinical Researcher", score: 88 }, { title: "Radiologist", score: 81 }],
                    people: [{ title: "Cardiac Surgeon", score: 96 }, { title: "Pediatrician", score: 89 }, { title: "Psychiatrist", score: 84 }],
                    both: [{ title: "General Physician", score: 92 }, { title: "Hospital Administrator", score: 87 }, { title: "Neurologist", score: 82 }]
                },
                business: {
                    tech: [{ title: "Quantitative Analyst", score: 95 }, { title: "Financial Architect", score: 88 }, { title: "Operations Manager", score: 83 }],
                    people: [{ title: "Marketing Director", score: 94 }, { title: "HR Business Partner", score: 89 }, { title: "Sales Executive", score: 82 }],
                    both: [{ title: "Management Consultant", score: 93 }, { title: "Investment Banker", score: 87 }, { title: "Entrepreneur", score: 84 }]
                },
                arts: {
                    tech: [{ title: "UX/UI Designer", score: 95 }, { title: "Technical Writer", score: 87 }, { title: "3D Animator", score: 82 }],
                    people: [{ title: "Creative Director", score: 94 }, { title: "Public Relations Manager", score: 89 }, { title: "Journalist", score: 83 }],
                    both: [{ title: "Product Designer", score: 92 }, { title: "Brand Strategist", score: 88 }, { title: "Art Director", score: 81 }]
                },
                law: {
                    tech: [{ title: "Intellectual Property Lawyer", score: 93 }, { title: "Cybersecurity Analyst", score: 88 }, { title: "Legal Tech Founder", score: 82 }],
                    people: [{ title: "Criminal Defense Attorney", score: 94 }, { title: "Family Lawyer", score: 87 }, { title: "Human Rights Advocate", score: 84 }],
                    both: [{ title: "Corporate Lawyer", score: 95 }, { title: "Judge", score: 86 }, { title: "Policy Advisor", score: 81 }]
                },
                tech: {
                    tech: [{ title: "Software Engineer", score: 96 }, { title: "Data Scientist", score: 90 }, { title: "Cloud Architect", score: 85 }],
                    people: [{ title: "Product Manager", score: 94 }, { title: "Scrum Master", score: 88 }, { title: "Developer Advocate", score: 83 }],
                    both: [{ title: "Engineering Manager", score: 95 }, { title: "Technical Co-founder", score: 89 }, { title: "Solutions Architect", score: 82 }]
                }
            };
            
            let recs = careerDB[field][techPref];
            
            // Populate active pathway (Top Match)
            let topMatch = recs[0];
            
            // Check if they had a dream career that beat the top match
            let dreamInput = state.someidea_q1 || state.noidea_text;
            if (dreamInput && dreamInput.trim().length > 0) {
                let careerName = dreamInput.trim().split(/[\.,;\n]/)[0].split(/because|since|as I|which/i)[0].trim();
                let words = careerName.split(' ');
                if (words.length > 5) careerName = words.slice(0, 5).join(' ');
                careerName = careerName.replace(/\b\w/g, l => l.toUpperCase());
                
                let dreamScore = Math.min(74, Math.max(45, careerName.length * 3 + 30));
                
                // Set the user's dream career as their active path in the dashboard!
                topMatch = { title: careerName, score: dreamScore };
            }
            
            // Set user details
            let eduStr = "Unknown";
            if (state.q1 === 'school') eduStr = "High School Student";
            else if (state.q1 === 'inter') eduStr = "Intermediate Student";
            else if (state.q1 === 'college') eduStr = "College Student";
            
            document.getElementById('dash-user-edu').textContent = eduStr + ' • Enrolled 2026';
            
            let specificEdu = "";
            if (state.q2s) specificEdu = "Grade: " + state.q2s.replace('_', '-');
            else if (state.q2c) specificEdu = "Field: " + state.q2c;
            else if (state.q2i) specificEdu = "Stream: " + state.q2i;
            
            document.getElementById('dash-edu-detail').textContent = `${eduStr} ${specificEdu ? '('+specificEdu+')' : ''}`;
            
            let interest = state.shared_tech === 'tech' ? 'Tools & Systems' : state.shared_tech === 'people' ? 'People & Strategy' : 'Balanced';
            document.getElementById('dash-interest-detail').textContent = interest;
            
            // Populate additional details dynamically
            const setDetail = (id, val) => {
                const el = document.getElementById(id);
                if (el) {
                    if (val) {
                        el.textContent = val;
                        el.parentElement.style.display = 'flex';
                    } else {
                        el.parentElement.style.display = 'none';
                    }
                }
            };

            const stageLabels = {
                'no_idea': "No idea where to start",
                'some_idea': "Some thoughts, exploring options",
                'need_clarity': "Have a direction, need clarity"
            };
            setDetail('dash-career-stage', state.shared_journey ? stageLabels[state.shared_journey] : null);

            let dream = state.someidea_q1 || state.noidea_text;
            setDetail('dash-career-goal', dream ? dream.trim() : null);

            const learningStyleLabels = {
                '1': "Watching videos and following tutorials",
                '2': "Doing it hands-on and by trial & error",
                '3': "Reading in depth and taking notes",
                '4': "Having a mentor or someone to guide me",
                '5': "Teaching others or study groups"
            };
            let learningAns = state.someidea_q6 || state.noidea_q7;
            setDetail('dash-learning-style', learningAns ? learningStyleLabels[learningAns] : null);

            const availLabels = {
                '1': "Less than 2 hours/week",
                '2': "2 to 5 hours/week",
                '3': "5 to 10 hours/week",
                '4': "More than 10 hours/week"
            };
            setDetail('dash-availability', state.someidea_q4 ? availLabels[state.someidea_q4] : null);

            const motLabels = {
                '1': "Something I built or engineered",
                '2': "Someone I helped or a life I impacted",
                '3': "A problem I solved or insight I uncovered",
                '4': "Something I created that people love",
                '5': "A team or a business I grew"
            };
            let motAns = state.someidea_q8 || state.noidea_q9;
            setDetail('dash-motivation', motAns ? motLabels[motAns] : null);
            
            // Populate courses based on top match
            const courseGrid = document.getElementById('dash-courses-grid');
            courseGrid.innerHTML = `
                <div class="course-card">
                    <div class="course-thumb"></div>
                    <div class="course-info">
                        <span class="course-tag">Micro-Course</span>
                        <h4>Intro to ${topMatch.title}</h4>
                        <p class="text-muted">A deep dive into the day-to-day life of a ${topMatch.title}.</p>
                        <div class="course-progress">
                            <div class="progress-header">
                                <span>Progress</span>
                                <span>45%</span>
                            </div>
                            <div class="match-progress-bg">
                                <div class="match-progress-fill" style="width: 45%;"></div>
                            </div>
                        </div>
                        <button class="btn btn-outline" style="width: 100%; margin-top: 1rem;">Continue Course</button>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-thumb" style="background: linear-gradient(45deg, #e8735a, #ff9b8a);"></div>
                    <div class="course-info">
                        <span class="course-tag" style="background: rgba(255,255,255,0.1); color: white;">Prototype</span>
                        <h4>Build a Mini Project</h4>
                        <p class="text-muted">Apply your knowledge to build a real-world prototype.</p>
                        <div class="course-progress">
                            <div class="progress-header">
                                <span>Progress</span>
                                <span>0%</span>
                            </div>
                            <div class="match-progress-bg">
                                <div class="match-progress-fill" style="width: 0%;"></div>
                            </div>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Start Project</button>
                    </div>
                </div>
            `;

        } catch(e) {
            console.log("No valid quiz data found.");
        }
    }

    // Toggle My Details Section
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const myDetailsSection = document.getElementById('my-details-section');
    
    if (editProfileBtn && myDetailsSection) {
        editProfileBtn.addEventListener('click', () => {
            if (myDetailsSection.style.display === 'none') {
                myDetailsSection.style.display = 'block';
            } else {
                myDetailsSection.style.display = 'none';
            }
        });
    }
});
