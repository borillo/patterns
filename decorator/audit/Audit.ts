// Domain

export interface User {
  login: string;
  fullName: string;
}

export interface UserRepository {
  findUsers: () => User[];
}

// Infra

export class UserRepositoryMysql implements UserRepository {
  private count;

  constructor() {
    this.count = 0;
  }

  findUsers(): User[] {
    const data = this.computeData();

    this.count += 1;

    if (this.count === 1) {
      return data;
    } else {
      throw Error("🧨");
    }
  }

  computeData() {
    return [{ login: "ricardo", fullName: "Ricardo Borillo" }];
  }
}

export class UserCache implements UserRepository {
  private decorated: UserRepository;
  private cachedData = null;

  constructor(decorated: UserRepository) {
    this.decorated = decorated;
  }

  findUsers(): User[] {
    if (this.cachedData == null) this.cachedData = this.decorated.findUsers();

    return this.cachedData;
  }
}

export class Logging implements UserRepository {
  private decorated: UserRepository;

  constructor(decorated: UserRepository) {
    this.decorated = decorated;
  }

  findUsers(): User[] {
    console.log("Pidiendo datos...");

    const data = this.decorated.findUsers();

    console.log("Datos obtenidos...");

    return data;
  }
}

export class RepositoryFactory {
  static buildLoggableRepository(): UserRepository {
    return new Logging(new UserRepositoryMysql());
  }

  static buildRepository(device): UserRepository {
    return new Logging(new UserRepositoryMysql());
  }
}
