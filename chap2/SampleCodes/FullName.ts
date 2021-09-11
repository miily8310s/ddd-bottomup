// 氏名を表現するFullNameクラス
// 本クラスで確実に性を表示できる
export class FullName {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  public equals(other: FullName) {
    if (other === null) return false;
    if (this === other) return true;
    return this.firstName == other.firstName && this.lastName == other.lastName;
  }
  public getFirstName() {
    return this.firstName;
  }
  public getLastName() {
    return this.lastName;
  }
  public changeLastName(name: string) {
    this.lastName = name;
  }
}
