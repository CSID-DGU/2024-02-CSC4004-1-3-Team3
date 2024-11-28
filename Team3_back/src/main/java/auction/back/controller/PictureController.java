package auction.back.controller;

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
            @RequestParam(value = "userId", required = false) Long userId
    ){
        return new ResponseDto<>(pictureService.pictureView(photo, picture, userId));
    }

    @GetMapping("/{pictureId}")
    public ResponseDto<?> getPictureDetail(@PathVariable Long pictureId) {
        return new ResponseDto<>(pictureService.pictureDetailView(pictureId));
    }
}
