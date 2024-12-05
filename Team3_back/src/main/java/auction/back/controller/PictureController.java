package auction.back.controller;

import auction.back.dto.request.PictureLikeRequestDto;
import auction.back.dto.response.ResponseDto;
import auction.back.service.PictureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/picture")
public class PictureController {
    private final PictureService pictureService;

    @GetMapping("")
    public ResponseDto<?> mainView(
            @RequestParam(value = "photo", required = false) Boolean photo,
            @RequestParam(value = "picture", required = false) Boolean picture,
            @RequestParam(value = "userId", required = false) String userId
    ){
        // 문자열 "null" 또는 null을 null로 변환
        Long userIdLong = (userId == null || userId.equals("null")) ? null : Long.parseLong(userId);
        return new ResponseDto<>(pictureService.pictureView(photo, picture, userIdLong));
    }

    @GetMapping("/{pictureId}")
    public ResponseDto<?> getPictureDetail(@PathVariable Long pictureId) {
        return new ResponseDto<>(pictureService.pictureDetailView(pictureId));
    }

    @PostMapping("")
    public ResponseDto<?> pictureLike(
            @RequestBody PictureLikeRequestDto pictureLikeRequestDto
            ) {
        return new ResponseDto<>(pictureService.pictureLike(pictureLikeRequestDto));
    }
}
