let quizContainer = document.querySelector('.container')
let questionSection = document.querySelector('.questions')
let optionSection = document.querySelector('.options')
let timer = document.querySelector('.timer')

let start_btn = document.querySelector('#start')
let currentQuestion = 0;
let questionsAnswered = 0;
let next_btn = document.createElement('button')
next_btn.textContent = 'Next';
let finish_btn = document.createElement('button')
finish_btn.textContent = 'Finish';

let quiz = [
    {
        question: 'Who is the president of Nigeria',
        option: {
            option1: 'Ahmadu Bello',
            option2: 'Tinubu',
            option3: 'Buhari',
            option4: 'Lord Lugard'
        },
        answer: 'Tinubu'
    },
    {
        question: 'Who is the Queen/King of England',
        option: {
            option1: 'King Henry',
            option2: 'Elizabeth',
            option3: 'Charles',
            option4: 'Michael Jackson'
        },
        answer: 'Charles'
    },
    {
        question: 'What is the biggest mountain in the world',
        option: {
            option1: 'Kilimanjaro',
            option2: 'US Capitol',
            option3: 'Aso rock',
            option4: 'Everest'
        },
        answer: 'Everest'
    }
]

let isClickable = true;

function accessQuestion(){
    document.querySelector('h1').textContent = 'Question ' + (currentQuestion+1);
    document.querySelector('p').textContent = quiz[currentQuestion].question;

    for (let i = 0; i < Object.keys(quiz[currentQuestion].option).length; i++) {
        let option_btn = document.createElement('button')
        option_btn.textContent = quiz[currentQuestion].option['option' + (i+1)]
        optionSection.appendChild(option_btn)
        option_btn.className = 'ourOptions'
        if (quiz[currentQuestion].option['option' + (i+1)] == quiz[currentQuestion].answer) {
            option_btn.className = 'ourAnswer'
        }
    }
    let answer_btn = document.querySelector('.ourAnswer')
    let wrongAnswer_btn = document.querySelectorAll('.ourOptions')
    // To make the right answer highlight green
    wrongAnswer_btn.forEach((button) => {
        button.addEventListener('click', function(){
            if (isClickable) {

                button.style.backgroundColor = 'rgb(252, 189, 189)';
                button.style.border = 'inset';
                button.style.borderColor = 'rgb(245, 102, 102)';
                

                answer_btn.style.backgroundColor = 'rgb(160, 240, 213)'
                answer_btn.style.border = 'inset'
                answer_btn.style.borderColor = 'green'
                isClickable = false;
                document.querySelector('label').textContent = 'Questions Answered: ' + questionsAnswered;
            }
        })
    })
    answer_btn.addEventListener('click', function(){
        if (isClickable) {
            answer_btn.style.backgroundColor = 'rgb(160, 240, 213)'
            answer_btn.style.border = 'inset'
            answer_btn.style.borderColor = 'green'
            isClickable = false;
            questionsAnswered++;
            document.querySelector('label').textContent = 'Questions Answered: ' + questionsAnswered;
        }
    })

        if (currentQuestion+1 == quiz.length) {
            quizContainer.appendChild(finish_btn)
            quizContainer.removeChild(next_btn)
        }
    currentQuestion++;
    
}
var x;

next_btn.addEventListener('click', function(){
    isClickable = true;
    let nodeList = document.querySelectorAll('.ourOptions')
    optionSection.removeChild(document.querySelector('.ourAnswer'))
    for (let j = 0; j < nodeList.length; j++) {
        optionSection.removeChild(nodeList[j])
        
    }
    accessQuestion()
})

const finish = () => {
    questionSection.style.display = 'none';
    optionSection.style.display = 'none';
    finish_btn.style.display = 'none'

    let score = document.createElement('h1')
    //style the score
    score.style.width = '100%'
    score.style.height = '70px'
    score.style.borderRadius = '6px'
    score.style.backgroundColor = 'rgb(122, 187, 243)'
    score.style.display = 'flex'
    score.style.justifyContent = 'center'

    let commentSection = document.createElement('div')

    let scorePercentage = document.createElement('div')
    let comment = document.createElement('div');

    commentSection.appendChild(scorePercentage)
    commentSection.appendChild(comment)
    commentSection.style.display = 'block'
    commentSection.style.width = '100%'
    commentSection.style.height = '200px'

    scorePercentage.style.width = '50%'
    scorePercentage.style.height = '200px'
    scorePercentage.style.borderRadius = '6px'
    scorePercentage.style.backgroundColor = 'rgb(122, 187, 243)'
    scorePercentage.style.justifyContent = 'center'
    scorePercentage.style.margin = '10px'

    comment.style.width = '40%'
    comment.style.height = '200px'
    comment.style.borderRadius = '6px'
    comment.style.backgroundColor = 'rgb(122, 187, 243)'
    comment.style.justifyContent = 'center'
    comment.style.margin = '10px'
    document.querySelector('span').style.display = 'none'

    
    // To calculate the score
    score.textContent = `Score : ${questionsAnswered}/${quiz.length}`
    scorePercentage.textContent =  `You got ${(questionsAnswered/quiz.length)*100}%`
    if (((questionsAnswered/quiz.length)*100) < 50) {
        comment.textContent = 'Below average'
    } else if (((questionsAnswered/quiz.length)*100) == 50){
        comment.textContent = 'Average'
    }else if(((questionsAnswered/quiz.length)*100) > 50 && ((questionsAnswered/quiz.length)*100)  < 90){
        comment.textContent = 'Good'
    }else if(((questionsAnswered/quiz.length)*100) > 90 && ((questionsAnswered/quiz.length)*100) < 100){
        comment.textContent = 'Very good'
    }else if(((questionsAnswered/quiz.length)*100) == 100){
        comment.textContent = 'Excellent'
    }
    // To stop the timer
    clearTimeout(x)
    
    quizContainer.appendChild(score)
    quizContainer.appendChild(scorePercentage)
    quizContainer.appendChild(comment)
}

finish_btn.addEventListener('click', finish)

start_btn.addEventListener('click', function() {
    let time = quiz.length*5;
    x = setInterval(() => {
        time--;
        if (time <= 0) {
            clearTimeout(x)
            finish()
            
        }
        timer.textContent = time;
    }, 1000)
    
    accessQuestion();
    quizContainer.appendChild(next_btn)
    quizContainer.removeChild(start_btn)
})
