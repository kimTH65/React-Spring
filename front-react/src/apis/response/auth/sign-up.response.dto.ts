import ResponseDto from "../response.dto";

export default interface SignUpResponseDto extends ResponseDto {
  user?: {
    email: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail?: string | null;
  };
}