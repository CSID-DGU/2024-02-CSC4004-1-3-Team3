package auction.back.service;

import auction.back.domain.Auction;
import auction.back.domain.Picture;
import auction.back.dto.response.IngAuctionResponseDto;
import auction.back.dto.response.AuthorFollowResponseDto;
import auction.back.dto.response.TopPictureResponseDto;
import auction.back.repository.AuctionRepository;
import auction.back.repository.AuthorRepository;
import auction.back.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainService {
    private final PictureRepository pictureRepository;
    private final AuctionRepository auctionRepository;
    private final AuthorRepository authorRepository;

    private List<TopPictureResponseDto> getTopLikedPictures(int limit) {
        List<Object[]> results = pictureRepository.findTopLikedPictures(limit);
        return results.stream()
                .map(result -> {
                    Picture picture = (Picture) result[0];
                    Long likeCount = (Long) result[1];
                    String url = picture.getPictureImgList().isEmpty() ?
                            null : picture.getPictureImgList().get(0).getUrl();
                    return TopPictureResponseDto.of(picture, likeCount, url);
                })
                .limit(limit)
                .collect(Collectors.toList());
    }

    private List<IngAuctionResponseDto> getOngoingAuctions() {
        List<Auction> auctions = auctionRepository.findOngoingAuctions();
        return auctions.stream()
                .limit(9)
                .map(auction -> {
                    String url = auction.getPicture().getPictureImgList().isEmpty() ?
                            null : auction.getPicture().getPictureImgList().get(0).getUrl();
                    return IngAuctionResponseDto.of(auction, url);
                })
                .collect(Collectors.toList());
    }

    private List<AuthorFollowResponseDto> getPopularAuthors() {
        List<Object[]> authors = authorRepository.findTopAuthorsWithFollowerCount();
        return authors.stream()
                .limit(9)
                .map(AuthorFollowResponseDto::of)
                .collect(Collectors.toList());
    }

    public Map<String, Object> mainView() {
        List<TopPictureResponseDto> popularPictures = getTopLikedPictures(9);
        List<IngAuctionResponseDto> ongoingAuctions = getOngoingAuctions();
        List<AuthorFollowResponseDto> popularAuthors = getPopularAuthors();

        Map<String, Object> result = new HashMap<>();
        result.put("popularPictures", popularPictures);
        result.put("ongoingAuctions", ongoingAuctions);
        result.put("popularAuthors", popularAuthors);

        return result;
    }
}
