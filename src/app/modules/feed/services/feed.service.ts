import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '@/shared/models/feed.model';
import { RequestService } from '@/core/services/request.service';

@Injectable()
export class FeedService {

  private readonly basePath = '/feeds';

  constructor(private readonly requestService: RequestService) { }

  getFeedItems(): Observable<Feed[]> {
    return this.requestService.get<Feed[]>(this.basePath);
  }

  getRecentNotifications(): Observable<Feed[]> {
    return this.requestService.get<Feed[]>(`${this.basePath}`);
  }

  addFeed(feed: Feed): Observable<Feed> {
    return this.requestService.post(this.basePath, feed);
  }

  updateFeed(feed: Feed): Observable<Feed> {
    return this.requestService.put(this.basePath, feed);
  }
}
