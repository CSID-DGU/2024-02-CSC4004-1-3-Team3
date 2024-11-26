package auction.back.controller;

import auction.back.dto.response.ResponseDto;
import auction.back.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{auctionId}")
    public ResponseDto<?> finishView(@PathVariable Long auctionId){
        return new ResponseDto<>(auctionService.detailView(auctionId));
    }
}
