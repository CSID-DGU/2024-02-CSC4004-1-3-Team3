package auction.back.controller;

import auction.back.dto.request.PictureRegistrationRequestDto;
import auction.back.dto.response.ResponseDto;
import auction.back.service.PictureService;
import auction.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mypage")
public class MypageController {
    private final UserService userService;
    private final PictureService pictureService;

    @GetMapping("")
    public ResponseDto<?> myView(
            @RequestParam(value = "userId", required = false) Long userId
    ) {
        return new ResponseDto<>(userService.myView(userId));
    }

    @PostMapping("/registration")
    public ResponseDto<?> registration(
            @ModelAttribute PictureRegistrationRequestDto request
    ) {
        return new ResponseDto<>(pictureService.registration(request));
    }
}
