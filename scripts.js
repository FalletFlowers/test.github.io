(function () {

    // Ensures all contents of the webpage is loaded before executing.
    window.addEventListener('DOMContentLoaded', (event) => {

        // Target the IDs and classes.
        const quizSection = document.getElementById('quizSection')
        const preQuizInstructions = document.getElementById('preQuizInstructions');
        const quizBodyList = document.getElementById('quizBody');
        const resultsPage = document.getElementById('resultsPage');
        const scoreResultText = document.getElementById('scoreResultText');
        const scoreGradeText = document.getElementById('scoreGradeText');

        // Get events for all buttons
        const submitQuiz = document.getElementById('submitQuiz');
        const startButton = document.getElementById('startButton');
        const beginQuizBtn = document.getElementById('beginQuizBtn');
        const restartQuizBtn = document.getElementById('restartQuizBtn');
        const viewResultsBtn = document.getElementById('viewResultsBtn');
        const quitQuizResultsBtn = document.getElementById('quitQuizResultsBtn');
        const instructionLabel = document.getElementById('instructionLabel');
        const viewResultsAgain = document.getElementById('viewResultsAgain');

        // Pagination Slides
        const previousQuestionBtn = document.getElementById('previousQuestionBtn');
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        let currentSlide = 0;

        quitQuizResultsBtn.addEventListener('click', () => {
            window.location.reload();
        });


        // Initially hide slides
        quizSection.style.display = "none";
        preQuizInstructions.style.display = "none";
        resultsPage.style.display = 'none';
        viewResultsAgain.style.display = 'none';
        submitQuiz.style.display = 'none';

        // Click listeners to display/hide slides.
        startButton.addEventListener('click', () => {
            preQuizInstructions.style.display = 'block';
            startButton.style.display = 'none';
            instructionLabel.style.display = 'none';
        })

        beginQuizBtn.addEventListener('click', () => {
            quizSection.style.display = "block";
            preQuizInstructions.style.display = "none";
        });

        restartQuizBtn.addEventListener('click', () => {
            window.location.reload();
        });

        viewResultsBtn.addEventListener('click', () => {
            quizSection.style.display = "block";
            resultsPage.style.display = 'none';
            viewResultsAgain.style.display = 'block'
            submitQuiz.style.display = 'none';
            previousQuestionBtn.style.display = 'block';
            nextQuestionBtn.style.display = 'block';
        });

        viewResultsAgain.addEventListener('click', () => {
            quizSection.style.display = 'none';
            resultsPage.style.display = 'block';
        });

        // Question list stored in an array
        const quizQuestions = [
            {
                question: '1. Which of the following is most dangerous if contracted the COVID-19 virus?',
                answers: {
                    A: "Children",
                    B: "Older people and people with underlying conditions",
                    C: "Americans",
                    D: "Europeans"
                },
                correctAnswer: "B"
            },
            {
                question: '2. When should a face mask be worn?',
                answers: {
                    A: "On public transport",
                    B: "In confined or crowded spaces",
                    C: "In small shops",
                    D: "All of the above"
                },
                correctAnswer: "D"
            },
            {
                question: '3. Can COVID-19 be cured?',
                answers: {
                    A: "Yes - Hot drinks can cure COVID-19",
                    B: "No - COVID-19 is a death sentence",
                    C: "No - but most people get better by themselves"
                },
                correctAnswer: "C"
            },
            {
                question: '4. Which of the following is an example of physical distances?',
                answers: {
                    A: "Stop going to crowded places",
                    B: "Stop talking to people you live with",
                    C: "Stop speaking to your friends on the phone"
                },
                correctAnswer: "A"
            },
            {
                question: '5. How can people living with HIV/Diabetes protect themselves from COVID-19?',
                answers: {
                    A: "Wash their hands regularly and follow the physical distance",
                    B: "Keep taking their antiretroviral treatment",
                    C: "Exercise regularly, eat well and look after their health",
                    D: "All of the above",

                },
                correctAnswer: "D"
            },
            {
                question: '6. Does washing your hands prevent you from catching COVID?',
                answers: {
                    A: "Yes - but only if you use a strong bleach",
                    B: "Yes – normal soap and water on hand sanitizer is enough",
                    C: "No – Washing your hands does not stop COVID-19",

                },
                correctAnswer: "B"
            },
            {
                question: '7. How is COVID-19 passed on?',
                answers: {
                    A: "Through droplets that come from your mouth and nose when you cough or breathe out",
                    B: "In sexual fluids, including semen, vaginal fluids",
                    C: "By drinking unclean water",
                    D: "All of the above",

                },
                correctAnswer: "A"
            },
            {
                question: '8. What are the common symptoms of COVID-19?',
                answers: {
                    A: "A new and continuous cough",
                    B: "Fever",
                    C: "Tiredness",
                    D: "All of the above",

                },
                correctAnswer: "D"
            },
            {
                question: '9. Can you always tell if someone has COVID-19?',
                answers: {
                    A: "No - not everyone with COVID-19 has symptom",
                    B: "Yes - it will be obvious as a person with COVID has a lot of coughs",
                    C: "Yes - you can tell by where a person comes from",

                },
                correctAnswer: "A"
            },
            {
                question: '10. ____ can cause serious harm when you have ____ conditions which may result in ____.',
                answers: {
                    A: "The flu, underlying, death",
                    B: "The flu, healthy, hospitalization",
                    C: "Covid-19, underlying, death",
                    D: "Covid-19, healthy, hospitalization",
                },
                correctAnswer: "C"
            }
        ];

        // Function to design the quiz
        const quizDesign = () => {
            const display = [];

            // Loop through Quiz Questions
            quizQuestions.forEach((currentQuestion, questionNumber) => {
                const answers = [];

                for (let letter in currentQuestion.answers) {
                    answers.push(
                    `
                        <div class="questionAnswers">
                            <input type="radio" name="question${questionNumber}" value="${letter}" required />
                            ${letter} : ${currentQuestion.answers[letter]}
                        </div>
                    `
                    );
                }

                display.push (
                `
                    <div class="slide">
                        <div class="questionName">
                            ${currentQuestion.question}
                        </div>
                        
                         <div class="questionList">
                            <div class="answers">${answers.join("")}</div>
                         </div>
                    </div>
                `
                );
            });

            quizBodyList.innerHTML = display.join("");
        }

        submitQuiz.addEventListener('click', () => {
            let totalCorrectAnswers = 0;

            const answerResults = quizBodyList.querySelectorAll('.answers');

            quizQuestions.forEach((currentQuestion, questionNumber) => {
                const answerResult = answerResults[questionNumber];
                const choice = (`input[type='radio'][name=question${questionNumber}]:checked`);
                const selectedAnswer = (answerResult.querySelector(choice) || {}).value;

                if (selectedAnswer == currentQuestion.correctAnswer) {
                    totalCorrectAnswers++;
                    answerResult.classList.remove('incorrectAnswer');
                    answerResult.classList.add('correctAnswer');
                } else {
                    answerResult.classList.add('incorrectAnswer');
                }

            });

            // Display number of correct questions
            scoreResultText.innerHTML = `${totalCorrectAnswers} out of ${quizQuestions.length} correct`;

            // Calculate quiz grade percentage
            let quizGrade = ((totalCorrectAnswers / quizQuestions.length) * 100).toFixed(2);

            resultsPage.style.display = 'block';
            nextQuestionBtn.style.display = 'none'
            previousQuestionBtn.style.display = 'none'
            quizSection.style.display = 'none';

            // Display grade percentage on results page
            scoreGradeText.innerHTML = `${quizGrade} %`;
        });

        function showCurrentQuestion(question) {
            slides[currentSlide].classList.remove('activeSlide');
            slides[question].classList.add('activeSlide');
            currentSlide = question;

            for (let i = 0; i < slides.length; i++) {
                if (slides[i].classList.contains('activeSlide')) {
                    slides[i].style.display = 'block';
                } else {
                    slides[i].style.display = 'none';
                }
            }

            if (currentSlide == 0) {
                previousQuestionBtn.style.display = 'none';

            } else {
                previousQuestionBtn.style.display = 'block';
            }

            if (currentSlide == slides.length - 1) {
                nextQuestionBtn.style.display = 'none';
                submitQuiz.style.display = 'block';
            } else {
                nextQuestionBtn.style.display = 'block';
                submitQuiz.style.display = 'none';
            }
        }

        quizDesign();

        const slides = document.querySelectorAll(".slide");

        function goToNextQuestion() {
            showCurrentQuestion(currentSlide + 1);
        }

        function goToPreviousQuestion() {
            showCurrentQuestion(currentSlide - 1);
        }

        showCurrentQuestion(currentSlide);

        nextQuestionBtn.addEventListener('click', goToNextQuestion);
        previousQuestionBtn.addEventListener('click', goToPreviousQuestion);

    });

})();
