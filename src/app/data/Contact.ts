export class Contact {
  id: number;
  name: string;
  emails: any[];
  address: any[];

  constructor(id: number, name: string, emails: any[], address: any[]) {
    this.id = id;
    this.name = name;
    this.emails = emails;
    this.address = address;

  }
}
