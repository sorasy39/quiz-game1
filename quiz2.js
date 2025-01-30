const questions = [
    {
        question: "日本で最も古い大学はどこ？",
        choices: ["東京大学", "京都大学", "早稲田大学", "慶応義塾大学"],
        answer: 3
    },
    {
        question: "ノーベル賞受賞者が一番多い日本の大学は？",
        choices: ["京都大学", "東京大学", "筑波大学", "東北大学"],
        answer: 0
    },
    {
        question: "世界で最も学生数がおおい大学は？",
        choices: ["日本大学", "清華大学", "インディラ・ガンディー国立オープン大学", "カリフォルニア大学ロサンゼルス校"],
        answer: 2
    },
    {
        question: "日本初の「女子大学」として設立されたのはどこ？",
        choices: ["日本女子大学", "東京女子大学", "昭和女子大学", "津田塾大学"],
        answer: 3
    },
    {
        question: "日本の大学の中で、最も面積が広いキャンパスを持つのはどこ？",
        choices: ["北海道大学", "筑波大学", "東京大学", "琉球大学"],
        answer: 1
    },
    {
        question: "日本の大学で初めてキャンパス内にスターバックスを設置したのはどこ？",
        choices: ["早稲田大学", "慶応義塾大学", "明治大学", "青山学院大学"],
        answer: 1
    },
    {
        question: "日本で初めて共学化された大学はどこ？",
        choices: ["京都大学", "東京大学", "名古屋大学", "北海道大学"],
        answer: 3
    },
    {
        question: "次の大学のうち、公式マスコットキャラクターが存在しないのはどれ？",
        choices: ["京都大学", "東京大学", "筑波大学", "北海道大学"],
        answer: 1
    },
    {
        question: "「偏差値」という評価方法を開発した日本の大学はどこ？",
        choices: ["横浜国立大学", "大阪大学", "早稲田大学", "東京工業大学"],
        answer: 2
    },
    {
        question: "京都大学の学内にある、自由を象徴する通称「カラスの塔」の正式名称は？",
        choices: ["吉田南構内塔", "自由塔", "百周年時計台記念館", "熊野塔"],
        answer: 2
    }
];

let currentQuestionIndex = 0; // 現在の問題番号
let score = 0; // 得点
let selectedChoiceIndex = null; // 選択された選択肢

// DOM要素の取得
const startScreen = document.getElementById("start-screen"); // スタート画面
const startButton = document.getElementById("start-btn"); // スタートボタン
const questionElement = document.getElementById("question"); // 質問の要素
const choiceButtons = document.querySelectorAll(".choice-btn"); // 選択肢ボタン
const confirmButton = document.getElementById("confirm-btn"); // 答え確認ボタン
const nextButton = document.getElementById("next-btn"); // 次の問題ボタン
const resultContainer = document.getElementById("result"); // 結果表示のコンテナ
const scoreElement = document.getElementById("score"); // スコア表示の要素

// クイズ開始処理
function startQuiz() {
    startScreen.classList.add("hidden"); // スタート画面を非表示
    currentQuestionIndex = 0; // 最初の問題から開始
    score = 0; // スコアをリセット
    showQuestion(); // 最初の問題を表示
}

document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
});



// 問題を画面に表示する関数
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex]; // 現在の問題を取得
    questionElement.textContent = currentQuestion.question; // 質問文をセット

    // 選択肢のボタンを更新
    choiceButtons.forEach((button, index) => {
        button.textContent = currentQuestion.choices[index]; // ボタンのテキストをセット
        button.classList.remove("correct", "wrong", "selected"); // 過去の選択状態をリセット
        button.disabled = false; // ボタンを有効化
        button.onclick = () => selectChoice(index); // クリック時の処理を設定
    });

    confirmButton.classList.add("hidden"); // 答え確認ボタンを非表示
    nextButton.classList.add("hidden"); // 次へボタンを非表示
}

// 選択肢を選択したときの処理
function selectChoice(index) {
    selectedChoiceIndex = index; // 選択された選択肢を記録
    choiceButtons.forEach((button, i) => {
        button.classList.toggle("selected", i === index); // 選択状態を視覚的に示す
    });
    confirmButton.classList.remove("hidden"); // 答え確認ボタンを表示
}

// 答えを確認する処理
function confirmAnswer() {
    const correctIndex = questions[currentQuestionIndex].answer; // 正解のインデックスを取得
    const isCorrect = selectedChoiceIndex === correctIndex; // 正解かどうか判定
  
    // 各ボタンのスタイルを更新
    choiceButtons.forEach((button, i) => {
        button.disabled = true; // ボタンを無効化
        if (i === correctIndex) {
            button.classList.add("correct"); // 正解に緑色のスタイルを適用
        } else if (i === selectedChoiceIndex) {
            button.classList.add("wrong"); // 選択した不正解のボタンに赤色を適用
        }
    });

    // 効果音の再生（エラーハンドリング付き）
    if (isCorrect) {
        const correctSound = document.getElementById('correct-sound');
        correctSound.currentTime = 0; // 連続再生時にリセット
        correctSound.play().catch(error => console.log("音声の再生に失敗:", error));
        score++; // 正解ならスコアを加算
    } else {
        const wrongSound = document.getElementById('wrong-sound');
        wrongSound.currentTime = 0;
        wrongSound.play().catch(error => console.log("音声の再生に失敗:", error));
    }
  
    confirmButton.classList.add("hidden"); // 答え確認ボタンを非表示
    nextButton.classList.remove("hidden"); // 次へボタンを表示
}

// 答えを確認する処理
function confirmAnswer() {
    const correctIndex = questions[currentQuestionIndex].answer;
    const isCorrect = selectedChoiceIndex === correctIndex;

    choiceButtons.forEach((button, i) => {
        button.disabled = true;
        if (i === correctIndex) {
            button.classList.add("correct");
        } else if (i === selectedChoiceIndex) {
            button.classList.add("wrong");
        }
    });

    // 効果音を再生
    if (isCorrect) {
        document.getElementById('correct-sound').play();
        
    } else {
        document.getElementById('wrong-sound').play();
        
    }

    confirmButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
}

function showResult() {
    const quizContainer = document.getElementById("quiz");  // クイズコンテナを取得
    quizContainer.style.display = "none";  // クイズ画面を完全に非表示にする
    resultContainer.classList.remove("hidden"); // 結果画面を表示
    scoreElement.textContent = `スコア: ${score} / ${questions.length}`;

    // BGMのオブジェクト取得
    const highScoreSound = document.getElementById('high-score-sound');
    const lowScoreSound = document.getElementById('low-score-sound');

    // どちらのBGMも一度リセット（重ならないように）
    highScoreSound.pause();
    lowScoreSound.pause();
    highScoreSound.currentTime = 0;
    lowScoreSound.currentTime = 0;

    // スコアに応じて再生
    if (score >= 7) {
        highScoreSound.play().catch(error => console.log("BGMの再生に失敗:", error));
    } else {
        lowScoreSound.play().catch(error => console.log("BGMの再生に失敗:", error));
    }
}

// 次の問題に進む処理
nextButton.addEventListener("click", () => {
    currentQuestionIndex++; // 次の問題に進む
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // 次の問題を表示
    } else {
        showResult(); // 全問終了時に結果を表示
    }
});

// リスタート処理
document.getElementById("restart-btn").addEventListener("click", () => {
    resultContainer.classList.add("hidden"); // 結果画面を非表示
    document.getElementById("quiz").classList.remove("hidden"); // クイズ画面を再表示
    startQuiz(); // クイズを再スタート
});

// 答え確認ボタンのイベントリスナー
confirmButton.addEventListener("click", confirmAnswer);

// スタートボタンのイベントリスナー
startButton.addEventListener("click", startQuiz);

// クイズを開始
startQuiz();







