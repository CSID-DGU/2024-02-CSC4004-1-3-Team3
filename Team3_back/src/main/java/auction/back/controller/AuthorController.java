package auction.back.controller;

import auction.back.dto.response.ResponseDto;
import auction.back.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/author")
public class AuthorController {
    private final AuthorService authorService;

    @GetMapping("")
    public ResponseDto<?> mainView(
            @RequestParam(value = "follow", required = false) Boolean way
    ){
        return new ResponseDto<>(authorService.mainView(way));
    }

    @GetMapping("/{userId}")
    public ResponseDto<?> getAuthorDetail(@PathVariable Long userId) {
        return new ResponseDto<>(authorService.authorDetailView(userId));
    }
}
