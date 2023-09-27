import { IsNotEmpty, IsUrl } from 'class-validator';

export class VideoDto {
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  categoryId: string | number;
}
