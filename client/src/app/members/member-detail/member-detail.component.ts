import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule]
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.loadMember();
  }

  loadMember() {

    const username = this.route.snapshot.paramMap.get('username');
    console.log(username)
    if (!username) return;
    this.memberService.getMember(username).subscribe(
      member => {
        this.member = member;
      })

  }

  
  }


