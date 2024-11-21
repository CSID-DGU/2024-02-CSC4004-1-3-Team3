package auction.back.dto.response;

import auction.back.domain.Picture;
import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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

    public static PictureViewResponseDto of(Picture picture){
        return PictureViewResponseDto.builder()
                .id(picture.getId())
                .name(picture.getName())
                .authorName(picture.getUser().getUserName())
                .sizeHeight(picture.getSizeHeight())
                .sizeWidth(picture.getSizeWidth())
                .makeTime(picture.getMakeTime())
                .isPhoto(picture.getIsPhoto())
                .url(picture.getPictureImgList().isEmpty() ? null : picture.getPictureImgList().get(0).getUrl())
                .build();
    }
}
