// Original file: proto/services.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GenericResponse as _auth_GenericResponse, GenericResponse__Output as _auth_GenericResponse__Output } from '../auth/GenericResponse';
import type { GetMeInput as _auth_GetMeInput, GetMeInput__Output as _auth_GetMeInput__Output } from '../auth/GetMeInput';
import type { RefreshTokenInput as _auth_RefreshTokenInput, RefreshTokenInput__Output as _auth_RefreshTokenInput__Output } from '../auth/RefreshTokenInput';
import type { RefreshTokenResponse as _auth_RefreshTokenResponse, RefreshTokenResponse__Output as _auth_RefreshTokenResponse__Output } from '../auth/RefreshTokenResponse';
import type { SendEmailInput as _auth_SendEmailInput, SendEmailInput__Output as _auth_SendEmailInput__Output } from '../auth/SendEmailInput';
import type { SignInUserInput as _auth_SignInUserInput, SignInUserInput__Output as _auth_SignInUserInput__Output } from '../auth/SignInUserInput';
import type { SignInUserResponse as _auth_SignInUserResponse, SignInUserResponse__Output as _auth_SignInUserResponse__Output } from '../auth/SignInUserResponse';
import type { SignUpUserInput as _auth_SignUpUserInput, SignUpUserInput__Output as _auth_SignUpUserInput__Output } from '../auth/SignUpUserInput';
import type { UserResponse as _auth_UserResponse, UserResponse__Output as _auth_UserResponse__Output } from '../auth/UserResponse';
import type { VerifyEmailInput as _auth_VerifyEmailInput, VerifyEmailInput__Output as _auth_VerifyEmailInput__Output } from '../auth/VerifyEmailInput';

export interface AuthServiceClient extends grpc.Client {
  GetMe(argument: _auth_GetMeInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _auth_GetMeInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _auth_GetMeInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _auth_GetMeInput, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _auth_GetMeInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _auth_GetMeInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _auth_GetMeInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _auth_GetMeInput, callback: grpc.requestCallback<_auth_UserResponse__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _auth_RefreshTokenInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _auth_RefreshTokenInput, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _auth_RefreshTokenInput, callback: grpc.requestCallback<_auth_RefreshTokenResponse__Output>): grpc.ClientUnaryCall;
  
  SendEmail(argument: _auth_SendEmailInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _auth_SendEmailInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _auth_SendEmailInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _auth_SendEmailInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _auth_SendEmailInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _auth_SendEmailInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _auth_SendEmailInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _auth_SendEmailInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  
  SignInUser(argument: _auth_SignInUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  SignInUser(argument: _auth_SignInUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  SignInUser(argument: _auth_SignInUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  SignInUser(argument: _auth_SignInUserInput, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  signInUser(argument: _auth_SignInUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  signInUser(argument: _auth_SignInUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  signInUser(argument: _auth_SignInUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  signInUser(argument: _auth_SignInUserInput, callback: grpc.requestCallback<_auth_SignInUserResponse__Output>): grpc.ClientUnaryCall;
  
  SignUpUser(argument: _auth_SignUpUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _auth_SignUpUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _auth_SignUpUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _auth_SignUpUserInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _auth_SignUpUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _auth_SignUpUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _auth_SignUpUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _auth_SignUpUserInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  
  VerifyEmail(argument: _auth_VerifyEmailInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _auth_VerifyEmailInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _auth_VerifyEmailInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _auth_VerifyEmailInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _auth_VerifyEmailInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _auth_VerifyEmailInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _auth_VerifyEmailInput, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _auth_VerifyEmailInput, callback: grpc.requestCallback<_auth_GenericResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  GetMe: grpc.handleUnaryCall<_auth_GetMeInput__Output, _auth_UserResponse>;
  
  RefreshToken: grpc.handleUnaryCall<_auth_RefreshTokenInput__Output, _auth_RefreshTokenResponse>;
  
  SendEmail: grpc.handleUnaryCall<_auth_SendEmailInput__Output, _auth_GenericResponse>;
  
  SignInUser: grpc.handleUnaryCall<_auth_SignInUserInput__Output, _auth_SignInUserResponse>;
  
  SignUpUser: grpc.handleUnaryCall<_auth_SignUpUserInput__Output, _auth_GenericResponse>;
  
  VerifyEmail: grpc.handleUnaryCall<_auth_VerifyEmailInput__Output, _auth_GenericResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  GetMe: MethodDefinition<_auth_GetMeInput, _auth_UserResponse, _auth_GetMeInput__Output, _auth_UserResponse__Output>
  RefreshToken: MethodDefinition<_auth_RefreshTokenInput, _auth_RefreshTokenResponse, _auth_RefreshTokenInput__Output, _auth_RefreshTokenResponse__Output>
  SendEmail: MethodDefinition<_auth_SendEmailInput, _auth_GenericResponse, _auth_SendEmailInput__Output, _auth_GenericResponse__Output>
  SignInUser: MethodDefinition<_auth_SignInUserInput, _auth_SignInUserResponse, _auth_SignInUserInput__Output, _auth_SignInUserResponse__Output>
  SignUpUser: MethodDefinition<_auth_SignUpUserInput, _auth_GenericResponse, _auth_SignUpUserInput__Output, _auth_GenericResponse__Output>
  VerifyEmail: MethodDefinition<_auth_VerifyEmailInput, _auth_GenericResponse, _auth_VerifyEmailInput__Output, _auth_GenericResponse__Output>
}
