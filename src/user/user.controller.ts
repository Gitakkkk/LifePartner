import { Body, Controller, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSignInDto } from './dto/userSignIn.dto';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserUpdateAccountDto } from './dto/userUpdateAccoutn.dto';
import { UserUpdateAddressDto } from './dto/userUpdateAddress.dto';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword.dto';
import { UserUpdatePhoneDto } from './dto/userUpdatePhone.dto';
import { User } from './user.entity';
import { GetUser } from './user.info';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userSignUpDto: UserSignUpDto): Promise<void> {
    return this.userService.signUp(userSignUpDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(userSignInDto);
  }

  @Patch('password')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  updatePassword(@Body() userUpdatePasswordDto: UserUpdatePasswordDto, @GetUser() user: User): Promise<void> {
    return this.userService.updatePassword(userUpdatePasswordDto, user);
  }

  @Patch('phone')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  updatePhone(@Body() userUpdatePhoneDto: UserUpdatePhoneDto, @GetUser() user: User): Promise<void> {
    return this.userService.updatePhone(userUpdatePhoneDto, user);
  }

  @Patch('address')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  updateAddress(@Body() userUpdateAddressDto: UserUpdateAddressDto, @GetUser() user: User): Promise<void> {
    return this.userService.updateAddress(userUpdateAddressDto, user);
  }

  @Patch('account')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  updateAccount(@Body() userUpdateAccountDto: UserUpdateAccountDto, @GetUser() user: User): Promise<void> {
    return this.userService.updateAccount(userUpdateAccountDto, user);
  }

  @Get('info')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  userInfo(@GetUser() user: User): User {
    return this.userService.userInfo(user);
  }
}
