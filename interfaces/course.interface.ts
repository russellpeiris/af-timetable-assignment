export interface ICourse {
  name: string
  courseCode: string
  credits: number
  faculty: string
  description: string
  timeTable: string
}

export interface ITimetable {
  courseCode: string
  time: string
  day: string
  room: string
  lecturer: string
}

export interface IRoom {
  roomId: string
  capacity: number
  resources: string[]
}

export interface IResource {
  rId: string
  name: string
  isAvailable: boolean
}
