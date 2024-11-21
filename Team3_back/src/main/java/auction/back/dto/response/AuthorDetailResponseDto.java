package auction.back.dto.response;

import auction.back.domain.Picture;
import auction.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;
@Getter
@AllArgsConstructor
@Builder
public class AuthorDetailResponseDto {
    private Long id;
    private String userName;
    private String userEmail;
    private String userImage;
    private int followersCount;
    private int picturesCount;
    private List<PictureSimpleDto> recentPictures;

    @Getter
    @Builder
    public static class PictureSimpleDto {
        private Long id;
        private String name;
        private String imageUrl;
    }

    public static AuthorDetailResponseDto of(User author, int followersCount, List<Picture> recentPictures) {
        return AuthorDetailResponseDto.builder()
                .id(author.getId())
                .userName(author.getUserName())
                .userEmail(author.getUserEmail())
                .userImage(author.getUserImage())
                .followersCount(followersCount)
                .picturesCount(author.getPictureList().size())
                .recentPictures(recentPictures.stream()
                        .map(picture -> PictureSimpleDto.builder()
                                .id(picture.getId())
                                .name(picture.getName())
                                .imageUrl(picture.getPictureImgList().isEmpty() ? null : picture.getPictureImgList().get(0).getUrl())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
