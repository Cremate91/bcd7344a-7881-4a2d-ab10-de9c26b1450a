interface Venue {
  id: string,
  name: string,
  contentUrl: string,
  live: boolean,
  direction: string
}

interface Pick {
  id: string,
  blurb: string,
}

interface Artist {
  id: string,
  name: string,
  _id: {
    $oid: string
  }
}

export interface TLEvent {
  _id: string,
  title: string
  flyerFront: string,
  attending: number,
  date: string,
  startTime: Date,
  endTime: Date,
  contentUrl: string,
  venue: Venue,
  pick: Pick,
  artists: Artist[],
  city: string,
  country: string,
  private: boolean,
  __v: number
}