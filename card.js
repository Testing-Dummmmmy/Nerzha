let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchActive = false;
  touchIdentifier = null;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  longTapThreshold = 500; // Define a long tap threshold in milliseconds
  longTapTimer = null;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse event listeners (unchanged)
    
    paper.addEventListener('mousedown', (e) => {
      // (unchanged)
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.touchActive = false;
      this.touchIdentifier = null;
      this.rotating = false;
      if (this.longTapTimer) {
        clearTimeout(this.longTapTimer);
      }
    });

    // Touch event listeners
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      this.touchActive = true;
      this.touchIdentifier = e.changedTouches[0].identifier;
      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;

      // Start a timer to detect long tap
      this.longTapTimer = setTimeout(() => {
        this.rotating = true;
      }, this.longTapThreshold);
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.touchActive = false;
      this.touchIdentifier = null;
      this.rotating = false;
      if (this.longTapTimer) {
        clearTimeout(this.longTapTimer);
      }
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.touchActive) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === this.touchIdentifier) {
          this.touchMoveX = e.changedTouches[i].clientX;
          this.touchMoveY = e.changedTouches[i].clientY;
          break;
        }
      }
      if (!this.rotating) {
        this.velX = this.touchMoveX - this.touchStartX;
        this.velY = this.touchMoveY - this.touchStartY;
        this.touchStartX = this.touchMoveX;
        this.touchStartY = this.touchMoveY;
      }
    });

    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    paper.style.touchAction = 'none';
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener('timeupdate', () => {
  const targetTime = 62;
  if (audioPlayer.currentTime >= targetTime) {
    setTimeout(() => {
      window.location.href = 'flowers.html';
    }, 4000);
  }
});
