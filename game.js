// 解析度倍率：1 = 960x540，2 = 1920x1080（較清晰）
const R = 2;

const QUESTIONS = [
  { zh: "謝謝", ko: "고마워", choices: ["미안해", "고마워", "괜찮아", "안녕"] },
  { zh: "對不起", ko: "미안해", choices: ["미안해", "축하해", "잘자", "맞아"] },
  { zh: "沒關係", ko: "괜찮아", choices: ["괜찮아", "도와줘", "사랑해", "배고파"] },
  { zh: "你好", ko: "안녕", choices: ["안녕", "고마워", "미안해", "잘자"] },
  { zh: "再見", ko: "잘가", choices: ["잘가", "안녕", "고마워", "괜찮아"] },
  { zh: "我愛你", ko: "사랑해", choices: ["사랑해", "고마워", "미안해", "안녕"] },
  { zh: "對", ko: "맞아", choices: ["맞아", "괜찮아", "고마워", "미안해"] },
  { zh: "恭喜", ko: "축하해", choices: ["축하해", "고마워", "사랑해", "안녕"] },
  { zh: "晚安", ko: "잘자", choices: ["잘자", "안녕", "고마워", "사랑해"] },
  { zh: "我餓了", ko: "배고파", choices: ["배고파", "고마워", "미안해", "안녕"] },
  { zh: "幫幫我", ko: "도와줘", choices: ["도와줘", "고마워", "사랑해", "안녕"] },
];

// 輔助函數：創建圓角矩形圖形
function createRoundedRectGraphics(scene, x, y, width, height, radius, fillColor, fillAlpha, strokeColor, strokeWidth) {
  const graphics = scene.add.graphics();
  
  if (fillColor !== undefined) {
    graphics.fillStyle(fillColor, fillAlpha !== undefined ? fillAlpha : 1);
  }
  if (strokeColor !== undefined) {
    graphics.lineStyle(strokeWidth !== undefined ? strokeWidth : 2, strokeColor, 1);
  }
  
  graphics.fillRoundedRect(x - width/2, y - height/2, width, height, radius);
  if (strokeColor !== undefined) {
    graphics.strokeRoundedRect(x - width/2, y - height/2, width, height, radius);
  }
  
  return graphics;
}

// 輔助函數：更新圓角矩形樣式
function updateRoundedRect(graphics, x, y, width, height, radius, fillColor, fillAlpha, strokeColor, strokeWidth) {
  graphics.clear();
  
  if (fillColor !== undefined) {
    graphics.fillStyle(fillColor, fillAlpha !== undefined ? fillAlpha : 1);
  }
  if (strokeColor !== undefined) {
    graphics.lineStyle(strokeWidth !== undefined ? strokeWidth : 2, strokeColor, 1);
  }
  
  graphics.fillRoundedRect(x - width/2, y - height/2, width, height, radius);
  if (strokeColor !== undefined) {
    graphics.strokeRoundedRect(x - width/2, y - height/2, width, height, radius);
  }
}

// 開始畫面
class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    this.cameras.main.setBackgroundColor("#f8fafc");

    // 標題
    const title = this.add.text(480*R, 200*R, "Korean Reflex Quiz", {
      fontSize: (48*R) + "px",
      fontFamily: "system-ui",
      color: "#1f2937",
      fontWeight: "700"
    }).setOrigin(0.5);

    // 副標題
    const subtitle = this.add.text(480*R, 260*R, "韓語反應測驗", {
      fontSize: (24*R) + "px",
      fontFamily: "system-ui",
      color: "#4b5563",
      fontWeight: "500"
    }).setOrigin(0.5);

    // 說明
    const description = this.add.text(480*R, 320*R, "共 7 題，每題 3 秒內作答", {
      fontSize: (18*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280"
    }).setOrigin(0.5);

    // 開始按鈕
    const btnW = 300*R;
    const btnH = 60*R;
    const btnX = 480*R;
    const btnY = 400*R;
    const btnRadius = 16*R;

    const startBtn = createRoundedRectGraphics(this, btnX, btnY, btnW, btnH, btnRadius, 0x475569, 1, 0x334155, 2*R);
    startBtn.setDepth(10);

    const btnText = this.add.text(btnX, btnY, "遊戲開始", {
      fontSize: (24*R) + "px",
      fontFamily: "system-ui",
      color: "#ffffff",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);

    // 按鈕互動
    const hitArea = new Phaser.Geom.Rectangle(btnX - btnW/2, btnY - btnH/2, btnW, btnH);
    startBtn.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    startBtn.input.cursor = 'pointer';

    startBtn.on("pointerover", () => {
      startBtn.clear();
      startBtn.fillStyle(0x334155, 1);
      startBtn.lineStyle(2*R, 0x334155, 1);
      startBtn.fillRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
      startBtn.strokeRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
    });

    startBtn.on("pointerout", () => {
      startBtn.clear();
      startBtn.fillStyle(0x475569, 1);
      startBtn.lineStyle(2*R, 0x334155, 1);
      startBtn.fillRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
      startBtn.strokeRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
    });

    startBtn.on("pointerdown", () => {
      this.scene.start("quiz");
    });
  }
}

// 結算畫面
class ResultScene extends Phaser.Scene {
  constructor() {
    super("result");
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    this.cameras.main.setBackgroundColor("#f8fafc");

    // 標題
    const title = this.add.text(480*R, 150*R, "遊戲結束", {
      fontSize: (42*R) + "px",
      fontFamily: "system-ui",
      color: "#1f2937",
      fontWeight: "700"
    }).setOrigin(0.5);

    // 分數顯示
    const scoreText = this.add.text(480*R, 230*R, "最終分數", {
      fontSize: (20*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280"
    }).setOrigin(0.5);

    const scoreValue = this.add.text(480*R, 280*R, this.finalScore.toString(), {
      fontSize: (64*R) + "px",
      fontFamily: "system-ui",
      color: "#334155",
      fontWeight: "700"
    }).setOrigin(0.5);

    // 評語
    let comment = "";
    let commentColor = "#1f2937";
    if (this.finalScore >= 60) {
      comment = "🎉 太棒了！";
      commentColor = "#10b981";
    } else if (this.finalScore >= 40) {
      comment = "👍 不錯喔！";
      commentColor = "#334155";
    } else {
      comment = "💪 繼續加油！";
      commentColor = "#f59e0b";
    }

    const commentText = this.add.text(480*R, 350*R, comment, {
      fontSize: (28*R) + "px",
      fontFamily: "system-ui",
      color: commentColor,
      fontWeight: "600"
    }).setOrigin(0.5);

    // 重新開始按鈕
    const btnW = 300*R;
    const btnH = 60*R;
    const btnX = 480*R;
    const btnY = 420*R;
    const btnRadius = 16*R;

    const restartBtn = createRoundedRectGraphics(this, btnX, btnY, btnW, btnH, btnRadius, 0x475569, 1, 0x334155, 2*R);
    restartBtn.setDepth(10);

    const btnText = this.add.text(btnX, btnY, "再玩一次", {
      fontSize: (24*R) + "px",
      fontFamily: "system-ui",
      color: "#ffffff",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);

    // 按鈕互動
    const hitArea = new Phaser.Geom.Rectangle(btnX - btnW/2, btnY - btnH/2, btnW, btnH);
    restartBtn.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    restartBtn.input.cursor = 'pointer';

    restartBtn.on("pointerover", () => {
      restartBtn.clear();
      restartBtn.fillStyle(0x334155, 1);
      restartBtn.lineStyle(2*R, 0x334155, 1);
      restartBtn.fillRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
      restartBtn.strokeRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
    });

    restartBtn.on("pointerout", () => {
      restartBtn.clear();
      restartBtn.fillStyle(0x475569, 1);
      restartBtn.lineStyle(2*R, 0x334155, 1);
      restartBtn.fillRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
      restartBtn.strokeRoundedRect(btnX - btnW/2, btnY - btnH/2, btnW, btnH, btnRadius);
    });

    restartBtn.on("pointerdown", () => {
      this.scene.start("start");
    });
  }
}

class QuizScene extends Phaser.Scene {
  constructor() {
    super("quiz");
    this.maxQuestions = 7; // 最多7題
  }

  create() {
    console.log('場景創建中...');
    
    // 每次進入場景時重置狀態
    this.score = 0;
    this.qi = 0;
    this.timeLeft = 3;
    this.timerEvent = null;
    
    this.cameras.main.setBackgroundColor("#f8fafc");

    // 標題和分數
    this.title = this.add.text(20*R, 16*R, "Korean Reflex Quiz", { 
      fontSize: (22*R) + "px", 
      fontFamily: "system-ui",
      color: "#1f2937",
      fontWeight: "600"
    }).setDepth(10);
    this.scoreText = this.add.text(740*R, 20*R, "Score: 0", { 
      fontSize: (18*R) + "px", 
      fontFamily: "system-ui",
      color: "#1f2937",
      fontWeight: "500"
    }).setDepth(10);
    
    // 題數顯示
    this.questionText = this.add.text(480*R, 20*R, "第 1 / 7 題", {
      fontSize: (18*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280",
      fontWeight: "500"
    }).setOrigin(0.5).setDepth(10);

    // 問題卡片（圓角矩形，邊框：低彩度深藍）
    this.card = createRoundedRectGraphics(this, 480*R, 170*R, 900*R, 150*R, 16*R, 0x475569, 0.12, 0x334155, 4*R);
    this.card.setDepth(10);

    // 提示文字和中文問題
    this.prompt = this.add.text(60*R, 120*R, "請選出對應的韓語：", { 
      fontSize: (18*R) + "px", 
      color: "#4b5563", 
      fontFamily: "system-ui" 
    }).setDepth(10);
    this.zhText = this.add.text(480*R, 175*R, "", { 
      fontSize: (46*R) + "px", 
      color: "#1f2937", 
      fontFamily: "system-ui",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);

    // 計時器進度條背景（圓角矩形）
    this.barBg = createRoundedRectGraphics(this, 480*R, 245*R, 860*R, 16*R, 8*R, 0xe5e7eb, 1);
    this.barBg.setDepth(10);
    
    // 計時器進度條（圓角矩形）
    this.barStartX = 50*R;
    this.barY = 245*R;
    this.barMaxWidth = 860*R;
    this.barHeight = 16*R;
    this.barRadius = 8*R;
    this.bar = this.add.graphics();
    this.bar.setDepth(10);

    // 答案按鈕
    this.buttons = [];
    const startX = 60*R, startY = 300*R, btnW = 420*R, btnH = 64*R, gap = 16*R, btnRadius = 16*R;

    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = startX + col * (btnW + gap);
      const y = startY + row * (btnH + gap);
      const centerX = x + btnW/2;
      const centerY = y + btnH/2;

    // 創建圓角矩形按鈕
      const rect = createRoundedRectGraphics(this, centerX, centerY, btnW, btnH, btnRadius, 0xffffff, 1, 0xe5e7eb, 2*R);
    rect.setDepth(10);
      
      // 設置互動區域（基於絕對座標）
      const hitArea = new Phaser.Geom.Rectangle(centerX - btnW/2, centerY - btnH/2, btnW, btnH);
      rect.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
      rect.input.cursor = 'pointer';

      const label = this.add.text(x + 18*R, y + 18*R, "", { 
        fontSize: (22*R) + "px", 
        color: "#1f2937", 
        fontFamily: "system-ui",
        fontWeight: "500"
      }).setDepth(10);

      // 按鈕互動效果
      rect.on("pointerover", () => {
        rect.clear();
        rect.fillStyle(0x475569, 0.15);
        rect.lineStyle(2*R, 0x334155, 1);
        rect.fillRoundedRect(centerX - btnW/2, centerY - btnH/2, btnW, btnH, btnRadius);
        rect.strokeRoundedRect(centerX - btnW/2, centerY - btnH/2, btnW, btnH, btnRadius);
      });
      
      rect.on("pointerout", () => {
        rect.clear();
        rect.fillStyle(0xffffff, 1);
        rect.lineStyle(2*R, 0xe5e7eb, 1);
        rect.fillRoundedRect(centerX - btnW/2, centerY - btnH/2, btnW, btnH, btnRadius);
        rect.strokeRoundedRect(centerX - btnW/2, centerY - btnH/2, btnW, btnH, btnRadius);
      });
      
      rect.on("pointerdown", () => this.pick(label.text));

      this.buttons.push({ rect, label, centerX, centerY, btnW, btnH, btnRadius });
    }

    // 反饋訊息
    this.feedback = this.add.text(480*R, 500*R, "", { 
      fontSize: (18*R) + "px", 
      color: "#1f2937", 
      fontFamily: "system-ui",
      fontWeight: "500"
    }).setOrigin(0.5).setDepth(10);

    this.nextQuestion();
  }


  nextQuestion() {
    // 檢查是否已經完成所有題目
    if (this.qi >= this.maxQuestions) {
      this.scene.start("result", { score: this.score });
      return;
    }

    const q = QUESTIONS[this.qi % QUESTIONS.length];
    this.qi++;
    this.current = q;

    // 更新題數顯示
    this.questionText.setText(`第 ${this.qi} / ${this.maxQuestions} 題`);

    this.zhText.setText(q.zh);
    this.feedback.setText("");

    // 打亂選項順序
    const shuffled = Phaser.Utils.Array.Shuffle(q.choices.slice());
    this.buttons.forEach((b, i) => b.label.setText(`${i + 1}. ${shuffled[i]}`));

    // 重置計時器（用實際經過時間計算，進度條平滑遞減）
    this.timeLeft = 3;
    this.questionStartTime = this.time.now;
    if (this.timerEvent) this.timerEvent.remove(false);

    // 計時器事件：高頻率更新讓進度條平滑
    this.timerEvent = this.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => {
        this.timeLeft = 3 - (this.time.now - this.questionStartTime) / 1000;
        const t = Phaser.Math.Clamp(this.timeLeft / 3, 0, 1);
        const newWidth = this.barMaxWidth * t;

        // 更新進度條：低彩度深藍漸層、圓角
        this.bar.clear();
        if (newWidth > 0) {
          this.bar.fillGradientStyle(0x475569, 0x334155, 0x475569, 0x334155, 1, 1, 1, 1);
          this.bar.fillRoundedRect(
            this.barStartX,
            this.barY - this.barHeight / 2,
            newWidth,
            this.barHeight,
            this.barRadius
          );
        }

        // 時間到
        if (this.timeLeft <= 0) {
          this.feedback.setText(`⏱️ 超時：正解是「${q.ko}」`);
          if (this.timerEvent) this.timerEvent.remove(false);

          if (this.qi >= this.maxQuestions) {
            this.time.delayedCall(800, () => {
              this.scene.start("result", { score: this.score });
            });
          } else {
            this.time.delayedCall(800, () => this.nextQuestion());
          }
        }
      }
    });
  }

  pick(text) {
    if (!this.current) return;

    // 移除選項編號來比較
    const selectedAnswer = text.replace(/^\d+\.\s*/, "");

    if (selectedAnswer === this.current.ko) {
      this.score += 10;
      this.feedback.setText("✅ 正確！");
    } else {
      this.feedback.setText(`❌ 錯了：正解是「${this.current.ko}」`);
    }

    this.scoreText.setText(`Score: ${this.score}`);
    if (this.timerEvent) this.timerEvent.remove(false);

    // 檢查是否完成7題（答完第7題後，this.qi 會是 7）
    if (this.qi >= this.maxQuestions) {
      // 延遲後進入結算畫面
      this.time.delayedCall(800, () => {
        this.scene.start("result", { score: this.score });
      });
    } else {
      // 延遲後進入下一題
      this.time.delayedCall(800, () => this.nextQuestion());
    }
  }
}

// 初始化 Phaser 遊戲
if (typeof Phaser !== 'undefined') {
  const config = {
    type: Phaser.WEBGL, // WebGL 較 Canvas 邊緣更平滑
    width: 960 * R,
    height: 540 * R,
    parent: 'game-container',
    scene: [StartScene, QuizScene, ResultScene],
    backgroundColor: '#f8fafc',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
      antialias: true,
      roundPixels: false
    }
  };

  const game = new Phaser.Game(config);
} else {
  console.error('Phaser 未正確加載！請檢查 CDN 連接。');
}
