package auction.back.controller;

import auction.back.dto.response.ResponseDto;
import auction.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mypage")
public class MypageController {
    private final UserService userService;

    @GetMapping("")
    public ResponseDto<?> myView(
            @RequestParam(value = "userId", required = false) Long userId
    ) {
        return new ResponseDto<>(userService.myView(userId));
    }
}
