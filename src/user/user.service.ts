import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserSignInDto } from './dto/userSignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword.dto';
import { UserUpdatePhoneDto } from './dto/userUpdatePhone.dto';
import { UserUpdateAddressDto } from './dto/userUpdateAddress.dto';
import { UserUpdateAccountDto } from './dto/userUpdateAccoutn.dto';
import * as config from 'config';
import * as bcrypt from 'bcryptjs';

const jwtConfig = config.jwt;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<void> {
    const { nickname, password, phone, address, detail_address, gu, dong, bank, account, holder } = userSignUpDto;
    if (!nickname || !password || !phone || !address || !detail_address || !dong || !gu)
      throw new BadRequestException('빈 값 있음');
    const salt = await bcrypt.genSalt();
    const hassedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      nickname,
      password: hassedPassword,
      phone,
      address,
      detail_address,
      gu,
      dong,
      bank,
      account,
      holder,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.timeLog(error);
      if (error.code === '23505') throw new ConflictException('Existing username');
      throw new InternalServerErrorException();
    }
  }

  async signIn(userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    const { nickname, password } = userSignInDto;
    const user = await this.userRepository.findOne({ nickname });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { nickname };
      const accessToken = this.jwtService.sign(payload, { expiresIn: jwtConfig.expriseIn });
      return { accessToken };
    }
    throw new UnauthorizedException();
  }

  async updatePassword(userUpdatePasswordDto: UserUpdatePasswordDto, user: User): Promise<void> {
    const { password, updatedPassword } = userUpdatePasswordDto;
    if (await bcrypt.compare(password, user.password)) {
      const salt = await bcrypt.genSalt();
      const hassedPassword = await bcrypt.hash(updatedPassword, salt);
      await this.userRepository.update(user.id, {
        password: hassedPassword,
      });
    } else throw new UnauthorizedException();
  }

  async updatePhone(userUpdatePhoneDto: UserUpdatePhoneDto, user: User): Promise<void> {
    const { phone } = userUpdatePhoneDto;
    await this.userRepository.update(user.nickname, { phone });
  }

  async updateAddress(userUpdateAddress: UserUpdateAddressDto, user: User): Promise<void> {
    const { address, detail_address, dong } = userUpdateAddress;
    await this.userRepository.update(user.nickname, {
      address,
      detail_address,
      dong,
    });
  }

  async updateAccount(userUpdateAccount: UserUpdateAccountDto, user: User): Promise<void> {
    const { bank, account, holder } = userUpdateAccount;
    await this.userRepository.update(user.nickname, {
      bank,
      account,
      holder,
    });
  }

  async deleteUser(user: User): Promise<void> {
    await this.userRepository.delete(user.nickname);
  }

  userInfo(user: User): User {
    return user;
  }
}
