export class CreateForgottenPasswordDto {
  email: string;
  token: string = '';
  createdBy: number;
}
