package auction.back.service;

import auction.back.config.AuctionWebSocketHandler;
import auction.back.domain.Auction;
import auction.back.domain.User;
import auction.back.dto.request.BidAuctionRequestDto;
import auction.back.dto.response.AuctionDetailViewResponseDto;
import auction.back.dto.response.AuctionListViewResponseDto;
import auction.back.dto.response.socket.AuctionUpdateMessage;
import auction.back.repository.AuctionRepository;
import auction.back.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionService {
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final AuctionWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    @Transactional
    public boolean bidAuction(BidAuctionRequestDto bidAuctionRequestDto) {
        User user = userRepository.findById(bidAuctionRequestDto.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Auction auction = auctionRepository.findById(bidAuctionRequestDto.auctionId())
                .orElseThrow(() -> new EntityNotFoundException("Auction not found"));

        if (auction.getFinishAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Auction is already finished");
        }

        long currentPrice = Long.parseLong(auction.getIngPrice());
        long bidPrice = Long.parseLong(bidAuctionRequestDto.bidPrice());

        if (bidPrice <= currentPrice) {
            throw new IllegalArgumentException("Bid price must be higher than current price");
        }

        auction.updateBid(bidAuctionRequestDto.bidPrice(), bidAuctionRequestDto.userId());
        auctionRepository.save(auction);

        try {
            AuctionUpdateMessage updateMessage = new AuctionUpdateMessage(
                    auction.getId(),
                    auction.getIngPrice(),
                    user.getUserName()
            );
            String message = objectMapper.writeValueAsString(updateMessage);
            webSocketHandler.broadcastAuctionUpdate(auction.getId(), message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return true;
    }

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

    public AuctionDetailViewResponseDto detailView(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new EntityNotFoundException("Auction not found with id: " + auctionId));

        if (auction.getLastBidUser() != null) {
            User lastBidUser = userRepository.findById(auction.getLastBidUser())
                    .orElseThrow(() -> new EntityNotFoundException("Last bid user not found"));
            return AuctionDetailViewResponseDto.of(auction, lastBidUser);
        }

        // lastBidUser가 없는 경우
        return AuctionDetailViewResponseDto.of(auction, null);
    }
}
