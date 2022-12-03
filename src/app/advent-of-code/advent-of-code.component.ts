import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdventOfCodeService, IAdventOfCodeData, IAdventOfCodeDay } from './advent-of-code.service';

interface IAdventOfCodeDayViewInfo extends IAdventOfCodeDay {
  videoUrl?: SafeUrl;
  puzzleUrl?: SafeUrl;
}

@Component({
  selector: 'app-advent-of-code',
  templateUrl: './advent-of-code.component.html',
  styleUrls: ['./advent-of-code.component.scss']
})
export class AdventOfCodeComponent implements OnInit {

  pastDays!: IAdventOfCodeDayViewInfo[];
  nextVideo?: IAdventOfCodeDayViewInfo;

  constructor(private service: AdventOfCodeService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    const data = await this.service.getData();
    const latestYear = data['2022'];
    this.nextVideo = latestYear.find(d => d.debut);
    if (this.nextVideo) {
      this.nextVideo.videoUrl = this.getVideoUrl(this.nextVideo.videoId);
      this.nextVideo.puzzleUrl = this.getPuzzleUrl(this.nextVideo.day);
    }
    this.pastDays = latestYear
      .filter(d => d.title)
      .sort((a, b) => +b.day! - +a.day!)
      .map(x => ({
        ...x, 
        videoUrl: this.getVideoUrl(x.videoId),
        puzzleUrl: this.getPuzzleUrl(x.day)
      }));
  }

  private getVideoUrl(videoId: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
  
  private getPuzzleUrl(day: number): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://adventofcode.com/2022/day/${day}`
    );
  }
}
