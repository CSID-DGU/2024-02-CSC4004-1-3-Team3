package auction.back.dto.response;

import auction.back.domain.Auction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class AuctionListViewResponseDto {
    private Long id;
    private String startPrice;
    private String ingPrice;
    private String endPrice;
    private LocalDateTime startAt;
    private LocalDateTime finishAt;
    private PictureSimpleDto picture;

    @Getter
    @Builder
    public static class PictureSimpleDto {
        private Long id;
        private String name;
        private String imageUrl;
    }

    public static AuctionListViewResponseDto of(Auction auction) {
        return AuctionListViewResponseDto.builder()
                .id(auction.getId())
                .startPrice(auction.getStartPrice())
                .ingPrice(auction.getIngPrice())
                .endPrice(auction.getEndPrice())
                .startAt(auction.getStartAt())
                .finishAt(auction.getFinishAt())
                .picture(PictureSimpleDto.builder()
                        .id(auction.getPicture().getId())
                        .name(auction.getPicture().getName())
                        .imageUrl(auction.getPicture().getPictureImgList().isEmpty() ? null :
                                auction.getPicture().getPictureImgList().get(0).getUrl())
                        .build())
                .build();
    }
}
