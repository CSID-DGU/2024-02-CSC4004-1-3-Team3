package auction.back.service;

import auction.back.domain.Auction;
import auction.back.dto.response.AuctionListViewResponseDto;
import auction.back.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionService {
    private final AuctionRepository auctionRepository;

    public List<AuctionListViewResponseDto> onGoingView() {
        List<Auction> ongoingAuctions = auctionRepository.findOngoingAuctions();
        return ongoingAuctions.stream()
                .map(AuctionListViewResponseDto::of)
                .collect(Collectors.toList());
    }

    public List<AuctionListViewResponseDto> finishView(){
        List<Auction> finishAuctions = auctionRepository.findFinishAuctions();
        return finishAuctions.stream()
                .map(AuctionListViewResponseDto::of)
                .collect(Collectors.toList());
    }
}
