package auction.back.dto.response;

import auction.back.domain.Picture;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class TopPictureResponseDto {
    private Long id;
    private String name;
    private String description;
    private String sizeHeight;
    private String sizeWidth;
    private Boolean isPhoto;
    private Long likeCount;
    private String url;

    public static TopPictureResponseDto of(Picture picture, Long likeCount, String url) {
        return TopPictureResponseDto.builder()
                .id(picture.getId())
                .name(picture.getName())
                .description(picture.getDescription())
                .sizeHeight(picture.getSizeHeight())
                .sizeWidth(picture.getSizeWidth())
                .isPhoto(picture.getIsPhoto())
                .likeCount(likeCount)
                .url(url)
                .build();
    }
}