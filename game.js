// 解析度倍率：1 = 960x540，2 = 1920x1080（較清晰）
const R = 2;

const QUESTIONS_KO = [
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
  { zh: "好吃", ko: "맛있어", choices: ["맛있어", "맞아", "고마워", "미안해"] },
  { zh: "多少錢", ko: "얼마예요", choices: ["얼마예요", "고마워", "맞아", "안녕"] },
  { zh: "再來一份", ko: "한인분더", choices: ["한인분더", "고마워", "맛있어", "안녕"] },
  { zh: "請給我", ko: "주세요", choices: ["주세요", "고마워", "미안해", "맞아"] },
  { zh: "不用了", ko: "괜찮아요", choices: ["괜찮아요", "고마워", "미안해", "주세요"] },
  { zh: "等一下", ko: "잠깐만요", choices: ["잠깐만요", "고마워", "안녕", "맞아"] },
  { zh: "沒問題", ko: "문제없어요", choices: ["문제없어요", "괜찮아", "고마워", "미안해"] },
  { zh: "真的嗎", ko: "진짜요", choices: ["진짜요", "고마워", "맞아", "안녕"] },
  { zh: "不知道", ko: "몰라요", choices: ["몰라요", "고마워", "미안해", "맞아"] },
  { zh: "我懂了", ko: "알겠어요", choices: ["알겠어요", "고마워", "미안해", "안녕"] },
  { zh: "請稍等", ko: "잠시만요", choices: ["잠시만요", "고마워", "미안해", "안녕"] },
  { zh: "辛苦了", ko: "수고했어요", choices: ["수고했어요", "고마워", "미안해", "안녕"] },
  { zh: "加油", ko: "화이팅", choices: ["화이팅", "고마워", "맞아", "안녕"] },
  { zh: "乾杯", ko: "건배", choices: ["건배", "고마워", "축하해", "안녕"] },
];

const QUESTIONS_JA = [
  { zh: "謝謝", ja: "ありがとう", choices: ["すみません", "ありがとう", "大丈夫", "こんにちは"] },
  { zh: "對不起", ja: "すみません", choices: ["すみません", "おめでとう", "おやすみ", "そうだ"] },
  { zh: "沒關係", ja: "大丈夫", choices: ["大丈夫", "助けて", "愛してる", "お腹すいた"] },
  { zh: "你好", ja: "こんにちは", choices: ["こんにちは", "ありがとう", "すみません", "おやすみ"] },
  { zh: "再見", ja: "さようなら", choices: ["さようなら", "こんにちは", "ありがとう", "大丈夫"] },
  { zh: "我愛你", ja: "愛してる", choices: ["愛してる", "ありがとう", "すみません", "こんにちは"] },
  { zh: "對", ja: "そうだ", choices: ["そうだ", "大丈夫", "ありがとう", "すみません"] },
  { zh: "恭喜", ja: "おめでとう", choices: ["おめでとう", "ありがとう", "愛してる", "こんにちは"] },
  { zh: "晚安", ja: "おやすみ", choices: ["おやすみ", "こんにちは", "ありがとう", "愛してる"] },
  { zh: "我餓了", ja: "お腹すいた", choices: ["お腹すいた", "ありがとう", "すみません", "こんにちは"] },
  { zh: "幫幫我", ja: "助けて", choices: ["助けて", "ありがとう", "愛してる", "こんにちは"] },
  { zh: "好吃", ja: "おいしい", choices: ["おいしい", "そうだ", "ありがとう", "すみません"] },
  { zh: "多少錢", ja: "いくら", choices: ["いくら", "ありがとう", "そうだ", "こんにちは"] },
  { zh: "再來一份", ja: "おかわり", choices: ["おかわり", "ありがとう", "おいしい", "こんにちは"] },
  { zh: "請給我", ja: "ください", choices: ["ください", "ありがとう", "すみません", "そうだ"] },
  { zh: "不用了", ja: "大丈夫です", choices: ["大丈夫です", "ありがとう", "すみません", "ください"] },
  { zh: "等一下", ja: "ちょっと待って", choices: ["ちょっと待って", "ありがとう", "こんにちは", "そうだ"] },
  { zh: "沒問題", ja: "問題ない", choices: ["問題ない", "大丈夫", "ありがとう", "すみません"] },
  { zh: "真的嗎", ja: "本当", choices: ["本当", "ありがとう", "そうだ", "こんにちは"] },
  { zh: "不知道", ja: "わからない", choices: ["わからない", "ありがとう", "すみません", "そうだ"] },
  { zh: "我懂了", ja: "わかりました", choices: ["わかりました", "ありがとう", "すみません", "こんにちは"] },
  { zh: "辛苦了", ja: "お疲れ様", choices: ["お疲れ様", "ありがとう", "すみません", "こんにちは"] },
  { zh: "加油", ja: "頑張って", choices: ["頑張って", "ありがとう", "そうだ", "こんにちは"] },
  { zh: "乾杯", ja: "乾杯", choices: ["乾杯", "ありがとう", "おめでとう", "こんにちは"] },
  { zh: "早安", ja: "おはよう", choices: ["おはよう", "こんにちは", "ありがとう", "おやすみ"] },
  { zh: "晚安（睡前）", ja: "おやすみなさい", choices: ["おやすみなさい", "こんにちは", "ありがとう", "おはよう"] },
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

// 開始畫面（風格：橘綠色塊、圖示、等你來挑戰、玩過人數）
class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    this.cameras.main.setBackgroundColor("#f8fafc");

    // 裝飾：半透明圓角卡片底
    const cardW = 800*R, cardH = 420*R;
    const card = createRoundedRectGraphics(this, 480*R, 300*R, cardW, cardH, 24*R, 0xffffff, 0.5, 0xe5e7eb, 1);
    card.setDepth(0);

    // 裝飾：橘色、綠色色塊（多邊形/圓角矩形）
    const orange1 = this.add.graphics();
    orange1.fillStyle(0xf97316, 0.35);
    orange1.fillRoundedRect(720*R, 120*R, 80*R, 80*R, 12*R);
    orange1.setDepth(1);
    const green1 = this.add.graphics();
    green1.fillStyle(0x10b981, 0.35);
    green1.fillRoundedRect(180*R, 140*R, 70*R, 70*R, 10*R);
    green1.setDepth(1);
    const orange2 = this.add.graphics();
    orange2.fillStyle(0xfb923c, 0.25);
    orange2.fillRoundedRect(800*R, 380*R, 60*R, 60*R, 8*R);
    orange2.setDepth(1);
    const green2 = this.add.graphics();
    green2.fillStyle(0x14b8a6, 0.3);
    green2.fillRoundedRect(120*R, 360*R, 55*R, 55*R, 8*R);
    green2.setDepth(1);
    const greyBlock = this.add.graphics();
    greyBlock.fillStyle(0x94a3b8, 0.2);
    greyBlock.fillRoundedRect(760*R, 200*R, 50*R, 50*R, 8*R);
    greyBlock.setDepth(1);

    // 圖示：問號圓形
    const qCircle = this.add.graphics();
    qCircle.fillStyle(0xe2e8f0, 0.9);
    qCircle.lineStyle(2, 0xcbd5e1, 1);
    qCircle.strokeCircle(340*R, 130*R, 28*R);
    qCircle.fillCircle(340*R, 130*R, 28*R);
    qCircle.setDepth(2);
    this.add.text(340*R, 130*R, "?", {
      fontSize: (28*R) + "px",
      fontFamily: "system-ui",
      color: "#64748b",
      fontWeight: "700"
    }).setOrigin(0.5).setDepth(3);
    const qCircle2 = this.add.graphics();
    qCircle2.fillStyle(0xe2e8f0, 0.85);
    qCircle2.lineStyle(2, 0xcbd5e1, 1);
    qCircle2.strokeCircle(620*R, 180*R, 22*R);
    qCircle2.fillCircle(620*R, 180*R, 22*R);
    qCircle2.setDepth(2);
    this.add.text(620*R, 180*R, "?", {
      fontSize: (22*R) + "px",
      fontFamily: "system-ui",
      color: "#64748b",
      fontWeight: "700"
    }).setOrigin(0.5).setDepth(3);

    // 圖示：對話泡泡（簡單圓角矩形＋小三角）
    const bubble = this.add.graphics();
    bubble.fillStyle(0xf1f5f9, 0.95);
    bubble.lineStyle(2, 0xe2e8f0, 1);
    bubble.fillRoundedRect(680*R, 400*R, 64*R, 40*R, 8*R);
    bubble.strokeRoundedRect(680*R, 400*R, 64*R, 40*R, 8*R);
    bubble.fillStyle(0xf1f5f9, 0.95);
    bubble.fillTriangle(700*R, 438*R, 710*R, 450*R, 720*R, 438*R);
    bubble.setDepth(2);
    const bubble2 = this.add.graphics();
    bubble2.fillStyle(0xfed7aa, 0.4);
    bubble2.lineStyle(1, 0xfdba74, 0.6);
    bubble2.fillRoundedRect(660*R, 415*R, 40*R, 28*R, 6*R);
    bubble2.strokeRoundedRect(660*R, 415*R, 40*R, 28*R, 6*R);
    bubble2.setDepth(1);

    // 主標題
    const title = this.add.text(480*R, 150*R, "語言反應測驗", {
      fontSize: (42*R) + "px",
      fontFamily: "system-ui",
      color: "#1f2937",
      fontWeight: "700"
    }).setOrigin(0.5).setDepth(10);

    const subtitleEn = this.add.text(480*R, 195*R, "Korean / Japanese Reflex Quiz", {
      fontSize: (16*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280",
      fontWeight: "500"
    }).setOrigin(0.5).setDepth(10);

    // 等你來挑戰
    const challenge = this.add.text(480*R, 235*R, "等你來挑戰", {
      fontSize: (20*R) + "px",
      fontFamily: "system-ui",
      color: "#475569",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);

    // 說明
    const description = this.add.text(480*R, 268*R, "共 25 題，每題 3 秒內作答", {
      fontSize: (16*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280"
    }).setOrigin(0.5).setDepth(10);

    // 從分享連結進來時顯示朋友的分數（?score=XX）
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const sharedScore = params.get('score');
    if (sharedScore !== null && sharedScore !== '') {
      this.add.text(480*R, 305*R, "你的朋友得到 " + sharedScore + " 分！", {
        fontSize: (18*R) + "px",
        fontFamily: "system-ui",
        color: "#334155",
        fontWeight: "600"
      }).setOrigin(0.5).setDepth(10);
    }

    const btnW = 280*R;
    const btnH = 56*R;
    const btnX = 480*R;
    const btnRadius = 14*R;
    const gap = 20*R;

    const koBtnY = sharedScore ? 365*R : 335*R;
    const koBtn = createRoundedRectGraphics(this, btnX, koBtnY, btnW, btnH, btnRadius, 0x475569, 1, 0x334155, 2*R);
    koBtn.setDepth(10);
    this.add.text(btnX, koBtnY, "韓語版", {
      fontSize: (22*R) + "px",
      fontFamily: "system-ui",
      color: "#ffffff",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);
    koBtn.setInteractive(new Phaser.Geom.Rectangle(btnX - btnW/2, koBtnY - btnH/2, btnW, btnH), Phaser.Geom.Rectangle.Contains);
    koBtn.input.cursor = 'pointer';
    const setKoHover = (hover) => {
      koBtn.clear();
      koBtn.fillStyle(hover ? 0x334155 : 0x475569, 1);
      koBtn.lineStyle(2*R, 0x334155, 1);
      koBtn.fillRoundedRect(btnX - btnW/2, koBtnY - btnH/2, btnW, btnH, btnRadius);
      koBtn.strokeRoundedRect(btnX - btnW/2, koBtnY - btnH/2, btnW, btnH, btnRadius);
    };
    koBtn.on("pointerover", () => setKoHover(true));
    koBtn.on("pointerout", () => setKoHover(false));
    koBtn.on("pointerdown", () => {
      try { var n = parseInt(localStorage.getItem('playCount') || '0', 10); localStorage.setItem('playCount', String(n + 1)); } catch (e) {}
      this.scene.start("quiz", { language: "ko" });
    });

    const jaBtnY = koBtnY + btnH + gap;
    const jaBtn = createRoundedRectGraphics(this, btnX, jaBtnY, btnW, btnH, btnRadius, 0x475569, 1, 0x334155, 2*R);
    jaBtn.setDepth(10);
    this.add.text(btnX, jaBtnY, "日文版", {
      fontSize: (22*R) + "px",
      fontFamily: "system-ui",
      color: "#ffffff",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);
    jaBtn.setInteractive(new Phaser.Geom.Rectangle(btnX - btnW/2, jaBtnY - btnH/2, btnW, btnH), Phaser.Geom.Rectangle.Contains);
    jaBtn.input.cursor = 'pointer';
    jaBtn.on("pointerover", () => {
      jaBtn.clear();
      jaBtn.fillStyle(0x334155, 1);
      jaBtn.lineStyle(2*R, 0x334155, 1);
      jaBtn.fillRoundedRect(btnX - btnW/2, jaBtnY - btnH/2, btnW, btnH, btnRadius);
      jaBtn.strokeRoundedRect(btnX - btnW/2, jaBtnY - btnH/2, btnW, btnH, btnRadius);
    });
    jaBtn.on("pointerout", () => {
      jaBtn.clear();
      jaBtn.fillStyle(0x475569, 1);
      jaBtn.lineStyle(2*R, 0x334155, 1);
      jaBtn.fillRoundedRect(btnX - btnW/2, jaBtnY - btnH/2, btnW, btnH, btnRadius);
      jaBtn.strokeRoundedRect(btnX - btnW/2, jaBtnY - btnH/2, btnW, btnH, btnRadius);
    });
    jaBtn.on("pointerdown", () => {
      try { var n = parseInt(localStorage.getItem('playCount') || '0', 10); localStorage.setItem('playCount', String(n + 1)); } catch (e) {}
      this.scene.start("quiz", { language: "ja" });
    });

    // 右下角：玩過的人數（本機累計）
    let playCount = 0;
    try { playCount = parseInt(localStorage.getItem('playCount') || '0', 10); } catch (e) {}
    this.add.text(920*R, 520*R, "玩過的人數：" + playCount, {
      fontSize: (14*R) + "px",
      fontFamily: "system-ui",
      color: "#94a3b8"
    }).setOrigin(1, 0.5).setDepth(10);
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
    if (this.finalScore >= 150) {
      comment = "🎉 太棒了！";
      commentColor = "#10b981";
    } else if (this.finalScore >= 100) {
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

    const btnW = 300*R;
    const btnH = 60*R;
    const btnX = 480*R;
    const btnRadius = 16*R;

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    // 分享到 FB 按鈕（僅電腦版顯示）
    if (isDesktop) {
      const shareBtnY = 400*R;
      const shareBtn = createRoundedRectGraphics(this, btnX, shareBtnY, btnW, btnH, btnRadius, 0x1877f2, 1, 0x1877f2, 2*R);
      shareBtn.setDepth(10);
      this.add.text(btnX, shareBtnY, "分享到 FB", {
        fontSize: (24*R) + "px",
        fontFamily: "system-ui",
        color: "#ffffff",
        fontWeight: "600"
      }).setOrigin(0.5).setDepth(10);

      const shareHitArea = new Phaser.Geom.Rectangle(btnX - btnW/2, shareBtnY - btnH/2, btnW, btnH);
      shareBtn.setInteractive(shareHitArea, Phaser.Geom.Rectangle.Contains);
      shareBtn.input.cursor = 'pointer';

      shareBtn.on("pointerover", () => {
        shareBtn.clear();
        shareBtn.fillStyle(0x166fe5, 1);
        shareBtn.lineStyle(2*R, 0x166fe5, 1);
        shareBtn.fillRoundedRect(btnX - btnW/2, shareBtnY - btnH/2, btnW, btnH, btnRadius);
        shareBtn.strokeRoundedRect(btnX - btnW/2, shareBtnY - btnH/2, btnW, btnH, btnRadius);
      });
      shareBtn.on("pointerout", () => {
        shareBtn.clear();
        shareBtn.fillStyle(0x1877f2, 1);
        shareBtn.lineStyle(2*R, 0x1877f2, 1);
        shareBtn.fillRoundedRect(btnX - btnW/2, shareBtnY - btnH/2, btnW, btnH, btnRadius);
        shareBtn.strokeRoundedRect(btnX - btnW/2, shareBtnY - btnH/2, btnW, btnH, btnRadius);
      });
      shareBtn.on("pointerdown", () => {
        const shareUrl = 'https://korean-language-mini-games.netlify.app/?score=' + this.finalScore;
        const shareTitle = '韓語反應測驗 - Korean Reflex Quiz';
        const shareText = '等你來挑戰';

        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
          }).then(() => {}).catch(() => {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank', 'noopener');
          });
        } else {
          window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank', 'noopener');
        }
      });
    }

    // 再玩一次按鈕（電腦版在下方，手機版單一按鈕略上移）
    const btnY = isDesktop ? 480*R : 420*R;
    const restartBtn = createRoundedRectGraphics(this, btnX, btnY, btnW, btnH, btnRadius, 0x475569, 1, 0x334155, 2*R);
    restartBtn.setDepth(10);

    this.add.text(btnX, btnY, "再玩一次", {
      fontSize: (24*R) + "px",
      fontFamily: "system-ui",
      color: "#ffffff",
      fontWeight: "600"
    }).setOrigin(0.5).setDepth(10);

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
    this.maxQuestions = 25;
  }

  init(data) {
    this.language = data.language || "ko";
    this.questions = this.language === "ja" ? QUESTIONS_JA : QUESTIONS_KO;
  }

  create() {
    console.log('場景創建中...');
    
    this.score = 0;
    this.qi = 0;
    this.timeLeft = 3;
    this.timerEvent = null;
    
    this.cameras.main.setBackgroundColor("#f8fafc");

    const isKo = this.language === "ko";
    const titleStr = isKo ? "Korean Reflex Quiz" : "Japanese Reflex Quiz";
    const promptStr = isKo ? "請選出對應的韓語：" : "請選出對應的日文：";

    // 標題和分數
    this.title = this.add.text(20*R, 16*R, titleStr, { 
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
    this.questionText = this.add.text(480*R, 20*R, "第 1 / 25 題", {
      fontSize: (18*R) + "px",
      fontFamily: "system-ui",
      color: "#6b7280",
      fontWeight: "500"
    }).setOrigin(0.5).setDepth(10);

    // 問題卡片（圓角矩形，邊框：低彩度深藍）
    this.card = createRoundedRectGraphics(this, 480*R, 170*R, 900*R, 150*R, 16*R, 0x475569, 0.12, 0x334155, 4*R);
    this.card.setDepth(10);

    // 提示文字和中文問題
    this.prompt = this.add.text(60*R, 120*R, promptStr, { 
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
    if (this.qi >= this.maxQuestions) {
      this.scene.start("result", { score: this.score });
      return;
    }

    const q = this.questions[this.qi % this.questions.length];
    this.qi++;
    this.current = q;

    this.questionText.setText(`第 ${this.qi} / 25 題`);

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
          const correct = q.ko || q.ja;
          this.feedback.setText(`⏱️ 超時：正解是「${correct}」`);
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

    const correct = this.current.ko || this.current.ja;
    if (selectedAnswer === correct) {
      this.score += 10;
      this.feedback.setText("✅ 正確！");
    } else {
      this.feedback.setText(`❌ 錯了：正解是「${correct}」`);
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
