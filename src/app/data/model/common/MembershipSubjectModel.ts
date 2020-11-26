export interface IMembershipSubjectModel {

  RequestType: string;
  Code: number;
  Message: string;
}

export class MembershipSubjectModel implements IMembershipSubjectModel {

  RequestType: string;
  Code: number;
  Message: string;

  constructor(RequestType: string, Code: number, Message: string) {
    this.RequestType = RequestType;
    this.Code = Code;
    this.Message = Message;
  }
}
