package auction.back.dto.response;

import auction.back.domain.Auction;
import auction.back.domain.Picture;
import auction.back.domain.PictureImg;
import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class AuctionDetailViewResponseDto {
    private Long id;
    private String startPrice;
    private String ingPrice;
    private String endPrice;
    private String lastBidUser;
    private LocalDateTime startAt;
    private LocalDateTime finishAt;
    private PictureDetailDto picture;
    private List<String> pictureUrls;

    @Getter
    @Builder
    public static class PictureDetailDto {
        private Long id;
        private String name;
        private String description;
        private String ingredient;
        private String sizeHeight;
        private String sizeWidth;
        private String makeTime;
        private String pictureCondition;
        private Boolean isPhoto;
        private String authorName;
    }

    public static AuctionDetailViewResponseDto of(Auction auction, User user) {
        return AuctionDetailViewResponseDto.builder()
                .id(auction.getId())
                .startPrice(auction.getStartPrice())
                .ingPrice(auction.getIngPrice())
                .lastBidUser(user != null ? user.getUserName() : null)  // user가 null일 수 있음
                .endPrice(auction.getEndPrice())
                .startAt(auction.getStartAt())
                .finishAt(auction.getFinishAt())
                .picture(PictureDetailDto.builder()
                        .id(auction.getPicture().getId())
                        .name(auction.getPicture().getName())
                        .description(auction.getPicture().getDescription())
                        .ingredient(auction.getPicture().getIngredient())
                        .sizeHeight(auction.getPicture().getSizeHeight())
                        .sizeWidth(auction.getPicture().getSizeWidth())
                        .makeTime(auction.getPicture().getMakeTime())
                        .pictureCondition(auction.getPicture().getPictureCondition())
                        .isPhoto(auction.getPicture().getIsPhoto())
                        .authorName(auction.getPicture().getUser().getUserName())
                        .build())
                .pictureUrls(auction.getPicture().getPictureImgList().stream()
                        .map(PictureImg::getUrl)
                        .collect(Collectors.toList()))
                .build();
    }
}
