package auction.back.dto.response;

import auction.back.domain.Picture;
import auction.back.domain.PictureImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.joda.time.LocalDateTime;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class PictureDetailResponseDto {
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
    private String authorEmail;
    private String authorImage;
    private List<String> imageUrls;

    public static PictureDetailResponseDto of(Picture picture) {
        return PictureDetailResponseDto.builder()
                .id(picture.getId())
                .name(picture.getName())
                .description(picture.getDescription())
                .ingredient(picture.getIngredient())
                .sizeHeight(picture.getSizeHeight())
                .sizeWidth(picture.getSizeWidth())
                .makeTime(picture.getMakeTime())
                .pictureCondition(picture.getPictureCondition())
                .isPhoto(picture.getIsPhoto())
                .authorName(picture.getUser().getUserName())
                .authorEmail(picture.getUser().getUserEmail())
                .authorImage(picture.getUser().getUserImage())
                .imageUrls(picture.getPictureImgList().stream()
                        .map(PictureImg::getUrl)
                        .collect(Collectors.toList()))
                .build();
    }
}