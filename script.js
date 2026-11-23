/**
 * GitHub DevOps Educational Portal — Interactive Scripts
 * Target: B.Tech DevOps Mini-Project
 * Author: Student Project Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initConceptTabs();
  initWorkflowInteraction();
  initCommandFiltersAndCopy();
  initScrollTop();
  initQuiz();
});

/* ==========================================================================
   1. Navbar & Mobile Menu Interaction
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-wrapper');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile Hamburger Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active Link Highlight on Scroll using Scroll Position
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Core Concepts Tabs
   ========================================================================== */
function initConceptTabs() {
  const tabBtns = document.querySelectorAll('.concept-tabs .tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-wrapper .tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button classes
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel classes
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. Workflow Diagram & Steps Interaction
   ========================================================================== */
function initWorkflowInteraction() {
  const svgNodes = document.querySelectorAll('.svg-node');
  const stepCards = document.querySelectorAll('.step-item-card');

  // Node click highlights matching step
  svgNodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepNum = node.getAttribute('data-step');
      highlightWorkflowStep(stepNum);
    });
  });

  // Step item click highlights matching step
  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      const stepTarget = card.getAttribute('data-step-target');
      highlightWorkflowStep(stepTarget);
    });
  });

  function highlightWorkflowStep(stepNumber) {
    stepCards.forEach(c => {
      if (c.getAttribute('data-step-target') === stepNumber) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    svgNodes.forEach(n => {
      if (n.getAttribute('data-step') === stepNumber) {
        n.style.transform = 'scale(1.25)';
      } else {
        n.style.transform = 'scale(1)';
      }
    });
  }
}

/* ==========================================================================
   4. Command Filters & One-Click Copy
   ========================================================================== */
function initCommandFiltersAndCopy() {
  // Filters
  const filterBtns = document.querySelectorAll('.cmd-filter-btn');
  const commandCards = document.querySelectorAll('.command-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      commandCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Clipboard Copy with Visual Feedback
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeElement = btn.parentElement.querySelector('code');
      if (!codeElement) return;

      const textToCopy = codeElement.innerText.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.setAttribute('title', 'Copied to clipboard!');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          btn.setAttribute('title', 'Copy command');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text:', err);
      });
    });
  });
}

/* ==========================================================================
   5. Back to Top Floating Button
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   6. Interactive 10-Question Quiz System
   ========================================================================== */
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary difference between Git and GitHub?",
    options: [
      "Git is a cloud platform for code hosting; GitHub is a local command-line tool",
      "Git is a distributed version control tool; GitHub is a cloud-based hosting and collaboration service",
      "Git was developed by Microsoft; GitHub was created by Linus Torvalds",
      "Git can only track Java files; GitHub can track any programming language"
    ],
    correct: 1,
    explanation: "Git is the distributed version control system software running locally on machines, while GitHub is the cloud platform that hosts Git repositories and provides collaborative features like PRs and Issues."
  },
  {
    id: 2,
    question: "Which Git command moves changed files from the Working Directory into the Staging Area (Index)?",
    options: [
      "git commit",
      "git push",
      "git add",
      "git checkout"
    ],
    correct: 2,
    explanation: "'git add' stages modifications, preparing them to be packaged into the next commit snapshot. 'git commit' then saves that snapshot permanently."
  },
  {
    id: 3,
    question: "In the DevOps lifecycle, what is the main purpose of a Pull Request (PR) on GitHub?",
    options: [
      "To download repository files to a local server without Git installed",
      "To request peer review, run CI checks, and discuss changes before merging into target branch",
      "To immediately delete an outdated branch without approval",
      "To encrypt passwords and secret keys inside the repository"
    ],
    correct: 1,
    explanation: "Pull Requests are GitHub's cornerstone collaboration feature, allowing team members to review code diffs, run automated CI tests, and approve changes before merging into protected branches."
  },
  {
    id: 4,
    question: "What is the primary function of the '.gitignore' file in a Git repository?",
    options: [
      "To block unauthorized team members from accessing the repository",
      "To ignore Git merge conflicts and force-overwrite code",
      "To specify intentionally untracked files and folders that Git should ignore",
      "To list all branches that have been merged into main"
    ],
    correct: 2,
    explanation: "The '.gitignore' file tells Git which files or directories (such as node_modules/, build artifacts, .env credentials, or OS cache files) should never be tracked or committed."
  },
  {
    id: 5,
    question: "What does the special 'HEAD' pointer in Git represent?",
    options: [
      "The latest commit on GitHub's remote server",
      "The first initial commit ever created in the repository",
      "A pointer to the currently checked-out branch or commit in your working directory",
      "The root directory containing the .git configuration"
    ],
    correct: 2,
    explanation: "'HEAD' is Git's internal pointer that tracks where you currently are in the commit history and which branch is active in your working directory."
  },
  {
    id: 6,
    question: "Why is feature branching considered a DevOps best practice?",
    options: [
      "It allows developers to work in complete isolation without breaking stable production code",
      "It permanently prevents any merge conflicts from occurring",
      "It automatically compiles binary executables without running tests",
      "It eliminates the need for commit messages"
    ],
    correct: 0,
    explanation: "Branching isolates new feature work, experimental refactors, or bugfixes. Incomplete code remains quarantined on its own branch until verified and merged into main."
  },
  {
    id: 7,
    question: "Which GitHub feature allows automated building, testing, and deploying via YAML workflow files?",
    options: [
      "GitHub Discussions",
      "GitHub Actions",
      "GitHub Wikis",
      "GitHub Gists"
    ],
    correct: 1,
    explanation: "GitHub Actions is GitHub's integrated CI/CD platform that executes automated workflows (defined in .github/workflows/*.yml) triggered by repository events."
  },
  {
    id: 8,
    question: "How are individual commits uniquely identified and protected against tampering in Git?",
    options: [
      "Sequential integer IDs (e.g. Commit #1, #2, #3)",
      "Cryptographic SHA hash (40-char SHA-1 or SHA-256 checksum)",
      "The author's phone number and college registration ID",
      "A randomized UUID generated by the web browser"
    ],
    correct: 1,
    explanation: "Git uses cryptographic SHA checksums (40-character hex strings) computed from the commit content, metadata, timestamp, and parent commit, ensuring complete audit integrity."
  },
  {
    id: 9,
    question: "What occurs during a Git 'Merge Conflict' and how must it be resolved?",
    options: [
      "Git automatically deletes the older branch to resolve the conflict",
      "Two branches modified the same lines differently; the developer must manually inspect, edit, and commit the resolution",
      "The repository becomes permanently corrupt and must be cloned again",
      "GitHub bans the user from making further pull requests"
    ],
    correct: 1,
    explanation: "Merge conflicts occur when changes overlap on identical lines. Git inserts conflict markers (<<<<<<<, =======, >>>>>>>) so developers can choose the proper code, stage it, and commit."
  },
  {
    id: 10,
    question: "Under what specific condition can Git perform a 'Fast-Forward' merge?",
    options: [
      "When the target branch has no new commits since the feature branch diverged",
      "Only when merging across two different GitHub organizations",
      "When both branches contain identical commit messages",
      "Only when merging using the GitHub Web GUI"
    ],
    correct: 0,
    explanation: "A fast-forward merge simply moves the target branch pointer directly forward to the tip of the feature branch, which is only possible if no new commits were added to the target branch in the meantime."
  }
];

function initQuiz() {
  const questionsList = document.getElementById('questionsList');
  const answeredCountEl = document.getElementById('answeredCount');
  const progressBar = document.getElementById('progressBar');
  const liveScoreEl = document.getElementById('scoreDisplayLive');
  const submitBtn = document.getElementById('submitQuizBtn');
  const resetBtn = document.getElementById('resetQuizBtn');
  const retakeBtn = document.getElementById('retakeBtn');
  const resultBox = document.getElementById('quizResultBox');

  const resultScoreEl = document.getElementById('resultScore');
  const resultPercentageEl = document.getElementById('resultPercentage');
  const resultFeedbackEl = document.getElementById('resultFeedback');
  const resultBadgeEl = document.getElementById('resultBadge');
  const resultHeadlineEl = document.getElementById('resultHeadline');

  let userAnswers = {}; // { qId: selectedOptionIndex }
  let isSubmitted = false;

  // Render Questions dynamically
  renderQuestions();

  function renderQuestions() {
    questionsList.innerHTML = '';
    quizQuestions.forEach((q, index) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question-item';
      qDiv.id = `question-${q.id}`;

      let optionsHtml = '';
      q.options.forEach((opt, optIndex) => {
        optionsHtml += `
          <label class="option-label" data-qid="${q.id}" data-optindex="${optIndex}">
            <input type="radio" name="q_${q.id}" value="${optIndex}">
            <span>${opt}</span>
          </label>
        `;
      });

      qDiv.innerHTML = `
        <div class="question-meta">
          <span class="question-number">Question ${index + 1} of 10</span>
          <span class="badge badge-purple">1 Mark</span>
        </div>
        <h4 class="question-title">${q.question}</h4>
        <div class="options-group">
          ${optionsHtml}
        </div>
        <div class="explanation-box" id="exp-${q.id}">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      `;

      questionsList.appendChild(qDiv);
    });

    attachOptionListeners();
  }

  function attachOptionListeners() {
    const optionLabels = document.querySelectorAll('.option-label');
    optionLabels.forEach(label => {
      label.addEventListener('click', (e) => {
        if (isSubmitted) return; // Prevent changes after submission

        const qid = parseInt(label.getAttribute('data-qid'));
        const optIndex = parseInt(label.getAttribute('data-optindex'));

        userAnswers[qid] = optIndex;

        // Update selected state in DOM
        const siblingLabels = label.parentElement.querySelectorAll('.option-label');
        siblingLabels.forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');

        const radio = label.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        updateProgress();
      });
    });
  }

  function updateProgress() {
    const answeredTotal = Object.keys(userAnswers).length;
    answeredCountEl.innerText = answeredTotal;
    const percent = (answeredTotal / quizQuestions.length) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Submit Quiz Calculation
  submitBtn.addEventListener('click', () => {
    if (isSubmitted) {
      alert('You have already submitted this quiz. Click "Reset Quiz" to attempt again.');
      return;
    }

    const answeredTotal = Object.keys(userAnswers).length;
    if (answeredTotal < quizQuestions.length) {
      const confirmSubmit = confirm(`You have answered ${answeredTotal} of 10 questions. Are you sure you want to submit?`);
      if (!confirmSubmit) return;
    }

    isSubmitted = true;
    let score = 0;

    quizQuestions.forEach(q => {
      const qElement = document.getElementById(`question-${q.id}`);
      const explanationEl = document.getElementById(`exp-${q.id}`);
      const options = qElement.querySelectorAll('.option-label');
      const chosen = userAnswers[q.id];

      // Highlight options
      options.forEach(optLabel => {
        const optIndex = parseInt(optLabel.getAttribute('data-optindex'));
        const radio = optLabel.querySelector('input');
        radio.disabled = true;

        if (optIndex === q.correct) {
          optLabel.classList.add('correct');
        } else if (chosen === optIndex && optIndex !== q.correct) {
          optLabel.classList.add('incorrect');
        }
      });

      // Show explanation
      if (chosen === q.correct) {
        score++;
        explanationEl.classList.add('show', 'correct-exp');
        explanationEl.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
      } else {
        explanationEl.classList.add('show', 'incorrect-exp');
        explanationEl.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
      }
    });

    // Update Live Score display
    liveScoreEl.innerText = `Score: ${score}/10`;

    // Calculate percentage
    const percentage = (score / quizQuestions.length) * 100;

    // Display Result Box
    resultScoreEl.innerText = `${score} / 10`;
    resultPercentageEl.innerText = `Final Score: ${percentage}%`;

    let feedback = '';
    let badgeIcon = '';

    if (score === 10) {
      feedback = 'Outstanding achievement! You possess a comprehensive mastery of Git version control, GitHub collaborative workflows, and DevOps principles.';
      badgeIcon = '<i class="fa-solid fa-crown"></i>';
      resultHeadlineEl.innerText = 'Perfect Score! Git Master';
    } else if (score >= 8) {
      feedback = 'Excellent job! You have a solid grasp of core GitHub concepts, Pull Requests, branching strategies, and CI/CD pipelines.';
      badgeIcon = '<i class="fa-solid fa-trophy"></i>';
      resultHeadlineEl.innerText = 'High Proficiency!';
    } else if (score >= 5) {
      feedback = 'Good effort! You understand the fundamental Git commands, but review the explanations on Pull Requests, conflict resolution, and GitHub Actions to solidify your knowledge.';
      badgeIcon = '<i class="fa-solid fa-medal"></i>';
      resultHeadlineEl.innerText = 'Passing Score';
    } else {
      feedback = 'Keep learning! Review the Core Concepts and GitHub Flow sections above, and retake the quiz to sharpen your DevOps skills.';
      badgeIcon = '<i class="fa-solid fa-book-open"></i>';
      resultHeadlineEl.innerText = 'Needs Review';
    }

    resultBadgeEl.innerHTML = badgeIcon;
    resultFeedbackEl.innerText = feedback;
    resultBox.classList.remove('hidden');

    // Smooth scroll to results
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Reset Quiz
  function resetQuiz() {
    userAnswers = {};
    isSubmitted = false;
    answeredCountEl.innerText = '0';
    progressBar.style.width = '0%';
    liveScoreEl.innerText = 'Score: 0/10';
    resultBox.classList.add('hidden');

    renderQuestions();
    window.location.hash = 'quiz';
  }

  resetBtn.addEventListener('click', resetQuiz);
  retakeBtn.addEventListener('click', resetQuiz);
}
