package auction.back.controller;

import auction.back.dto.response.ResponseDto;
import auction.back.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auction")
public class AuctionController {
    private final AuctionService auctionService;

    @GetMapping("")
    public ResponseDto<?> onGoingView(){
        return new ResponseDto<>(auctionService.onGoingView());
    }

    @GetMapping("/finish")
    public ResponseDto<?> finishView(){
        return new ResponseDto<>(auctionService.finishView());
    }
}
