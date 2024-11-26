package auction.back.controller;

import auction.back.dto.response.ResponseDto;
import auction.back.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/main")
public class MainController {
    private final MainService mainService;

    @GetMapping("")
    public ResponseDto<?> mainView(){
        return new ResponseDto<>(mainService.mainView());
    }
}
