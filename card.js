let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchActive = false;
  touchIdentifier = null;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse event listeners
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating && this.holdingPaper) {
        this.velX = e.clientX - this.touchStartX;
        this.velY = e.clientY - this.touchStartY;
      }
      if (this.holdingPaper) {
        this.touchStartX = e.clientX;
        this.touchStartY = e.clientY;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      e.preventDefault(); // Prevent default behavior to avoid text selection
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      this.touchIdentifier = e.button; // Use button 0 for dragging and button 2 for rotation

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.touchIdentifier = null;
      this.rotating = false;
    });

    // Touch event listeners
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      this.touchActive = true;
      this.touchIdentifier = e.changedTouches[0].identifier;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.touchActive = false;
      this.touchIdentifier = null;
      this.rotating = false;
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
      this.velX = this.touchMoveX - this.touchStartX;
      this.velY = this.touchMoveY - this.touchStartY;
      this.touchStartX = this.touchMoveX;
      this.touchStartY = this.touchMoveY;
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
  const targetTime = 62; // 1 minute and 2 seconds
  if (audioPlayer.currentTime >= targetTime) {
    setTimeout(() => {
      window.location.href = 'flowers.html';
    }, 4000);
  }
});
