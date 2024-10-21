import { EffectCards } from 'swiper/modules';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements AfterViewInit {
  ngAfterViewInit() {
    // Initialize Swiper with EffectCards
    this.cards = [
      {
        img: '../../assets/images/img1.jpg',
        title: 'First DHH Concert: Prabh Deep | Kr$na Live in Sydney',
        description:
          'This is the story of a spectacular coincidence. I was at Singapore Airport wandering around the duty-free shops when I spotted Krsna walking into the LV store with two other people. I didn’t want to intrude on his privacy, but I thought, “Why not?” I have been a DHH listener for quite some time now. However, given my age and the fact that I don’t know anyone in my life who listens to DHH, this was an extremely surreal moment for me. I approached Krsna, and without me saying anything, he just said, “Hey bro, how are you?” I was at a loss for words but managed to tell him how much I loved his music and wished him the very best. Krsna thanked me and asked if I was from Singapore. I replied that I was actually waiting for my flight to Sydney. To my surprise, he said he was also going to Sydney and would be performing on Sunday! I was surprised but not shocked, as I am not on Instagram, which is typically where artists announce their upcoming concerts. Nevertheless, I told him I would definitely be there and said goodbye without asking for pictures. I started searching online but couldn’t figure out how to get into the concert. I noticed that Prabh was also performing, which had me jumping with joy since I love him even more. I thought I’d try to figure it out later or maybe approach Krsna and his group again while waiting for my flight to ask how to get tickets. While waiting, Krsna and one of the people with him went ahead first, leaving one person still waiting in line. I approached him, and he recognized me from earlier. We got to talking, and he told me that he DJs for Krsna. I mentioned I couldn’t figure out how to get tickets for the concert, and he replied that it was actually free! He also said that if I had any problems, I could call him. He gave me his number, and then we boarded the flight. When the day of the concert arrived, I was all set. The entry was indeed free. Prabh performed first, and he was absolutely incredible. The timing of the show and the fact that it wasn’t widely advertised meant that the audience was smaller, but he still killed it. He rapped all the way through without any breaks and even got a guy to rap during “Maya” or “Amar” (sorry, I can’t remember which one). There wasn’t even a hint of “apne fans se jhagda karta tha” (looking at you, encore). He even performed “Class Sikh” without the beat as people requested it. I was almost in tears, having listened to almost everything Prabh has released over the years multiple times. He even performed “Zum” and the track with Faris from DSP. Then came Krsna, and the hype was undeniable—people were raging. Krsna also performed the “Bantai Diss” (sorry, I can’t remember its name either). Udit, the DJ from earlier, was also on stage and killed it! I loved the energy on stage, and he ended with “No Cap,” performing both “Khatta Flow” and “Hola Amigo.” Had I not run into Krsna, I would NOT have even known about the concert. I’m so happy after this amazing coincidence. Much love to both Krsna and Prabh—he definitely deserves everything he wants, man. The guy is just so incredibly talented.',
        publishDate: '12-10-2023',
      },

      {
        img: '../../assets/images/img2.webp',
        title: 'MTV Hustle Season 4 to premiere on October 19 ',
        description:
          'New Delhi: MTV, an Indian youth entertainment brand, has announced the fourth season of its rap reality show, MTV Hustle.  The new season will premiere on October 19, airing every Saturday and Sunday at 7 PM on MTV and JioCinema.',
        publishDate: '12-10-2023',
      },
      {
        img: '../../assets/images/tt.jpeg',
        title: 'What is the beef between seedhe maut and sos?',
        description:
          'The conflict reignited with the release of “Blackball” by SOS. In this track, the Kashmiri duo Tufail and AATANKI took aim at Seedhe Maut, specifically talking about how Encore girlfriend had a crush on Tufail, and accusing the duo of plagiarism',
        publishDate: '12-10-2023',
      },
      {
        img: '../../assets/images/redhouse.jpg',
        title: 'Demo card 4',
        description: 'This is a demo for Tinder like swipe cards',
        publishDate: '12-10-2023',
      },
      {
        img: '../../assets/images/img1.jpg',
        title: 'Demo card 5',
        description: 'This is a demo for Tinder like swipe cards',
        publishDate: '12-10-2023',
      },
    ];
  }

  cards: Array<{
    img: string;
    title: string;
    description: string;
    publishDate: any;
  }> = [];

  constructor() {}

  logChoice(choice: any) {
    // console.log(`Choice made: ${choice}`);
  }
}
