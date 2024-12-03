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

//    @Transactional
//    public boolean bidAuction(BidAuctionRequestDto bidAuctionRequestDto) {
//        User user = userRepository.findById(bidAuctionRequestDto.userId())
//                .orElseThrow(() -> new EntityNotFoundException("User not found"));
//
//        Auction auction = auctionRepository.findById(bidAuctionRequestDto.auctionId())
//                .orElseThrow(() -> new EntityNotFoundException("Auction not found"));
//
//        // 현재 진행중인 경매인지 확인
//        if (auction.getFinishAt().isBefore(LocalDateTime.now())) {
//            throw new IllegalStateException("Auction is already finished");
//        }
//
//        // 입찰가가 현재가보다 높은지 확인
//        long currentPrice = Long.parseLong(auction.getIngPrice());
//        long bidPrice = Long.parseLong(bidAuctionRequestDto.bidPrice());
//
//        if (bidPrice <= currentPrice) {
//            throw new IllegalArgumentException("Bid price must be higher than current price");
//        }
//
//        // 입찰 정보 업데이트
//        auction.updateBid(bidAuctionRequestDto.bidPrice(), bidAuctionRequestDto.userId());
//        auctionRepository.save(auction);
//
//        return true;
//    }
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

        // WebSocket을 통해 실시간 업데이트 전송
        try {
            AuctionUpdateMessage updateMessage = new AuctionUpdateMessage(
                    auction.getId(),
                    auction.getIngPrice(),
                    auction.getLastBidUser()
            );
            String message = objectMapper.writeValueAsString(updateMessage);
            webSocketHandler.broadcastMessage(new TextMessage(message));
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
        return AuctionDetailViewResponseDto.of(auction);
    }
}
