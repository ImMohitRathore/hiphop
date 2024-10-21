import ColorThief from 'colorthief';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'tinder-ui',
  templateUrl: 'tinder-ui.component.html',
  styleUrls: ['tinder-ui.component.scss'],
})
export class TinderUiComponent implements AfterViewInit {
  @Input() cards: Array<{
    img: string;
    title: string;
    description: string;
    shadow?: string;

    bgcolor?: String;
  }> = [];
  @Output() choiceMade = new EventEmitter<{ choice: boolean; payload: any }>();

  @ViewChildren('tinderCard') tinderCards!: QueryList<ElementRef>;
  tinderCardsArray!: Array<ElementRef>;
  moveOutWidth: number = 1000; // Adjust based on your layout
  transitionInProgress: boolean = false;
  heartVisible: boolean = false;
  crossVisible: boolean = false;
  shiftRequired: boolean = false;

  constructor(private renderer: Renderer2) {}

  async ngAfterViewInit() {
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });

    // const dominantColor = await this.getDominantColor(
    //   'https://rollingstoneindia.com/wp-content/uploads/2021/03/KRSNA-scaled-e1616391188107-960x754.jpg'
    // );
    // console.log(`Dominant color for  ${dominantColor}`);
    // this.extractDominantColor('../../assets/images/img2.webp');
  }

  currentCardImage: any = '';

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes?.['cards']?.currentValue) {
      // Use map and Promise.all to wait for all gradients to be extracted
      this.cards = await Promise.all(
        this.cards.map(async (card, index) => {
          const { shadow, bgcolor } = await this.generateGradients(card.img);
          if (index == 0) {
            this.currentCardImage = bgcolor;
          }
          return { ...card, shadow, bgcolor };
        })
      );

      console.log('Updated cards:', this.cards);
    }
  }

  userClickedButton(event: Event, heart: boolean) {
    event.preventDefault();

    if (this.tinderCardsArray.length === 0 || this.transitionInProgress) return;

    const card = this.tinderCardsArray[0].nativeElement;

    // Apply transformations based on the button clicked
    const transformValue = heart ? this.moveOutWidth : -this.moveOutWidth;
    this.renderer.setStyle(
      card,
      'transform',
      `translate(${transformValue}px, -100px) rotate(${heart ? -30 : 30}deg)`
    );

    // Emit the choice made
    this.makeChoice(heart ? 'like' : 'dislike');

    this.transitionInProgress = true;

    // Reset transition after a delay
    // setTimeout(() => {
    //   this.handleShift();
    // }, 300); // Match this with your CSS transition duration
  }

  toggleChoiceIndicator(left: boolean, right: boolean) {
    this.crossVisible = left;
    this.heartVisible = right;
  }

  handlePan(event: any) {
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.cards.length
    ) {
      return;
    }

    if (this.transitionInProgress) {
      this.handleShift();
    }

    const cardElement = this.tinderCardsArray[0]?.nativeElement;
    if (!cardElement) return;

    this.renderer.addClass(cardElement, 'moving');

    // Show choice indicators based on the swipe direction
    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    } else {
      this.toggleChoiceIndicator(true, false);
    }

    // Move the card
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(
      cardElement,
      'transform',
      `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`
    );

    this.shiftRequired = true;
  }

  handlePanEnd(event: any) {
    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) return;

    const cardElement = this.tinderCardsArray[0]?.nativeElement;
    if (!cardElement) return;

    this.renderer.removeClass(cardElement, 'moving');

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(cardElement, 'transform', '');
      this.shiftRequired = false;
    } else {
      const endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(
        cardElement,
        'transform',
        `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`
      );

      this.shiftRequired = true;
      this.emitChoice(event.deltaX > 0, this.cards[0]);

      this.currentCardImage = this.cards[1]
        ? this.cards[1]?.bgcolor
        : this.cards[0]?.bgcolor;

      if (this.cards.length === 0) {
        this.currentCardImage = '';
      }
      this.transitionInProgress = true;
    }
  }

  makeChoice(choice: string) {
    // Emit the choice made
    this.choiceMade.emit({ choice: choice === 'like', payload: this.cards[0] });
  }

  handleShift() {
    this.transitionInProgress = false;

    this.cards.shift(); // Remove the first card
  }

  emitChoice(like: boolean, card: any) {
    this.choiceMade.emit({ choice: like, payload: card });
  }

  generateGradients(
    imageUrl: string
  ): Promise<{ shadow: string; bgcolor: string }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        try {
          const colorThief = new ColorThief();

          const dominantColor = colorThief.getColor(img);

          // Darken the dominant color for the bottom
          const darkenedColor = dominantColor.map((value) =>
            Math.max(value - 50, 0)
          );

          // Lighten the dominant color for the top
          const lightenedColor = dominantColor.map((value) =>
            Math.min(value + 30, 255)
          );

          // Create a shadow gradient (linear-gradient from darkened to original to transparent)
          const shadowGradient = `linear-gradient(to top, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 1), rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.7), rgba(${lightenedColor[0]}, ${lightenedColor[1]}, ${lightenedColor[2]}, 0))`;

          // Create the background gradient (from darkened to lightened)
          const bgcolorGradient = `linear-gradient(to top, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 1), rgba(${lightenedColor[0]}, ${lightenedColor[1]}, ${lightenedColor[2]}, 1))`;

          resolve({ shadow: shadowGradient, bgcolor: bgcolorGradient });
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }
}
