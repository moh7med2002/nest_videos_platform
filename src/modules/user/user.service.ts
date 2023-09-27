import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './dto';
import { Role } from 'src/common/types/role.enum';
import { hashPassword, VerifyPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';
import { sendWhtsappMessage } from 'src/common/util/sendWhatsapp';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepositry)
    private userModel: typeof User,
  ) {}

  async register(
    dto: UserSignupDto,
    file: Express.Multer.File,
  ): Promise<{ msg: string }> {
    const { password, email, name } = dto;
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('Invalid Email');
    }
    const hasPassword = await hashPassword(password);
    await this.userModel.create({
      image: file.filename,
      password: hasPassword,
      email,
      name,
    });
    return { msg: 'User account has been created' };
  }

  async login(
    dto: UserLoginDto,
  ): Promise<{ msg: string; user: User; token: string }> {
    const { email } = dto;
    const user = await this.userModel
      .scope('withoutTimeStamps')
      .findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException('Invalid Email');
    }
    const isMatch = await VerifyPassword(dto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid Password');
    }
    const payload = { userId: user.id, role: Role.User };
    const access_token = generateToken(payload);
    const { password, ...other } = user.toJSON();
    await sendWhtsappMessage();
    return {
      msg: 'success login',
      user: other,
      token: access_token,
    };
  }

  async userById(id: any): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new BadRequestException('invalid user id');
    }
    return user;
  }
}
