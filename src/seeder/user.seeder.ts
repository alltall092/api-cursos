
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async seed() {
    let user = [
      { username: "julio", email: "piyoyo279@gmail.com", password: "123456" },
      { username: "maria", email: "maria@gmail.com", password: "1234" },
      { username: "rosa", email: "rosa03@gmail.com", password: "123456" }
  ];

    await Promise.all(user.map(async (user) => {
      const newUser =  this.userRepository.create(user);
      await this.userRepository.save(newUser);
    }));
  }
}