package auction.back.dto.response;

import auction.back.domain.Picture;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class RegistAuctionViewResponseDto {
    private Long id;
    private String pictureName;
    private String url;
    private int likeCount;

    public static RegistAuctionViewResponseDto of(Picture picture, int likeCount) {
        return RegistAuctionViewResponseDto.builder()
                .id(picture.getId())
                .pictureName(picture.getName())
                .url(picture.getPictureImgList().isEmpty() ? null :
                        picture.getPictureImgList().get(0).getUrl())
                .likeCount(likeCount)
                .build();
    }
}
