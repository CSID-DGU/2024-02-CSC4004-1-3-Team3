package auction.back.dto.response.socket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuctionUpdateMessage {
    private Long auctionId;
    private String currentPrice;
    private String lastBidUser;
}
