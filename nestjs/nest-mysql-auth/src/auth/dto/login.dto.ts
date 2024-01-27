import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {

  @IsEmail()
  email: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  password: string
}