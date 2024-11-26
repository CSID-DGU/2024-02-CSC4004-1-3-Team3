package auction.back.controller;

import auction.back.dto.request.UserLoginRequestDto;
import auction.back.dto.request.UserSignUpRequestDto;
import auction.back.dto.response.ResponseDto;
import auction.back.dto.response.UserLoginResponseDto;
import auction.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseDto<UserLoginResponseDto> login(@RequestBody UserLoginRequestDto userLoginRequestDto){
        return new ResponseDto<>(userService.login(userLoginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseDto<Boolean> signup(@RequestBody UserSignUpRequestDto userSignUpRequestDto){
        return new ResponseDto<>(userService.signup(userSignUpRequestDto));
    }
}
