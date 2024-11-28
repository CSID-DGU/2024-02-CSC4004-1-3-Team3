package auction.back.dto.response;

import auction.back.domain.Auction;
import auction.back.domain.Picture;
import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class PictureViewResponseDto {

    private Long id;
    private String name;
    private String authorName;
    private String sizeHeight;
    private String sizeWidth;
    private String makeTime;
    private boolean isPhoto;
    private String url;
    private boolean isLike;
    private boolean isAuction;
    private String currentPrice;

    public static PictureViewResponseDto of(Picture picture, boolean isLike){
        Auction auction = picture.getAuction();
        boolean isAuction = auction != null && auction.getFinishAt().isAfter(LocalDateTime.now());

        return PictureViewResponseDto.builder()
                .id(picture.getId())
                .name(picture.getName())
                .authorName(picture.getUser().getUserName())
                .sizeHeight(picture.getSizeHeight())
                .sizeWidth(picture.getSizeWidth())
                .makeTime(picture.getMakeTime())
                .isPhoto(picture.getIsPhoto())
                .url(picture.getPictureImgList().isEmpty() ? null : picture.getPictureImgList().get(0).getUrl())
                .isLike(isLike)
                .isAuction(isAuction)
                .currentPrice(isAuction ? auction.getIngPrice() : null)
                .build();
    }
}

