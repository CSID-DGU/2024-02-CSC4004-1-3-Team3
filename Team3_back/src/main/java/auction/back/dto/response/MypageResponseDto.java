package auction.back.dto.response;

import auction.back.domain.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class MypageResponseDto {
    private String userName;
    private String loginId;
    private String userEmail;
    private String userImage;
    private List<PictureSimpleDto> pictureList;
    private List<AuctionSimpleDto> auctionList;

    @Getter
    @Builder
    public static class PictureSimpleDto {
        private Long id;
        private String name;
        private String imageUrl;
    }

    @Getter
    @Builder
    public static class AuctionSimpleDto {
        private Long id;
        private String startPrice;
        private String ingPrice;
        private String endPrice;
        private LocalDateTime startAt;
        private LocalDateTime finishAt;
        private String pictureName;
    }

    private static PictureSimpleDto toPictureSimpleDto(Picture picture) {
        return PictureSimpleDto.builder()
                .id(picture.getId())
                .name(picture.getName())
                .imageUrl(picture.getPictureImgList().isEmpty() ? null :
                        picture.getPictureImgList().get(0).getUrl())
                .build();
    }

    private static AuctionSimpleDto toAuctionSimpleDto(Auction auction) {
        return AuctionSimpleDto.builder()
                .id(auction.getId())
                .startPrice(auction.getStartPrice())
                .ingPrice(auction.getIngPrice())
                .endPrice(auction.getEndPrice())
                .startAt(auction.getStartAt())
                .finishAt(auction.getFinishAt())
                .pictureName(auction.getPicture().getName())
                .build();
    }

    public static MypageResponseDto of(User user) {
        Set<PictureSimpleDto> pictures = user.isAuthor() ?
                user.getPictureList().stream()
                        .map(MypageResponseDto::toPictureSimpleDto)
                        .collect(Collectors.toSet()) :
                user.getLikeSet().stream()
                        .map(like -> toPictureSimpleDto(like.getPicture()))
                        .collect(Collectors.toSet());

        Set<AuctionSimpleDto> auctions = user.getMappingSet().stream()
                .map(mapping -> toAuctionSimpleDto(mapping.getAuction()))
                .collect(Collectors.toSet());

        return MypageResponseDto.builder()
                .userName(user.getUserName())
                .loginId(user.getLoginId())
                .userEmail(user.getUserEmail())
                .userImage(user.getUserImage())
                .pictureList(new ArrayList<>(pictures))
                .auctionList(new ArrayList<>(auctions))
                .build();
    }
}
